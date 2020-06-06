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
export const createVideo = /* GraphQL */ `
  mutation CreateVideo(
    $input: CreateVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    createVideo(input: $input, condition: $condition) {
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
export const updateVideo = /* GraphQL */ `
  mutation UpdateVideo(
    $input: UpdateVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    updateVideo(input: $input, condition: $condition) {
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
export const deleteVideo = /* GraphQL */ `
  mutation DeleteVideo(
    $input: DeleteVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    deleteVideo(input: $input, condition: $condition) {
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
export const createAlbum = /* GraphQL */ `
  mutation CreateAlbum(
    $input: CreateAlbumInput!
    $condition: ModelAlbumConditionInput
  ) {
    createAlbum(input: $input, condition: $condition) {
      createdAt
      title
      id
      date
      images
      updatedAt
    }
  }
`;
export const updateAlbum = /* GraphQL */ `
  mutation UpdateAlbum(
    $input: UpdateAlbumInput!
    $condition: ModelAlbumConditionInput
  ) {
    updateAlbum(input: $input, condition: $condition) {
      createdAt
      title
      id
      date
      images
      updatedAt
    }
  }
`;
export const deleteAlbum = /* GraphQL */ `
  mutation DeleteAlbum(
    $input: DeleteAlbumInput!
    $condition: ModelAlbumConditionInput
  ) {
    deleteAlbum(input: $input, condition: $condition) {
      createdAt
      title
      id
      date
      images
      updatedAt
    }
  }
`;
