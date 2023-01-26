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
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoAssignReports = exports.updateModerator = exports.getAllModerators = exports.getAvailableModerators = exports.getModerator = void 0;
const mongodb_1 = require("mongodb");
const db_model_1 = require("../../db/db.model");
const db_1 = require("../../db");
const reports_1 = require("./reports");
require("dotenv").config();
const getModerator = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    const moderator = yield db_1.db
        .collection(db_1.DB_COLLECTIONS.moderators)
        .find({ _id: new mongodb_1.ObjectId(_id) });
    yield moderator.forEach((moderator) => {
        result.push(new db_model_1.ModeratorModel(moderator));
    });
    return result[0];
});
exports.getModerator = getModerator;
const getAvailableModerators = () => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    const moderators = yield db_1.db
        .collection(db_1.DB_COLLECTIONS.moderators)
        .find({ isAvailableForReport: true });
    yield moderators.forEach((moderator) => {
        result.push(new db_model_1.ModeratorModel(moderator));
    });
    return result;
});
exports.getAvailableModerators = getAvailableModerators;
const getAllModerators = () => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    const moderators = yield db_1.db.collection(db_1.DB_COLLECTIONS.moderators).find();
    yield moderators.forEach((moderator) => {
        result.push(new db_model_1.ModeratorModel(moderator));
    });
    return result;
});
exports.getAllModerators = getAllModerators;
const updateModerator = (updatedModeratorObj) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = updatedModeratorObj;
    const moderatorUpdate = yield db_1.db
        .collection(db_1.DB_COLLECTIONS.moderators)
        .updateOne({
        _id: new mongodb_1.ObjectId(_id),
    }, updatedModeratorObj);
    const updatedModerator = yield (0, exports.getModerator)(_id);
    return updatedModerator;
});
exports.updateModerator = updateModerator;
const autoAssignReports = (unresolvedPosts, availableModerators) => __awaiter(void 0, void 0, void 0, function* () {
    if (availableModerators.length <= 0)
        return { msg: "No available moderators" };
    yield availableModerators.forEach((moderator, index) => __awaiter(void 0, void 0, void 0, function* () {
        const post = unresolvedPosts[index];
        moderator.pushReport(post._id);
        moderator.isAvailable();
        post.setModeratedBy(moderator._id);
        yield (0, exports.updateModerator)(moderator);
        yield (0, reports_1.updatePost)(post);
    }));
    return { msg: "Unresolved posts auto-assigned to available moderators." };
});
exports.autoAssignReports = autoAssignReports;
