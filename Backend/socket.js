import { Server } from "socket.io";
import dotenv from "dotenv"
dotenv.config();

import pg from "pg";

const db = new pg.Client({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port : process.env.DB_PORT,
    user : process.env.USER,
});

db.connect();


let io;

export function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on("join", async (data) => {

            if (!data || !data.id || !data.userType) {
                console.log("Invalid join data:", data);
                return; // prevent crash
            }
            const { id, userType } = data;
            try {
                if (userType === "user") {
                    await db.query(
                        "UPDATE users SET socketid = $1 WHERE id = $2",
                        [socket.id, id]
                    );
                } else if (userType === "captain") {
                    await db.query(
                        "UPDATE captains SET socketid = $1 WHERE id = $2",
                        [socket.id, id]
                    );
                }
                console.log(`Socket ID ${socket.id} saved for ${userType} ${id}`);
            } catch (err) {
                console.error("Error updating socketid:", err);
            }
        });

        socket.on("update-captain-location", async (data) => {
            const { id, longitude, latitude } = data;
            // console.log(data);

            
            if (id == null || latitude == null || longitude == null) {
                console.log("invalid data:", data);
                return;
            }

            
            const lat = parseFloat(latitude);
            const lon = parseFloat(longitude);

            if (isNaN(lat) || isNaN(lon)) {
                console.log("invalid coordinates:", latitude, longitude);
                return;
            }

            try {
                await db.query(
                    "UPDATE captains SET latitude = $1, longitude = $2 WHERE id = $3",
                    [lat, lon, id]
                );
            } catch (err) {
                console.error("DB update error:", err);
                socket.emit("location-update-error", { message: "Failed to update location" });
            }
        });


        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

export function sendMessageToSocketId(socketId, messageObject) {

    console.log(`sending message to ${socketId}`,messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log("Socket.io not initialized.");
    }
}
