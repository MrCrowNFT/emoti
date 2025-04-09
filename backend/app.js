import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import db from "./db/db";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5500;
const io = new Server(server, {
  cors: { origin: "*" }, // Allows cross-origin requests for the frontend
});

app.use(cors());
server.listen(PORT, () => {
  console.log("Database connected");
  console.log(`Server running on port ${PORT}`);
});
