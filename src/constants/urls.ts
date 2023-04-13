import { hardhat, polygonMumbai } from "wagmi/chains";

export const EXPLORER_URL: Record<number, string> = {
  [polygonMumbai.id]: "https://polygonscan.com",
  [hardhat.id]: "",
};

export const getAddressExplorerLink = (chainId: number, address: string) => {
  return `${EXPLORER_URL[chainId]}/address/${address}`;
};
