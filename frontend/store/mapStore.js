import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";



export const mapStore = create((set, get) => ({
    getSuggestions: async (city) => {
        try {
            let data = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/maps/getSuggestions`,
                { input: city },
                { withCredentials: true }  
            );
            // console.log(data.data);
            return data.data;
        } catch (err) {
            return toast.error("No Nearby Locations");
        }
    },

    getFare: async (Lat1, Lat2, Lng1, Lng2) => {
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/maps/getFare`,
                { Lat1, Lng1, Lat2, Lng2 },
                { withCredentials: true }
            );
            // console.log(result.data);
            return result.data;
        } catch (err) {
            console.log(err);
            return toast.error("No Rides Available");
        }
    }
}));
