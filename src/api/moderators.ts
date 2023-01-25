import express, { Request, Response } from "express";
import { json } from "body-parser";
require("dotenv").config();

const jsonParser = json();
const router = express.Router();

router.get("/", (req: Request, res: Response): void => {
  try {
    // this route will get all moderators
  } catch (x) {
    res.status(400).json({ error: x });
  }
});

router.get("/available", (req: Request, res: Response): void => {
  try {
    // this route will get all available moderators
  } catch (x) {
    res.status(400).json({ error: x });
  }
});

export default router;
