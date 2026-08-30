export const paiseToRupees = (paise: number) => Math.round(paise) / 100;
export const formatInr = (rupees: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(rupees);
