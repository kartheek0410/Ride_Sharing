import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";
import dotenv from "dotenv";
dotenv.config();

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
 
    rules : [

        //sheild protects your app form common attacks like sql injection,Xss,CSRF attacks
        shield({mode:"LIVE"}),

        // block all the bots except search engines
        detectBot({mode:"LIVE",
            allow : [
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),
        //rate limiting
        tokenBucket({
            mode : "LIVE",
            refillRate : 5,
            interval : 10,
            capacity : 12,
            penaltyBoxDuration : 200
        })
    ],

    env : process.env.ARCJET_ENV || "development"
});