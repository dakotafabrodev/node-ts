"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeratorModel = exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const db_schema_1 = require("./db.schema");
const db_schema_2 = require("./db.schema");
exports.PostModel = (0, mongoose_1.model)("post", db_schema_1.PostSchema);
exports.ModeratorModel = (0, mongoose_1.model)("moderator", db_schema_2.ModeratorSchema);
