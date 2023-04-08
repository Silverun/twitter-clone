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
    user: true;
  };
}> & { comments: CommentExtended[] };

export type CommentExtended = Prisma.CommentGetPayload<{
  include: {
    post: true;
    user: true;
  };
}>;

export type NotificationExtended = Prisma.NotificationGetPayload<{
  include: {
    user: true;
  };
}>;
