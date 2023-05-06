import { gql } from "graphql-request";
import { useQuery } from "wagmi";

import { graphQlRequest } from "@utils/graphql-client";

import type { Course } from "@lib/courses/types";

const getUserPurchasedCourses = gql`
  query GetUserCourses($id: String!) {
    user(id: $id) {
      purchasedCourses {
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

export interface UserPurchasedCourses {
  user: {
    purchasedCourses: Course[];
  };
}

export const useUserPurchasedCourses = (userId: string) => {
  return useQuery(["user-purchased-courses", userId], async () =>
    graphQlRequest<UserPurchasedCourses>(getUserPurchasedCourses, {
      id: userId,
    }).then((data) => data.user.purchasedCourses),
  );
};
