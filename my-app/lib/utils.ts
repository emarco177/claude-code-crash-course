import { AmountInCents } from "./types";
import { v4 as uuidv4 } from "uuid";

/**
 * Generates a unique ID
 */
export function generateId(): string {
  return uuidv4();
}

/**
 * Formats amount in cents to currency string
 * @param cents - Amount in cents
 * @returns Formatted currency string (e.g., "$123.45")
 */
export function formatCurrency(cents: AmountInCents): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dollars);
}

/**
 * Parses currency string to cents
 * @param value - String value (e.g., "123.45" or "$123.45")
 * @returns Amount in cents
 */
export function parseCurrency(value: string): AmountInCents {
  // Remove currency symbols and whitespace
  const cleaned = value.replace(/[$,\s]/g, "");
  const dollars = parseFloat(cleaned);

  if (isNaN(dollars)) {
    return 0;
  }

  return Math.round(dollars * 100);
}

/**
 * Gets the current month in YYYY-MM format
 */
export function getCurrentMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

/**
 * Formats month string for display
 * @param monthYear - Month in "YYYY-MM" format
 * @returns Formatted month (e.g., "January 2026")
 */
export function formatMonth(monthYear: string): string {
  const [year, month] = monthYear.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/**
 * Gets the next month
 * @param monthYear - Month in "YYYY-MM" format
 * @returns Next month in "YYYY-MM" format
 */
export function getNextMonth(monthYear: string): string {
  const [year, month] = monthYear.split("-").map(Number);
  const date = new Date(year, month, 1); // month is already 1-indexed here (becomes next month)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * Gets the previous month
 * @param monthYear - Month in "YYYY-MM" format
 * @returns Previous month in "YYYY-MM" format
 */
export function getPreviousMonth(monthYear: string): string {
  const [year, month] = monthYear.split("-").map(Number);
  const date = new Date(year, month - 2, 1); // month-2 because month is 1-indexed
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * Formats a date for display
 * @param dateString - ISO date string
 * @returns Formatted date (e.g., "Jan 21, 2026")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Gets month from date string
 * @param dateString - ISO date string
 * @returns Month in "YYYY-MM" format
 */
export function getMonthFromDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

/**
 * Classnames utility for conditional classes
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
