import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5500;
const io = new Server(server, {
  cors: { origin: "*" }, // Allows cross-origin requests for the frontend
});

app.use(cors());
server.listen(PORT, () => {
  //todo add db connection here i think
  console.log(`Server running on port ${PORT}`);
});
