import express from "express";
import dotenv from "dotenv";
import slackRoutes from "./routes/slackRoutes";

dotenv.config();

const app = express();
app.get("/", (_req, res) => {
  res.send("SlackProver backend is running!");
});

app.use("/slack", slackRoutes);
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
