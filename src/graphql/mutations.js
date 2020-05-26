/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createWeekly = /* GraphQL */ `
  mutation CreateWeekly(
    $input: CreateWeeklyInput!
    $condition: ModelWeeklyConditionInput
  ) {
    createWeekly(input: $input, condition: $condition) {
      createdAt
      date
      id
      images
      updatedAt
    }
  }
`;
export const updateWeekly = /* GraphQL */ `
  mutation UpdateWeekly(
    $input: UpdateWeeklyInput!
    $condition: ModelWeeklyConditionInput
  ) {
    updateWeekly(input: $input, condition: $condition) {
      createdAt
      date
      id
      images
      updatedAt
    }
  }
`;
export const deleteWeekly = /* GraphQL */ `
  mutation DeleteWeekly(
    $input: DeleteWeeklyInput!
    $condition: ModelWeeklyConditionInput
  ) {
    deleteWeekly(input: $input, condition: $condition) {
      createdAt
      date
      id
      images
      updatedAt
    }
  }
`;
