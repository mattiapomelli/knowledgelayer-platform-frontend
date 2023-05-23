import cx from "classnames";
import Image from "next/image";
import Link from "next/link";

import type { User } from "@lib/users/types";

interface UserAvatarProps {
  user: User;
  className?: string;
}

export const UserAvatar = ({ user, className }: UserAvatarProps) => {
  return (
    <div className={cx("flex items-center gap-4", className)}>
      <div className="relative mt-2 h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <Image
          src={user.description?.image_url || "/placeholder.png"}
          fill
          className="object-cover"
          alt="Profile"
          priority
        />
      </div>
      <Link href={`/user/${user.id}`}>
        <h4 className="mt-1 text-lg font-semibold hover:opacity-70">
          {user.handle}
        </h4>
      </Link>
    </div>
  );
};
