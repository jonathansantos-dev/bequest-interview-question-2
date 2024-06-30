import express from "express";
import cors from "cors";
import dataRoutes from "./routes/dataRoutes";
import errorHandler from "./middleware/errorHandler"; 

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use(dataRoutes);

// Middleware to deal with server errors
app.use(errorHandler);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});