import { gql } from "graphql-request";
import { useQuery } from "wagmi";

import { graphQlRequest } from "@utils/graphql-client";

import type { User } from "./types";

const getUserByAddress = gql`
  query GetUserByAddress($address: String!) {
    users(where: { address: $address }, first: 1) {
      id
    }
  }
`;

export const useUserByAddress = (address: string) => {
  return useQuery(
    ["user-by-address", address],
    async () =>
      graphQlRequest<{ users: User[] }>(getUserByAddress, {
        address: address.toLowerCase(),
      }).then((data) => data.users[0]),
    {
      enabled: !!address,
    },
  );
};
