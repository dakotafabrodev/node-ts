"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeratorSchema = exports.PostSchema = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    content: String,
    author: String,
    reportedInappropriate: Boolean,
    isInappropriate: Boolean,
    isResolved: Boolean,
    moderatedBy: [{ type: mongodb_1.ObjectId || String, maxLength: 1 }],
});
exports.PostSchema = PostSchema;
const ModeratorSchema = new mongoose_1.Schema({
    name: String,
    activeReport: Object,
    moderationCount: Number,
    isAvailableForReport: Boolean,
});
exports.ModeratorSchema = ModeratorSchema;
