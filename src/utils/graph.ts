import { graphQlRequest } from "./graphql-client";

export const graphIsSynced = async (
  entity: string,
  cid: string,
): Promise<number> => {
  return new Promise<number>((resolve) => {
    const interval = setInterval(async () => {
      const response = await checkEntityByUri(entity, cid);
      if (response?.data?.[entity][0]) {
        clearInterval(interval);
        resolve(response?.data?.[entity][0].id);
      }
    }, 5000);
  });
};

export const checkEntityByUri = (entity: string, id: string): Promise<any> => {
  let query;
  if (entity.includes("Description")) {
    query = `
      {
        ${entity}(where: {id: "${id}"}, first: 1) {
          id
        }
      } `;
  } else {
    query = `
      {
        ${entity}(where: {cid: "${id}"}, first: 1) {
          id
        }
      } `;
  }
  return graphQlRequest(query);
};
