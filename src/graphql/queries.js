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
export const getAlbum = /* GraphQL */ `
  query GetAlbum($id: ID!) {
    getAlbum(id: $id) {
      createdAt
      title
      id
      date
      images
      updatedAt
    }
  }
`;
export const listAlbums = /* GraphQL */ `
  query ListAlbums(
    $filter: ModelAlbumFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAlbums(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getSample = /* GraphQL */ `
  query GetSample($id: ID!) {
    getSample(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listSamples = /* GraphQL */ `
  query ListSamples(
    $filter: ModelSampleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSamples(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
