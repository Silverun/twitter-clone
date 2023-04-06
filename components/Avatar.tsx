import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEvent, useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar = ({ userId, isLarge, hasBorder }: AvatarProps) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();

  const onClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();

      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`
  ${hasBorder ? "border-spacing-4 border-black" : null} 
  ${isLarge ? "h-32 w-32" : "h-12 w-12"}
  rounded-full
  hover:opacity-90
  transition
  cursor-pointer
  relative
  `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};
export default Avatar;
