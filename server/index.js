import "dotenv/config";

import express from "express";
import connectDb from "./utils/connectDb.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/generate.route.js";
import creditRouter from "./routes/credits.route.js";
import { stripeWebhook } from "./contollers/credits.controller.js";

console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

const PORT = process.env.PORT || 5000;

const app = express();

// Stripe Webhook
// IMPORTANT: raw body must come before express.json()
app.post(
    "/api/credits/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({
        message: "AI EXAM NOTES RUNNING",
    });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/credits", creditRouter);

app.listen(PORT, () => {
    console.log(`✅ Server running on PORT ${PORT}`);
    connectDb();
});