import Link from "next/link";
import { useAccount } from "wagmi";

import { Button } from "@components/basic/button";
import { Spinner } from "@components/basic/spinner";
import { Tabs } from "@components/basic/tabs";
import { CreatedCourses } from "@components/created-courses";
import { PurchasedCourses } from "@components/purchased-courses";
import { WalletStatus } from "@components/wallet/wallet-status";

const Profile = ({ userAddress }: { userAddress: `0x${string}` }) => {
  const items = [
    {
      label: "Purchased Courses",
      content: <PurchasedCourses user={userAddress} />,
    },
    {
      label: "Created Courses",
      content: <CreatedCourses user={userAddress} />,
    },
  ];

  return <Tabs items={items} className="mb-8 mt-12" />;
};

const DashboardPage = () => {
  const { address, isConnecting, isReconnecting } = useAccount();

  return (
    <>
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold underline decoration-primary">
          Dashboard 📋
        </h1>
        <div className="flex gap-2">
          <Link href="/create">
            <Button>Create course</Button>
          </Link>
        </div>
      </div>
      {isConnecting || isReconnecting ? (
        <div className="my-14 flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          {address ? (
            <Profile userAddress={address} />
          ) : (
            <div className="my-14 flex flex-col items-center gap-3">
              <p>Connect your wallet to see your dashboard</p>
              <Link href="/create">
                <WalletStatus />
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DashboardPage;
