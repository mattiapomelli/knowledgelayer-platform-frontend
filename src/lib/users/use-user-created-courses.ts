import { gql } from "graphql-request";
import { useQuery } from "wagmi";

import { graphQlRequest } from "@utils/graphql-client";

import type { Course } from "@lib/courses/types";

const getUserCreatedCourses = gql`
  query GetUserCourses($id: String!) {
    user(id: $id) {
      createdCourses {
        id
        createdAt
        updatedAt
        seller {
          id
          address
        }
        token {
          address
        }
        price
        description {
          title
          about
          image_url
        }
      }
    }
  }
`;

export interface UserCreatedCourses {
  user: {
    createdCourses: Course[];
  };
}

export const useUserCreatedCourses = (userId: string) => {
  return useQuery(["user-created-courses", userId], async () =>
    graphQlRequest<UserCreatedCourses>(getUserCreatedCourses, {
      id: userId,
    }).then((data) => data.user.createdCourses),
  );
};
