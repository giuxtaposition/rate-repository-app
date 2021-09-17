import { gql } from '@apollo/client';

import { REPOSITORY_FRAGMENT, REVIEW_FRAGMENT } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories(
    $first: Int
    $after: String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      totalCount
      edges {
        node {
          ...RepositoryFields
        }
        cursor
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

export const GET_USERS = gql`
  {
    users {
      edges {
        node {
          username
        }
      }
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        ...ReviewFields
      }
    }
  }
  ${REVIEW_FRAGMENT}
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      url
      ...RepositoryFields
      reviews(first: $first, after: $after) {
        ...ReviewFields
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
  ${REVIEW_FRAGMENT}
`;
