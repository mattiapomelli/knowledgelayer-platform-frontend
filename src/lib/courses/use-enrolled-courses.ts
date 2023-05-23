import { gql } from "graphql-request";
import { useQuery } from "wagmi";

import { graphQlRequest } from "@utils/graphql-client";

import type { Course } from "@lib/courses/types";

const getEnrolledCourses = gql`
  query GetEnrolledCourses($id: String!) {
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

export interface UserEnrolledCourses {
  user: {
    purchasedCourses: Course[];
  };
}

export const useEnrolledCourses = (userId: string) => {
  return useQuery(["enrolled-courses", userId], async () =>
    graphQlRequest<UserEnrolledCourses>(getEnrolledCourses, {
      id: userId,
    }).then((data) => data.user.purchasedCourses),
  );
};
