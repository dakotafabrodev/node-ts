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
    // this will send all posts
});
router.get("/flagged", (req, res) => {
    // this will send all unresolved posts
});
router.put("/flag_for_review", jsonParser, (req, res) => {
    // this route will take in a postId
    // update a post by id
    // send status code 200
    // send data with postSuccess and post
});
router.put("/submit_report", jsonParser, (req, res) => {
    // this route will expect req.body to have updatedPostBody, postId, and moderatedBy
    // update isInappropriate, isResolved, and moderatedBy
    // get next flagged report
    // find moderator through moderatedBy
    // update moderator.activeReport with next report & isAvailableForReport: false & increment moderationCount by 1
    // autoAssign reports (possibly move this to its own route?? router.put("/assign"))
    // send status code 200
    // send data with postData and moderatorData
});
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
