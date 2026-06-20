import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);
app.use(express.json());
app.use("/api/payment", paymentRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Portfolio API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
