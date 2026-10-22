import type { CreateSpendingPlanInput } from "@/network/__generated__/graphql";

import { roundMoney } from "@/feature/helper/formatMoney";

/**
 * Allows digits and a single decimal point.
 * Keeps at most two decimal places.
 *
 * Examples:
 * "12.50" -> "12.50"
 * "12.567" -> "12.56"
 * "12..50" -> "12.50"
 */
export function sanitizeAmountInput(value: string): string {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const decimalIndex = cleaned.indexOf(".");

  if (decimalIndex === -1) {
    return cleaned;
  }

  const whole = cleaned.slice(0, decimalIndex);
  const decimal = cleaned
    .slice(decimalIndex + 1)
    .replace(/\./g, "")
    .slice(0, 2);

  return `${whole}.${decimal}`;
}

/**
 * Converts a monetary string to a number.
 */
export function parseAmount(value: string): number {
  if (value.trim() === "") {
    return 0;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return roundMoney(parsed);
}

/**
 * Formats a month label such as "2026-10" as "October 2026".
 *
 * If the backend returns a different format, preserve that label.
 */
export function formatMonthLabel(monthLabel: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(monthLabel);

  if (!match) {
    return monthLabel;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);

  if (month < 1 || month > 12) {
    return monthLabel;
  }

  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-CA", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Creates the exact input expected by the existing mutation.
 */
export function toCreateSpendingPlanInput(
  collectedExpenseId: string,
  amount: string,
): CreateSpendingPlanInput {
  const parsedAmount = parseAmount(amount);

  if (!collectedExpenseId.trim()) {
    throw new Error("A collected expense ID is required.");
  }

  if (parsedAmount <= 0) {
    throw new Error("The spending plan amount must be greater than zero.");
  }

  return {
    collectedExpenseId,
    amount: parsedAmount,
  };
}
