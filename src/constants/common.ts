export const ETH_ADDRESS = "0x0000000000000000000000000000000000000000";

if (!process.env.NEXT_PUBLIC_PLATFORM_ID) {
  throw new Error("NEXT_PUBLIC_PLATFORM_ID is not set");
}

export const PLATFORM_ID = process.env.NEXT_PUBLIC_PLATFORM_ID;

export const FEE_DIVIDER = 10000;
