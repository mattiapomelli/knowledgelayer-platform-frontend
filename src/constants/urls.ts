import { hardhat, polygonMumbai } from "wagmi/chains";

if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  throw new Error("ALCHEMY_KEY envinronment variable must be defined");
}

export const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

export const EXPLORER_URL: Record<number, string> = {
  [polygonMumbai.id]: "https://polygonscan.com",
  [hardhat.id]: "",
};

export const getAddressExplorerLink = (chainId: number, address: string) => {
  return `${EXPLORER_URL[chainId]}/address/${address}`;
};
