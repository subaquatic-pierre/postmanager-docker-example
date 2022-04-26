import { gql } from '@apollo/client';

export const GET_MEDIA = gql`
  query GetMedia($postId: String!, $mediaName: String!) {
    mediaData(postId: $postId, mediaName: $mediaName) {
      dataSrc
    }
  }
`;

export const ALL_POST_META_DATA = gql`
  query AllPostMetaData {
    allPostMetaData {
      id
      title
      tags
    }
  }
`;

export const GET_POST = gql`
  query GetPost($postId: String!) {
    post(postId: $postId) {
      metaData {
        id
        title
        tags
      }
      mediaData {
        mediaName
        filename
      }
      content
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($postId: String!) {
    deletePost(postId: $postId) {
      deleted
      postId
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $tags: String!
    $content: String!
    $mediaData: [PostMediaDataInput]
  ) {
    createPost(
      title: $title
      tags: $tags
      content: $content
      mediaData: $mediaData
    ) {
      post {
        metaData {
          id
          title
          tags
        }
        mediaData {
          mediaName
        }
        content
      }
    }
  }
`;

export const EDIT_POST = gql`
  mutation EditPost(
    $postId: String!
    $title: String!
    $tags: String!
    $content: String!
    $mediaData: [PostMediaDataInput]
  ) {
    editPost(
      postId: $postId
      title: $title
      tags: $tags
      content: $content
      mediaData: $mediaData
    ) {
      post {
        metaData {
          id
          title
          tags
        }
        mediaData {
          mediaName
        }
        content
      }
    }
  }
`;
