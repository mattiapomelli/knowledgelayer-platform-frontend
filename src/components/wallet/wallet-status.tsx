import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

import { Button } from "@components/basic/button";

import { WalletDropdown } from "./wallet-dropdown";

export const WalletStatus = () => {
  const { address } = useAccount();

  const { chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal }) => {
        const connected = account && chain;

        if (chain?.unsupported) {
          return (
            <Button
              size="sm"
              color="error"
              onClick={() => switchNetwork?.(chains[0].id)}
              type="button"
            >
              Switch to {chains[0].name}
            </Button>
          );
        }

        if (connected && address) {
          return <WalletDropdown address={address} />;
        }

        return <Button onClick={openConnectModal}>Connect Wallet</Button>;
      }}
    </ConnectButton.Custom>
  );
};
