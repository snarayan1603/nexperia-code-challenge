// src/index.js
const https = require('https');
const fs = require('fs');
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const logger = require("./utils/logger");
const campaignRoutes = require("./routes/campaignRoutes");
const templateRoutes = require("./routes/templateRoutes");
const emailRoutes = require("./routes/emailRoutes");
const aiRoutes = require("./routes/aiRoutes");
const metricsRoutes = require("./routes/metricsRoutes");

const options = {
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.crt'),
};


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/campaign", campaignRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/metrics", metricsRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => console.log(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
https.createServer(options, app).listen(443, () => {
  console.log('Server is running on https://localhost:443');
});
