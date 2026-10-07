import type { ErrorLike, OperationVariables } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

import { showErrorToast } from "@/components/shared/toast";

export function useHandleQuery<
  TData,
  TVariables extends OperationVariables = OperationVariables,
>(
  document: TypedDocumentNode<TData, TVariables>,
  variables: TVariables,
  fallbackMessage: string,
) {
  return useQuery(document, {
    variables,
    onError: (error: ErrorLike) => {
      showErrorToast(error.message || fallbackMessage);
    },
  });
}
