import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAtom } from "jotai";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CreateProfileModal } from "@components/modals/create-profile-modal";
import { CHAIN } from "@constants/chains";
import { createProfileModalAtom } from "@hooks/use-create-profile-modal";
import { DefaultLayout } from "@layouts/default-layout";
import { env } from "env.mjs";

import SEO from "../../next-seo.config";

import type { ExtendedPage } from "@types";
import type { Session } from "next-auth";
import type { AppProps } from "next/app";

const { chains, provider } = configureChains(
  [CHAIN],
  [
    alchemyProvider({ apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY || "" }),
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
    apiKey: env.NEXT_PUBLIC_LIVEPEER_API_KEY || "",
  }),
});

const queryClient = new QueryClient();
const ReactQueryDevtoolsProduction = dynamic(
  () =>
    // eslint-disable-next-line import/extensions
    import("@tanstack/react-query-devtools/build/lib/index.prod.js").then(
      (d) => ({
        default: d.ReactQueryDevtools,
      }),
    ),
  { ssr: false },
);

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const [open, setOpen] = useAtom(createProfileModalAtom);

  const [showReactQueryDevtools, setShowReactQueryDevtools] = useState(false);
  useEffect(() => {
    // @ts-expect-error - window doesn't have toggleDevtools but we're adding it
    window.toggleDevtools = () => setShowReactQueryDevtools((old) => !old);
  }, []);

  const getLayout =
    (Component as ExtendedPage).getLayout ||
    ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {showReactQueryDevtools && <ReactQueryDevtoolsProduction />}

      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider chains={chains}>
              <LivepeerConfig client={livePeerClient}>
                <ThemeProvider>
                  <DefaultSeo {...SEO} />
                  {getLayout(<Component {...pageProps} />)}
                  <CreateProfileModal
                    open={open}
                    onClose={() => setOpen(false)}
                  />
                </ThemeProvider>
              </LivepeerConfig>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default MyApp;
