import { gql } from "graphql-request";
import { useQuery } from "wagmi";

import { graphQlRequest } from "@utils/graphql-client";

import type { User } from "./types";

const getCourse = gql`
  query getCourse($id: String!) {
    user(id: $id) {
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
    }
  }
`;

export const useUser = (id: string) => {
  return useQuery(["user", id], async () =>
    graphQlRequest<{ user: User }>(getCourse, { id }).then((data) => data.user),
  );
};
