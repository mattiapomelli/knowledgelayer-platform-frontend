import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSwitchNetwork } from "wagmi";

import { Button } from "@components/basic/button";
import { CHAIN } from "@constants/chains";
import { useCreateProfileModal } from "@hooks/use-create-profile-modal";
import { useKnowledgeLayerContext } from "context/knowledgelayer-provider";

import { UserDropdown } from "./user-dropdown";

export const UserStatus = () => {
  const { user } = useKnowledgeLayerContext();
  const openCreateProfileModal = useCreateProfileModal();

  const { address } = useAccount();
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
              onClick={() => switchNetwork?.(CHAIN.id)}
              type="button"
            >
              Switch to {CHAIN.name}
            </Button>
          );
        }

        if (connected && address && !user) {
          return <Button onClick={openCreateProfileModal}>Create KL Id</Button>;
        }

        if (connected && address && user) {
          return <UserDropdown user={user} />;
        }

        return <Button onClick={openConnectModal}>Connect Wallet</Button>;
      }}
    </ConnectButton.Custom>
  );
};
