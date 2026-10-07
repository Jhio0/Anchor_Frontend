import { OperationVariables } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

import { showErrorToast } from "@/components/shared/toast";

export function useHandleMutation<TData, TVariables extends OperationVariables>(
  document: TypedDocumentNode<TData, TVariables>,
  fallbackMessage: string,
) {
  return useMutation(document, {
    onError: (error) => {
      showErrorToast(error.message || fallbackMessage);
    },
  });
}
