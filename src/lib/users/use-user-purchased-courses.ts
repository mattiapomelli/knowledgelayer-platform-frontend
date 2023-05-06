import { gql } from "graphql-request";
import { useQuery } from "wagmi";

import { graphQlRequest } from "@utils/graphql-client";

import type { Course } from "@lib/courses/types";

const getUserPurchasedCourses = gql`
  query GetUserCourses($id: Int!) {
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

export const useUserPurchasedCourses = (profileId: number) => {
  return useQuery(["user-purchased-courses", profileId], async () =>
    graphQlRequest<UserPurchasedCourses>(getUserPurchasedCourses, {
      id: profileId,
    }).then((data) => data.user.purchasedCourses),
  );
};
