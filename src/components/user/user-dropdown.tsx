import { UserIcon } from "@heroicons/react/24/outline";
import { useDisconnect } from "wagmi";

import { CHAIN } from "@constants/chains";
import { getAddressExplorerLink } from "@constants/urls";
import CopyIcon from "@icons/copy.svg";
import DisconnectIcon from "@icons/disconnect.svg";
import ExternalLinkIcon from "@icons/externallink.svg";
import { copyToClipboard } from "@utils/copy-to-clipboard";

import { AddressAvatar } from "../address-avatar";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  DropdownItem,
  WrappedLink,
} from "../basic/dropdown";

import type { User } from "@lib/users/types";

interface UserDropdownProps {
  user: User;
}

export const UserDropdown = ({ user }: UserDropdownProps) => {
  const { disconnect } = useDisconnect();

  return (
    <Dropdown className="inline-flex">
      <DropdownTrigger className="rounded-btn flex items-center gap-2 bg-base-200 px-4 py-1.5 hover:bg-base-300">
        <AddressAvatar address={user.address} />
        <span className="font-medium">{user.handle}.kl</span>
      </DropdownTrigger>
      <DropdownContent className="right-0 mt-2">
        <DropdownItem
          href={`user/${user.id}`}
          rel="noopener noreferrer"
          as={WrappedLink}
          className="gap-2 text-sm"
        >
          <UserIcon className="h-5 w-5 text-lg" />
          Profile
        </DropdownItem>
        <DropdownItem
          onClick={() => copyToClipboard(user.address)}
          as="button"
          className="gap-2 text-sm"
        >
          <CopyIcon className="h-5 w-5 text-lg" />
          Copy address
        </DropdownItem>
        <DropdownItem
          href={getAddressExplorerLink(CHAIN.id, user.address)}
          target="_blank"
          rel="noopener noreferrer"
          as="a"
          className="gap-2 text-sm"
        >
          <ExternalLinkIcon className="h-5 w-5 text-lg" />
          See in explorer
        </DropdownItem>
        <DropdownItem
          as="button"
          onClick={() => disconnect()}
          className="gap-2 text-sm"
        >
          <DisconnectIcon className="h-5 w-5 text-lg" />
          Disconnect
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};
