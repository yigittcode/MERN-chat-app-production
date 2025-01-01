import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import { connectDB } from "./lib/database.js";
import { generateJwtSecret } from './lib/generateJwtSecret.js';
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
import { io, app, server } from "./lib/socket.js";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

if (!process.env.JWT_SECRET) {
    generateJwtSecret().then(() => {
        console.log('JWT secret successfully generated.');
    }).catch((err) => {
        console.error('Error generating JWT secret:', err);
    });
} else {
    console.log('JWT secret already exists.');
}

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/messages", messageRoute);

const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "development") {
    app.use(express.static(path.join(__dirname, "frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
    });
}

app.use(express.static(path.join(__dirname, '../../frontend/dist'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        } else if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Error connecting to MongoDB", err.message);
});
