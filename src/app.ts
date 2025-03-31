import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import slackRoutes from "./routes/slackRoutes";
import { CODE } from "./constants/statusCodes";

dotenv.config();

const app = express();
app.get("/", (_req, res) => {
  res.status(CODE.SUCCESS).json({ message: "SlackProver backend is running!" });
});

app.use("/slack", slackRoutes);

app.use((req: Request, res: Response) => {
  res.status(CODE.NOT_FOUND).json({ error: "Route not found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(err.status || CODE.INTERNAL_SERVER).json({
    error: err.message || "Internal Server Error",
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
