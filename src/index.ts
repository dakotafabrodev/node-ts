import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import api from "./api/index";
import { request } from "http";
require("dotenv").config();

const PORT = process.env.PORT || 3002;
const app = express();

app.use(cors());
app.use(helmet());

app.get("/", (req: Request, res: Response): void => {
  try {
    res.json({
      msg: "We out here, Lex!",
      api_docs:
        "https://echo.notable.app/7bb13d0a86f3c9102cab971f9eb3bab9e55a8380d5654f7c54c72c4e36820c71",
    });
  } catch (x) {
    console.error(x);
    res.json({ error: x });
  }
});

app.use("/api", api);

app.get("*", (req: Request, res: Response): void => {
  res.json({
    msg: "No routes matched!",
    api_docs:
      "https://echo.notable.app/7bb13d0a86f3c9102cab971f9eb3bab9e55a8380d5654f7c54c72c4e36820c71",
  });
});

app.listen(process.env.PORT || PORT, (): void => {
  console.log("And we're rolling! 🎥");
});

export default app;
