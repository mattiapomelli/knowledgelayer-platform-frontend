import { Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount } from "wagmi";

import { Logo } from "@components/basic/logo";
import { ThemeToggle } from "@components/basic/theme-toggle";
import { WalletStatus } from "@components/wallet/wallet-status";
import { useTransitionControl } from "@hooks/use-transition-control";
import { useUserByAddress } from "@lib/users/use-user-by-address";

import { Container } from "./container";
import { MobileMenu } from "./mobile-menu";

interface NavItemProps {
  text: string;
  href: string;
}

const NavItem = ({ text, href }: NavItemProps) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={cx("rounded-btn py-2 px-4 font-medium hover:bg-base-200", {
          "bg-base-200": router.pathname.startsWith(href),
        })}
      >
        {text}
      </a>
    </Link>
  );
};

export const Navbar = () => {
  const { isConnecting, isReconnecting, address } = useAccount();
  const [showMenu, setShowMenu] = useState(false);

  const [show] = useTransitionControl(isReconnecting || isConnecting);

  const { data: user } = useUserByAddress(address || "");

  return (
    <header className="relative">
      <Container className="flex h-20 w-full items-center justify-between">
        <Logo className="hidden sm:block" />
        <Transition
          show={show}
          enter="transition-opacity duration-250"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 md:flex">
              <NavItem text="Dashboard" href={`/users/${user?.id}`} />
              <NavItem text="Create course" href="/create" />
            </div>
            <ThemeToggle />
            <WalletStatus />

            <button
              onClick={() => setShowMenu((show) => !show)}
              className="rounded-btn p-1.5 hover:bg-base-200 md:hidden"
              aria-expanded="false"
            >
              <span className="sr-only">
                {showMenu ? "Close menu" : "Open menu"}
              </span>
              {showMenu ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </Transition>
      </Container>

      {/* Mobile Mobile */}
      <MobileMenu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        className="md:hidden"
      />
    </header>
  );
};
