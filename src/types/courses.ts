import type { BigNumber } from "ethers";

export interface Course {
  id: number;
  seller: `0x${string}`;
  title: string;
  slug: string;
  description: string;
  price: BigNumber;
  image: string;
  videoPlaybackId: string;
}
