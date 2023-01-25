import express from "express";
import reportsRouter from "./reports";
import moderatorsRouter from "./moderators";

const router = express.Router();

router.use("/reports", reportsRouter);
router.use("/moderators", moderatorsRouter);

export default router;
