"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
require("dotenv").config();
const jsonParser = (0, body_parser_1.json)();
const router = express_1.default.Router();
router.get("/", (req, res) => {
    try {
        // this route will get all moderators
    }
    catch (x) {
        res.status(400).json({ error: x });
    }
});
router.get("/available", (req, res) => {
    try {
        // this route will get all available moderators
    }
    catch (x) {
        res.status(400).json({ error: x });
    }
});
exports.default = router;
