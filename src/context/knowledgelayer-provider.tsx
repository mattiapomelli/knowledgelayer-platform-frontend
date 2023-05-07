import { gql } from "graphql-request";
import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { graphQlRequest } from "@utils/graphql-client";

import type { User } from "@lib/users/types";
import type { ReactNode } from "react";

interface KnowledgeLayerContextValue {
  user: User | null;
}

const KnowledgeLayerContext = createContext<
  KnowledgeLayerContextValue | undefined
>(undefined);

const getUserByAddress = gql`
  query GetUserByAddress($address: String!) {
    users(where: { address: $address }, first: 1) {
      id
    }
  }
`;

export const KnowledgeLayerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { address } = useAccount();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (!address) {
        setUser(null);
        return;
      }

      const res = await graphQlRequest<{ users: User[] }>(getUserByAddress, {
        address: address.toLowerCase(),
      });

      console.log("Here: ", res);

      if (res.users.length === 0) {
        setUser(null);
        return;
      }

      setUser(res.users[0]);
    };

    getUser();
  }, [address]);

  return (
    <KnowledgeLayerContext.Provider value={{ user }}>
      {children}
    </KnowledgeLayerContext.Provider>
  );
};

export const useKnowledgeLayerContext = () => {
  const context = useContext(KnowledgeLayerContext);

  if (context === undefined) {
    throw new Error(
      "useKnowledgeLayerContext must be used within an KnowledgeLayerProvider",
    );
  }

  return context;
};
