import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectToDb from "./confi/mongodb.js";
import Authroutes from "./routes/Authroutes.js";
import userRouter from "./routes/userR.js";

const app = express();
const port = process.env.PORT || 4000;
const allwod = "http://localhost:5173";  // Removed trailing slash

connectToDb();
app.use(express.json());
app.use(cookieParser());

// CORS Middleware
app.use(cors({ origin: allwod, credentials: true }));

// Explicitly handle OPTIONS requests (preflight)
app.options("*", cors());  // Handle all preflight OPTIONS requests

// Routes
app.use("/api/auth", Authroutes);
app.use("/api/user", userRouter);

// Basic test route
app.get("/", (req, res) => {
 
res.send("hello world ")


});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port :${port}`);
});
