import { Card, Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import type { Post } from "../services/communityService";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="w-full">
      <div className="mb-3 flex items-center gap-3">
        <Avatar
          img={post.profiles?.avatar_url || undefined}
          rounded
          size="md"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">
            {post.profiles?.full_name || "Usuario"}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(post.created_at).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <p className="mb-3 whitespace-pre-wrap text-gray-700">{post.content}</p>

      {post.image_url && (
        <div className="relative mb-3 aspect-video overflow-hidden rounded-lg bg-gray-100">
          <img
            src={post.image_url}
            alt="Publicación"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-4 border-t border-gray-200 pt-3">
        <Link
          to={`/community/${post.id}`}
          className="hover:text-primary-600 flex items-center text-sm text-gray-500"
        >
          <svg
            className="mr-1 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {post.comments_count || 0} comentarios
        </Link>
      </div>
    </Card>
  );
}
