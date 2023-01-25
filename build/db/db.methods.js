"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setModeratedBy = exports.pushReport = exports.popReport = exports.isAvailable = void 0;
// IModeratorDocument Methods
function isAvailable() {
    const length = this.get("activeReport").length;
    this.set({ isAvailableForReport: length < 1 });
    return this.isAvailableForReport;
}
exports.isAvailable = isAvailable;
function popReport() {
    const activeReport = this.get("activeReport").pop();
    return activeReport;
}
exports.popReport = popReport;
function pushReport(reportedPost) {
    const activeReport = this.get("activeReport");
    const { _id } = reportedPost;
    if (activeReport.length > 0) {
        return activeReport;
    }
    else {
        activeReport.push(_id);
        return activeReport;
    }
}
exports.pushReport = pushReport;
// IPostDocument
function setModeratedBy(moderatorId) {
    const moderatedBy = this.get("moderatedBy");
    if (moderatedBy.length > 0) {
        moderatedBy.pop();
        moderatedBy.push(moderatorId);
    }
    else {
        moderatedBy.push(moderatorId);
    }
    return moderatedBy;
}
exports.setModeratedBy = setModeratedBy;
