import { useAccount } from "wagmi";

import { useUserByAddress } from "./use-user-by-address";

export const useActiveUser = () => {
  const { address } = useAccount();

  return useUserByAddress({
    address,
    queryOptions: {
      staleTime: Infinity, // Active user is always fresh, can refetch on demand
    },
  });
};
