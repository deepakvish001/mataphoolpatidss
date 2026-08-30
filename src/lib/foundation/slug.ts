export const toSlug = (value: string) => value.normalize("NFKD").toLocaleLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
