import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import weatherRoutes from "./routes/weatherRoutes.js";
import converterRoutes from "./routes/converterRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: "*", methods: "GET", allowedHeaders: "Content-Type" }));
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);
app.use("/api/convert", converterRoutes);
app.use("/api/quote", quoteRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
