import CommentItem from "./CommentItem";
import { CommentExtended } from "@/interfaces";

interface CommentFeedProps {
  comments?: CommentExtended[];
}

const CommentFeed = ({ comments }: CommentFeedProps) => {
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};
export default CommentFeed;
