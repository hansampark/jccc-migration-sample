/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWeekly = /* GraphQL */ `
  query GetWeekly($id: ID!) {
    getWeekly(id: $id) {
      createdAt
      date
      id
      images
      updatedAt
    }
  }
`;
export const listWeeklys = /* GraphQL */ `
  query ListWeeklys(
    $filter: ModelWeeklyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWeeklys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        date
        id
        images
        updatedAt
      }
      nextToken
    }
  }
`;
