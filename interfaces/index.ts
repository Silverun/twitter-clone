import { Prisma } from "@prisma/client";

export type User = Prisma.UserGetPayload<{
  include: {
    posts: true;
    comments: true;
    notifications: true;
  };
}> & { followersCount: number };
