import { ApplicationScreen } from "@/network/__generated__/graphql";

interface PayloadWithOptionalScreen {
  __typename: string;
  screen?: ApplicationScreen;
}

/**
 * Generic payload-screen extractor.
 * Works for any mutation payload union where most (or all) variants
 * have a `screen: ApplicationScreen` field, keyed by `__typename`.
 * No type casting needed — TS infers `screen` is `ApplicationScreen | undefined`
 * because every union member either has that exact field or omits it (optional).
 */
export function extractScreen<T extends PayloadWithOptionalScreen>(
  payload: T | null | undefined,
): ApplicationScreen | undefined {
  return payload?.screen;
}
