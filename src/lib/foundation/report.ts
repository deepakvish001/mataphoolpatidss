export const safeReportName = (title: string, date = new Date()) => {
  const slug = title.trim().toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${slug || "report"}-${date.toISOString().slice(0, 10)}.csv`;
};
