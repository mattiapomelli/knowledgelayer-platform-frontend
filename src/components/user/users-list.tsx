import cx from "classnames";

import { Spinner } from "@components/basic/spinner";
import { useUsers } from "@lib/users/use-users";

import { UserCard } from "./user-card";

const UsersListInner = () => {
  const { data: users, isLoading } = useUsers();

  if (isLoading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (users?.length === 0)
    return (
      <div className="my-14 flex justify-center">
        <p>No learners yet</p>
      </div>
    );

  return (
    <div className="grid grid-cols-autofill flex-col gap-4 md:flex">
      {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export const UsersList = ({ className }: { className?: string }) => {
  return (
    <div>
      <h4 className={cx("mb-4 mt-2 text-xl font-bold", className)}>Learners</h4>
      <UsersListInner />
    </div>
  );
};
