import { gql } from '@apollo/client';

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
