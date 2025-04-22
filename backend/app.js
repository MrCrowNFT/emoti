import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import db from "./db/db";
import authRouter from "./routes/auth.routes";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // Allows cross-origin requests for the frontend
});

app.use("/auth", authRouter);

app.use(cors());
server.listen(() => {
  console.log("Database connected");
  console.log(`Server running on port ${PORT}`);
});
