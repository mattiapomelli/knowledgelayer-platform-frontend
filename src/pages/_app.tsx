import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { hardhat, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { DefaultLayout } from "@layouts/default-layout";
import { ExtendedPage } from "@types";

import SEO from "../../next-seo.config";

import type { AppProps } from "next/app";

const { chains, provider } = configureChains(
  [
    polygonMumbai,
    ...(process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? [] : [hardhat]),
  ],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "" }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: "KnowledgeLayer Platform Frontend",
  chains,
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  persister: null,
});

const livePeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY || "",
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as ExtendedPage).getLayout ||
    ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <LivepeerConfig client={livePeerClient}>
          <ThemeProvider>
            <DefaultSeo {...SEO} />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </LivepeerConfig>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
