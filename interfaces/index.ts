import { Comment, Prisma } from "@prisma/client";

export type User = Prisma.UserGetPayload<{
  include: {
    posts: true;
    comments: true;
    notifications: true;
  };
}> & { followersCount: number };

export type PostWithComments = Prisma.PostGetPayload<{
  include: {
    comments: true;
    user: true;
  };
}>;
