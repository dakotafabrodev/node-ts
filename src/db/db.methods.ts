import { IModeratorDocument, IPostDocument, IPostModel } from "./db.types";

// IModeratorDocument Methods
export function isAvailable(this: IModeratorDocument): boolean {
  const length = this.get("activeReport").length;
  this.set({ isAvailableForReport: length < 1 });
  return this.isAvailableForReport;
}

export function incrementModerationCount(this: IModeratorDocument): number {
  const moderationCount = this.get("moderationCount");
  this.set({ moderationCount: moderationCount + 1 });
  return this.moderationCount;
}

export function popReport(this: IModeratorDocument): object {
  const activeReport = this.get("activeReport").pop();
  return activeReport;
}

export function pushReport(
  this: IModeratorDocument,
  reportedPost: IPostDocument
): string {
  const activeReport = this.get("activeReport");
  const { _id } = reportedPost;

  if (activeReport.length > 0) {
    return activeReport;
  } else {
    activeReport.push(_id);
    return activeReport;
  }
}

// IPostDocument
export function setModeratedBy(
  this: IPostDocument,
  moderatorId: string
): string {
  const moderatedBy = this.get("moderatedBy");

  if (moderatedBy.length > 0) {
    moderatedBy.pop();
    moderatedBy.push(moderatorId);
  } else {
    moderatedBy.push(moderatorId);
  }

  return moderatedBy;
}
