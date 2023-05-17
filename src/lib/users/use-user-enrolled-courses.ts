import { gql } from "graphql-request";
import { useQuery } from "wagmi";

import { graphQlRequest } from "@utils/graphql-client";

import type { Course } from "@lib/courses/types";

const getUserEnrolledCourses = gql`
  query GetUserEnrolledCourses($id: String!) {
    user(id: $id) {
      purchasedCourses(where: { description_not: null }) {
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

export interface UserEnrolledCourses {
  user: {
    purchasedCourses: Course[];
  };
}

export const useUserEnrolledCourses = (userId: string) => {
  return useQuery(["user-enrolled-courses", userId], async () =>
    graphQlRequest<UserEnrolledCourses>(getUserEnrolledCourses, {
      id: userId,
    }).then((data) => data.user.purchasedCourses),
  );
};
