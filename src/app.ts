import express from "express";
import dotenv from "dotenv";
import slackRoutes from "./routes/slackRoutes";

dotenv.config();

const app = express();
app.get("/", (_req, res) => {
  res.send("SlackProver backend is running!");
});

app.use("/slack", slackRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
