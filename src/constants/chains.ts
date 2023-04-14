import { hardhat, polygonMumbai } from "wagmi/chains";

export type ChainMap = { [chainId: number]: string };

const getDefaultChain = () => {
  if (!process.env.NEXT_PUBLIC_CHAIN) {
    throw new Error("NEXT_PUBLIC_CHAIN envinronment variable must be defined");
  }

  switch (process.env.NEXT_PUBLIC_CHAIN) {
    case "localhost":
      return hardhat;
    case "testnet":
      return polygonMumbai;
    default:
      throw new Error("Invalid NEXT_PUBLIC_CHAIN value");
  }
};

export const CHAIN = getDefaultChain();
