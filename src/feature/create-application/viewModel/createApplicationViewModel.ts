// feature/application/viewModels/useCreateApplicationViewModel.ts

import { useRouter } from "expo-router";

import { useHandleMutation } from "@/components/shared/useHandleMutation";
import { SCREEN_TO_ROUTE } from "@/feature/helper/screenRouteMapper";
import { CreateApplicationDocument } from "@/network/__generated__/graphql";

export function useCreateApplicationViewModel() {
  const router = useRouter();

  const [createApplication, { loading }] = useHandleMutation(
    CreateApplicationDocument,
    "Unable to create your application.",
  );

  const create = async () => {
    const result = await createApplication();

    const payload = result.data?.createApplication;

    if (payload && "screen" in payload) {
      const route = SCREEN_TO_ROUTE[payload.screen];

      if (route) {
        router.push({
          pathname: route,
          params: {
            applicationId: payload.applicationId,
          },
        });
      }
    }
  };

  return {
    create,
    isCreating: loading,
  };
}
