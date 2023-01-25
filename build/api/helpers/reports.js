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
exports.createPost = exports.updatePost = exports.getNextFlaggedReport = exports.getUnresolvedPosts = exports.getAllPosts = exports.getPost = void 0;
const mongodb_1 = require("mongodb");
const db_model_1 = require("../../db/db.model");
const db_1 = require("../../db");
require("dotenv").config();
const getPost = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    const post = yield db_1.db
        .collection(db_1.DB_COLLECTIONS.posts)
        .find({ _id: new mongodb_1.ObjectId(_id) });
    yield post.forEach((post) => {
        result.push(new db_model_1.PostModel(post));
    });
    return result[0];
});
exports.getPost = getPost;
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    const allReports = yield db_1.db.collection(db_1.DB_COLLECTIONS.posts).find();
    yield allReports.forEach((report) => {
        result.push(new db_model_1.PostModel(report));
    });
    return result;
});
exports.getAllPosts = getAllPosts;
const getUnresolvedPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    const unresolvedPosts = yield db_1.db
        .collection(db_1.DB_COLLECTIONS.posts)
        .find({ reportedInappropriate: true, isResolved: false });
    yield unresolvedPosts.forEach((post) => {
        result.push(new db_model_1.PostModel(post));
    });
    return result;
});
exports.getUnresolvedPosts = getUnresolvedPosts;
const getNextFlaggedReport = () => __awaiter(void 0, void 0, void 0, function* () {
    const unresolvedPosts = yield (0, exports.getUnresolvedPosts)();
    return unresolvedPosts[0];
});
exports.getNextFlaggedReport = getNextFlaggedReport;
const updatePost = (updatedPostObj) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = updatedPostObj;
    const postUpdate = yield db_1.db.collection(db_1.DB_COLLECTIONS.posts).updateOne({
        _id: new mongodb_1.ObjectId(_id),
    }, updatedPostObj);
    const updatedPost = yield (0, exports.getPost)(_id);
    return updatedPost;
});
exports.updatePost = updatePost;
const createPost = (newPostObj) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = yield db_1.db
        .collection(db_1.DB_COLLECTIONS.posts)
        .insertOne(new db_model_1.PostModel(newPostObj));
    return newPost;
});
exports.createPost = createPost;
