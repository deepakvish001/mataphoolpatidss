export type CourseStatus = "draft" | "published" | "archived";
export const allowedCourseTransition = (from: CourseStatus, to: CourseStatus) => ({ draft: ["published"], published: ["draft", "archived"], archived: [] }[from] as CourseStatus[]).includes(to);
