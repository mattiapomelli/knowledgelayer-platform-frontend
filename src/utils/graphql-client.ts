import { GraphQLClient } from "graphql-request";

import { SUBGRAPH_URL } from "@constants/urls";

import type { Variables } from "graphql-request";

const client = new GraphQLClient(SUBGRAPH_URL);

export const graphQlRequest = async <T>(
  query: string,
  variables?: Variables,
) => {
  return await client.request<T>(query, variables);
};
