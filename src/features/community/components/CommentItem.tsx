import { Avatar } from "flowbite-react";
import type { PostComment } from "../services/communityService";

interface CommentItemProps {
  comment: PostComment;
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex gap-3 py-4">
      <Avatar
        img={comment.profiles?.avatar_url || undefined}
        rounded
        size="sm"
      />
      <div className="min-w-0 flex-1">
        <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-700">
          <p className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
            {comment.profiles?.full_name || "Usuario"}
          </p>
          <p className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300">
            {comment.content}
          </p>
        </div>
        <p className="mt-1 ml-3 text-xs text-gray-500 dark:text-gray-400">
          {new Date(comment.created_at).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
