import express, { Request, Response } from "express";
import { json } from "body-parser";
import { getAllModerators, getAvailableModerators } from "./helpers/moderators";
require("dotenv").config();

const jsonParser = json();
const router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const allModerators = await getAllModerators();

    res.status(200).json({ allModerators: allModerators });
  } catch (x) {
    res.status(400).json({ error: x });
  }
});

router.get("/available", async (req: Request, res: Response): Promise<void> => {
  try {
    const availableModerators = await getAvailableModerators();

    res.status(200).json({ available: availableModerators });
  } catch (x) {
    res.status(400).json({ error: x });
  }
});

export default router;
