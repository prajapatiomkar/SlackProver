import express from "express";
import dotenv from "dotenv";
import slackRoutes from "./routes/slackRoutes";

dotenv.config();
const app = express();
app.use("/slack", slackRoutes);
app.listen(process.env.PORT, () => console.log("Server running on port 3000"));
