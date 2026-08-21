import { describe, it, expect } from "vitest";
import { formatIndianCurrency } from "../utils";

describe("formatIndianCurrency", () => {
  it("formats amounts below 1,000 as plain rupees", () => {
    expect(formatIndianCurrency(0)).toBe("₹0.00");
    expect(formatIndianCurrency(999)).toBe("₹999.00");
  });

  it("formats amounts from 1,000 up to 1 lakh in thousands", () => {
    expect(formatIndianCurrency(1000)).toBe("₹1.00K");
    expect(formatIndianCurrency(99999)).toBe("₹100.00K");
  });

  it("formats amounts from 1 lakh up to 1 crore in lakhs", () => {
    expect(formatIndianCurrency(100000)).toBe("₹1.00L");
    expect(formatIndianCurrency(9999999)).toBe("₹100.00L");
  });

  it("formats amounts of 1 crore and above in crores", () => {
    expect(formatIndianCurrency(10000000)).toBe("₹1.00Cr");
    expect(formatIndianCurrency(25000000)).toBe("₹2.50Cr");
  });

  it("rounds fractional amounts to two decimal places", () => {
    expect(formatIndianCurrency(1234.5)).toBe("₹1.23K");
  });

  it("handles negative amounts as plain rupees", () => {
    expect(formatIndianCurrency(-500)).toBe("₹-500.00");
  });
});
