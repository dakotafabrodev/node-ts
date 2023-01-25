"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reports_1 = __importDefault(require("./reports"));
const moderators_1 = __importDefault(require("./moderators"));
const router = express_1.default.Router();
router.use("/reports", reports_1.default);
router.use("/moderators", moderators_1.default);
exports.default = router;
