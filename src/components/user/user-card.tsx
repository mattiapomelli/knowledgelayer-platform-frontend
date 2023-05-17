import Image from "next/legacy/image";
import Link from "next/link";

import type { User } from "@lib/users/types";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link
      href={`/user/${user.id}}`}
      className="rounded-box flex w-full items-center gap-4 bg-base-200 px-3 py-2 hover:bg-base-300"
    >
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <Image
          src="/placeholder.png"
          layout="fill"
          objectFit="cover"
          alt="User"
          priority
        />
      </div>

      <div className="flex flex-col">
        <h4 className="mt-1 font-semibold">{user.handle}</h4>
        {user.description?.about && (
          <p className="text-sm text-base-content/70">
            {user.description.about.substring(0, 30).concat("...")}
          </p>
        )}
      </div>
    </Link>
  );
};
