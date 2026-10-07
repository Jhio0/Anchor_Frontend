/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ApplicationScreen =
  | 'CompletedScreen'
  | 'EssentialExpenseScreen'
  | 'FinancialLoanExpenseScreen'
  | 'IncomeDetailScreen'
  | 'InformationReviewScreen'
  | 'SubscriptionExpenseScreen';

export type CollectIncomeApplicationInput = {
  applicationId: string | number;
  incomeAmount: number;
};

export type CollectedExpenseSource =
  | 'ESSENTIALS'
  | 'FINANCIAL_LOAN'
  | 'SUBSCRIPTION';

export type ExpenseApplicationInput = {
  applicationId: string | number;
  items: Array<ExpenseItemsInput>;
};

export type ExpenseItemsInput = {
  amount: number;
  name: string;
  source: ExpenseSource;
};

export type ExpenseSource =
  | 'ESSENTIALS'
  | 'FINANCIAL_LOAN'
  | 'SUBSCRIPTION';

export type InformationReviewScreenInput = {
  applicationId: string | number;
  essentialItems?: Array<ExpenseItemsInput> | null | undefined;
  financialLoanItems?: Array<ExpenseItemsInput> | null | undefined;
  incomeAmount?: number | null | undefined;
  subscriptionItems?: Array<ExpenseItemsInput> | null | undefined;
};

export type CreateApplicationMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateApplicationMutation = { createApplication:
    | { __typename: 'CollectIncomePayload', applicationId: string, screen: ApplicationScreen }
    | { __typename: 'CompletedPayload' }
    | { __typename: 'EssentialExpensePayload' }
    | { __typename: 'FinancialLoanExpensePayload' }
    | { __typename: 'InformationReviewPayload' }
    | { __typename: 'SubscriptionExpensePayload' }
   };

export type SubmitCollectIncomeScreenMutationVariables = Exact<{
  input: CollectIncomeApplicationInput;
}>;


export type SubmitCollectIncomeScreenMutation = { submitCollectIncomeScreen:
    | { __typename: 'CollectIncomePayload', applicationId: string, screen: ApplicationScreen }
    | { __typename: 'CompletedPayload' }
    | { __typename: 'EssentialExpensePayload', applicationId: string, screen: ApplicationScreen }
    | { __typename: 'FinancialLoanExpensePayload' }
    | { __typename: 'InformationReviewPayload' }
    | { __typename: 'SubscriptionExpensePayload' }
   };

export type SubmitExpenseScreenMutationVariables = Exact<{
  input: ExpenseApplicationInput;
}>;


export type SubmitExpenseScreenMutation = { submitExpenseScreen:
    | { __typename: 'CollectIncomePayload' }
    | { __typename: 'CompletedPayload' }
    | { __typename: 'EssentialExpensePayload', applicationId: string, screen: ApplicationScreen }
    | { __typename: 'FinancialLoanExpensePayload', applicationId: string, screen: ApplicationScreen }
    | { __typename: 'InformationReviewPayload', applicationId: string, screen: ApplicationScreen, incomeAmount: number, essentialItems: Array<{ name: string, amount: number, source: ExpenseSource }>, financialLoanItems: Array<{ name: string, amount: number, source: ExpenseSource }>, subscriptionItems: Array<{ name: string, amount: number, source: ExpenseSource }> }
    | { __typename: 'SubscriptionExpensePayload', applicationId: string, screen: ApplicationScreen }
   };

export type SubmitInformationReviewScreenMutationVariables = Exact<{
  input: InformationReviewScreenInput;
}>;


export type SubmitInformationReviewScreenMutation = { submitInformationReviewScreen:
    | { __typename: 'CollectIncomePayload' }
    | { __typename: 'CompletedPayload', screen: ApplicationScreen }
    | { __typename: 'EssentialExpensePayload' }
    | { __typename: 'FinancialLoanExpensePayload' }
    | { __typename: 'InformationReviewPayload', screen: ApplicationScreen, incomeAmount: number, essentialItems: Array<{ name: string, amount: number, source: ExpenseSource }>, financialLoanItems: Array<{ name: string, amount: number, source: ExpenseSource }>, subscriptionItems: Array<{ name: string, amount: number, source: ExpenseSource }> }
    | { __typename: 'SubscriptionExpensePayload' }
   };

export type CollectedExpenseDataQueryVariables = Exact<{ [key: string]: never; }>;


export type CollectedExpenseDataQuery = { collectedExpenseData: { userId: string, applicationId: string, income: number, totalExpense: number, moneyLeft: number, savingsRate: number, essentialItems: Array<{ name: string, amount: number, source: CollectedExpenseSource }>, financialItems: Array<{ name: string, amount: number, source: CollectedExpenseSource }>, subscriptionItems: Array<{ name: string, amount: number, source: CollectedExpenseSource }> } };

export type LoginQueryVariables = Exact<{
  email: string;
  password: string;
}>;


export type LoginQuery = { login: { sessionId: string, user: { id: string, name: string, email: string, dateOfBirth: string } } };


export const CreateApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createApplication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CollectIncomePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"screen"}}]}}]}}]}}]} as unknown as DocumentNode<CreateApplicationMutation, CreateApplicationMutationVariables>;
export const SubmitCollectIncomeScreenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitCollectIncomeScreen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CollectIncomeApplicationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitCollectIncomeScreen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CollectIncomePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"screen"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EssentialExpensePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"screen"}}]}}]}}]}}]} as unknown as DocumentNode<SubmitCollectIncomeScreenMutation, SubmitCollectIncomeScreenMutationVariables>;
export const SubmitExpenseScreenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitExpenseScreen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExpenseApplicationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitExpenseScreen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EssentialExpensePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"screen"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FinancialLoanExpensePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"screen"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriptionExpensePayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"screen"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InformationReviewPayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"screen"}},{"kind":"Field","name":{"kind":"Name","value":"incomeAmount"}},{"kind":"Field","name":{"kind":"Name","value":"essentialItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}},{"kind":"Field","name":{"kind":"Name","value":"financialLoanItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subscriptionItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SubmitExpenseScreenMutation, SubmitExpenseScreenMutationVariables>;
export const SubmitInformationReviewScreenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitInformationReviewScreen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InformationReviewScreenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitInformationReviewScreen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InformationReviewPayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"screen"}},{"kind":"Field","name":{"kind":"Name","value":"incomeAmount"}},{"kind":"Field","name":{"kind":"Name","value":"essentialItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}},{"kind":"Field","name":{"kind":"Name","value":"financialLoanItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subscriptionItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CompletedPayload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"screen"}}]}}]}}]}}]} as unknown as DocumentNode<SubmitInformationReviewScreenMutation, SubmitInformationReviewScreenMutationVariables>;
export const CollectedExpenseDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CollectedExpenseData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectedExpenseData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"income"}},{"kind":"Field","name":{"kind":"Name","value":"totalExpense"}},{"kind":"Field","name":{"kind":"Name","value":"moneyLeft"}},{"kind":"Field","name":{"kind":"Name","value":"savingsRate"}},{"kind":"Field","name":{"kind":"Name","value":"essentialItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}},{"kind":"Field","name":{"kind":"Name","value":"financialItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subscriptionItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}}]}}]}}]} as unknown as DocumentNode<CollectedExpenseDataQuery, CollectedExpenseDataQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}}]}}]}}]}}]} as unknown as DocumentNode<LoginQuery, LoginQueryVariables>;