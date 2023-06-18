import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { graphQlRequest } from "@utils/graphql-client";

import type { User } from "./types";

const getAllUsers = gql`
  {
    users {
      id
      createdAt
      handle
      address
      description {
        title
        about
        name
        role
        image_url
      }
      createdCourses {
        id
      }
      purchasedCourses {
        id
      }
    }
  }
`;

export const useUsers = () => {
  return useQuery(["users"], async () =>
    graphQlRequest<{ users: User[] }>(getAllUsers).then((data) => data.users),
  );
};
