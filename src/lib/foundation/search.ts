export const normalizeSearch = (value: string) => value.trim().toLocaleLowerCase();
export const matchesSearch = (fields: string[], query: string) => {
  const value = normalizeSearch(query);
  return value.length === 0 || fields.some((field) => normalizeSearch(field).includes(value));
};
