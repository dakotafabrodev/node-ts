"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const reports_1 = require("./helpers/reports");
const db_1 = require("../db");
const mongodb_1 = require("mongodb");
const moderators_1 = require("./helpers/moderators");
require("dotenv").config();
const jsonParser = (0, body_parser_1.json)();
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPosts = yield (0, reports_1.getAllPosts)();
        res.status(200).json({ allPosts: allPosts });
    }
    catch (x) {
        console.error(x);
        res.status(400).json({ error: x });
    }
}));
router.get("/flagged", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUnresolved = yield (0, reports_1.getUnresolvedPosts)();
        res.status(200).json({ unresolved: allUnresolved });
    }
    catch (x) {
        console.error(x);
        res.status(400).json({ error: x });
    }
}));
router.put("/flag_for_review", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.body;
    try {
        const currentPost = yield (0, reports_1.getPost)(postId);
        currentPost.setReportedInappropriate();
        const updatedPost = yield db_1.db.collection(db_1.DB_COLLECTIONS.posts).updateOne({
            _id: new mongodb_1.ObjectId(postId),
        }, currentPost);
        const updatedPostToSend = yield (0, reports_1.getPost)(postId);
        res
            .status(200)
            .json({ data: { postSuccess: updatedPost, post: updatedPostToSend } });
    }
    catch (x) {
        console.error(x);
        res.status(400).json({ error: x });
    }
}));
router.put("/submit_report", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { updatedPostBody, postId, moderatedBy } = req.body;
    try {
        const currentPost = yield (0, reports_1.getPost)(postId);
        currentPost.setModeratorDecision(updatedPostBody.isInappropriate);
        currentPost.setResolved();
        currentPost.setModeratedBy(moderatedBy);
        const updatedPost = yield db_1.db.collection(db_1.DB_COLLECTIONS.posts).updateOne({
            _id: new mongodb_1.ObjectId(postId),
        }, currentPost);
        const nextReport = yield (0, reports_1.getNextFlaggedReport)();
        const currentModerator = yield (0, moderators_1.getModerator)(moderatedBy);
        currentModerator.pushReport(nextReport._id);
        currentModerator.isAvailable();
        currentModerator.incrementModerationCount();
        const updatedModerator = yield db_1.db
            .collection(db_1.DB_COLLECTIONS.moderators)
            .updateOne({
            _id: new mongodb_1.ObjectId(moderatedBy),
        }, currentModerator);
        const updatedModeratorToSend = yield (0, moderators_1.getModerator)(moderatedBy);
        const updatedPostToSend = yield (0, reports_1.getPost)(postId);
        res.status(200).json({
            data: {
                postData: {
                    postData: { postSuccess: updatedPost, post: updatedPostToSend },
                    moderatorData: {
                        moderatorSuccess: updatedModerator,
                        moderator: updatedModeratorToSend,
                    },
                },
            },
        });
    }
    catch (x) {
        console.error(x);
        res.status(400).json({ error: x });
    }
}));
router.post("/removed", jsonParser, (req, res) => {
    // this route will add an inappropriate resolved post to a REMOVED db collection
    // get req.body
    // add to mongodb
    // send response
});
router.delete("/", jsonParser, (req, res) => {
    // this route will delete a post from Posts collection
    // get req.body.postId
    // delete from mongodb collection
    // send response
});
exports.default = router;
