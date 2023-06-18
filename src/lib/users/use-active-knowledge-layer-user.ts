import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import invariant from "tiny-invariant";
import { useAccount } from "wagmi";

import { graphQlRequest } from "@utils/graphql-client";

import type { User } from "@lib/users/types";

const getUserByAddress = gql`
  query GetUserByAddress($address: String!) {
    users(where: { address: $address }, first: 1) {
      id
      createdAt
      handle
      address
      description {
        title
        about
        name
        role
      }
    }
  }
`;

const useKnowledgeLayerUser = ({ address }: { address?: `0x${string}` }) => {
  const { data: user, ...rest } = useQuery({
    queryKey: ["knowledge-layer-user", address],
    queryFn: async () => {
      invariant(address);

      const res = await graphQlRequest<{ users: User[] }>(getUserByAddress, {
        address: address.toLowerCase(),
      });

      if (res.users.length === 0) {
        return null;
      }

      return res.users[0];
    },
    enabled: !!address,
  });

  return {
    user,
    ...rest,
  };
};

export const useKnowledgeLayerActiveUser = () => {
  const { address } = useAccount();

  return useKnowledgeLayerUser({ address });
};
