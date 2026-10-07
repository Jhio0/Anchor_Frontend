import { useRouter } from "expo-router";
import { extractScreen } from "./extractScreen";
import { SCREEN_TO_ROUTE } from "./screenRouteMapper";

type RouterType = ReturnType<typeof useRouter>;
/**
 * Reads whatever payload a mutation returned, figures out the next screen,
 * and pushes to it — forwarding applicationId always, and the full review
 * snapshot whenever the payload is an InformationReviewPayload.
 */
export function navigateFromPayload(
  router: RouterType,
  applicationId: string,
  payload: any,
) {
  const nextScreen = extractScreen(payload);
  console.log("NEXT SCREEN:", nextScreen);

  if (!nextScreen) return;

  const route = SCREEN_TO_ROUTE[nextScreen];

  if (!route) return;

  router.push({
    pathname: route,
    params: {
      applicationId,
      ...(payload.__typename === "InformationReviewPayload" && {
        incomeAmount: payload.incomeAmount?.toString(),
        essentialItems: JSON.stringify(payload.essentialItems ?? []),
        financialLoanItems: JSON.stringify(payload.financialLoanItems ?? []),
        subscriptionItems: JSON.stringify(payload.subscriptionItems ?? []),
      }),
    },
  });
}
