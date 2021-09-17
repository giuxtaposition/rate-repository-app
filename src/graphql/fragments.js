import { gql } from '@apollo/client';

export const REPOSITORY_FRAGMENT = gql`
  fragment RepositoryFields on Repository {
    id
    ownerName
    name
    createdAt
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    description
    language
    ownerAvatarUrl
  }
`;

export const REVIEW_FRAGMENT = gql`
  fragment ReviewFields on ReviewConnection {
    totalCount
    edges {
      node {
        id
        text
        rating
        createdAt
        repositoryId
        user {
          id
          username
        }
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
`;
