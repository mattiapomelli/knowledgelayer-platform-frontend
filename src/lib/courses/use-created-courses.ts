import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { graphQlRequest } from "@utils/graphql-client";

import type { Course } from "@lib/courses/types";

const getCreatedCourses = gql`
  query GetCreatedCourses($id: String!) {
    user(id: $id) {
      createdCourses(where: { description_not: null }) {
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
        rating
        description {
          title
          about
          keywords
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

export const useCreatedCourses = (userId: string) => {
  return useQuery({
    queryKey: ["created-courses", userId],
    queryFn: async () =>
      graphQlRequest<UserCreatedCourses>(getCreatedCourses, {
        id: userId,
      }).then((data) => data.user.createdCourses),
  });
};
