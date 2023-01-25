"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoeratorModel = exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const db_schema_1 = require("./db.schema");
const _1 = require(".");
exports.PostModel = (0, mongoose_1.model)(_1.DB_COLLECTIONS.posts, db_schema_1.PostSchema);
exports.MoeratorModel = (0, mongoose_1.model)(_1.DB_COLLECTIONS.moderators, db_schema_1.ModeratorSchema);
