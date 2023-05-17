import Link from "next/link";

import { Button } from "@components/basic/button";
import { Tabs } from "@components/basic/tabs";
import { CreatedCourses } from "@components/created-courses";
import { PurchasedCourses } from "@components/purchased-courses";

const DashboardPage = () => {
  const items = [
    {
      label: "Purchased Courses",
      content: <PurchasedCourses />,
    },
    {
      label: "Created Courses",
      content: <CreatedCourses />,
    },
  ];

  return (
    <div className="container">
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
      <Tabs items={items} className="mb-8 mt-12" />
    </div>
  );
};

export default DashboardPage;
