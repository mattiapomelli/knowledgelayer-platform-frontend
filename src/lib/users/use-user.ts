import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { graphQlRequest } from "@utils/graphql-client";

import type { User } from "./types";

const getUser = gql`
  query getUser($id: String!) {
    user(id: $id) {
      id
      createdAt
      handle
      address
      rating
      description {
        title
        about
        name
        role
        image_url
      }
    }
  }
`;

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () =>
      graphQlRequest<{ user: User }>(getUser, { id }).then((data) => data.user),
  });
};
