import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import bookRouter from "./routes/bookRoute.js";
import teamRouter from "./routes/teamRoute.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173", // For local development
  "http://localhost:517", // For local development
];


// Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/team", teamRouter);
app.use("/api/book", bookRouter);



app.get("/", (req, res) => {
  res.send("API working 😎");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} 🦄`);
});