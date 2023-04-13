import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { hardhat, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { DefaultLayout } from "@layouts/default-layout";

import SEO from "../../next-seo.config";

import type { ExtendedPage } from "@types";
import type { Session } from "next-auth";
import type { AppProps } from "next/app";

const { chains, provider } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? [] : [hardhat]),
    polygonMumbai,
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

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const getLayout =
    (Component as ExtendedPage).getLayout ||
    ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <RainbowKitSiweNextAuthProvider>
          <RainbowKitProvider chains={chains}>
            <LivepeerConfig client={livePeerClient}>
              <ThemeProvider>
                <DefaultSeo {...SEO} />
                {getLayout(<Component {...pageProps} />)}
              </ThemeProvider>
            </LivepeerConfig>
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
