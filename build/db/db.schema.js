"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeratorSchema = exports.PostSchema = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const db_methods_1 = require("./db.methods");
const PostSchema = new mongoose_1.Schema({
    content: String,
    author: String,
    reportedInappropriate: Boolean,
    isInappropriate: Boolean,
    isResolved: Boolean,
    moderatedBy: [{ type: mongodb_1.ObjectId || String, maxLength: 1 }],
});
exports.PostSchema = PostSchema;
PostSchema.methods.setModeratedBy = db_methods_1.setModeratedBy;
PostSchema.methods.setReportedInappropriate = db_methods_1.setReportedInappropriate;
PostSchema.methods.setResolved = db_methods_1.setResolved;
PostSchema.methods.setModeratorDecision = db_methods_1.setModeratorDecision;
const ModeratorSchema = new mongoose_1.Schema({
    name: String,
    activeReport: Object,
    moderationCount: Number,
    isAvailableForReport: Boolean,
});
exports.ModeratorSchema = ModeratorSchema;
ModeratorSchema.methods.isAvailable = db_methods_1.isAvailable;
ModeratorSchema.methods.popReport = db_methods_1.popReport;
ModeratorSchema.methods.pushReport = db_methods_1.pushReport;
ModeratorSchema.methods.incrementModerationCount = db_methods_1.incrementModerationCount;
