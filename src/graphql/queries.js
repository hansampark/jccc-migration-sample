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
export const getVideo = /* GraphQL */ `
  query GetVideo($id: ID!) {
    getVideo(id: $id) {
      category
      createdAt
      date
      id
      tags
      title
      updatedAt
      youtubeId
    }
  }
`;
export const listVideos = /* GraphQL */ `
  query ListVideos(
    $filter: ModelVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        category
        createdAt
        date
        id
        tags
        title
        updatedAt
        youtubeId
      }
      nextToken
    }
  }
`;
export const getBulletin = /* GraphQL */ `
  query GetBulletin($id: ID!) {
    getBulletin(id: $id) {
      createdAt
      title
      id
      date
      images
      updatedAt
    }
  }
`;
export const listBulletins = /* GraphQL */ `
  query ListBulletins(
    $filter: ModelBulletinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBulletins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        title
        id
        date
        images
        updatedAt
      }
      nextToken
    }
  }
`;
