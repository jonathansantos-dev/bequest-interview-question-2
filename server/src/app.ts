import express from "express";
import cors from "cors";
import dataRoutes from "./routes/dataRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/data", dataRoutes);

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});