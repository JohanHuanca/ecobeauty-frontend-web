import { Card, Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiHeart, HiChatAlt } from "react-icons/hi";
import { YouTubeEmbed } from "../../../shared/components/YouTubeEmbed";
import type { Tutorial } from "../services/tutorialsService";

interface TutorialCardProps {
  tutorial: Tutorial;
}

export function TutorialCard({ tutorial }: TutorialCardProps) {
  return (
    <Card className="max-w-sm">
      <div className="mb-3 flex items-center gap-3">
        <Avatar
          img={tutorial.profiles?.avatar_url || undefined}
          rounded
          size="sm"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">
            {tutorial.profiles?.full_name || "Usuario"}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(tutorial.created_at).toLocaleDateString("es-ES")}
          </p>
        </div>
      </div>

      {tutorial.video_url && (
        <div className="mb-3 overflow-hidden rounded-lg">
          <YouTubeEmbed url={tutorial.video_url} title={tutorial.title} />
        </div>
      )}

      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
        {tutorial.title}
      </h5>

      <p className="mb-4 line-clamp-3 font-normal text-gray-700">
        {tutorial.description}
      </p>

      {/* Estadísticas de likes y comentarios */}
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <HiHeart className="h-5 w-5 text-red-500" />
          <span className="font-medium">{tutorial.likes_count || 0}</span>
          <span className="hidden sm:inline">
            {tutorial.likes_count === 1 ? "me gusta" : "me gusta"}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <HiChatAlt className="text-primary-500 h-5 w-5" />
          <span className="font-medium">{tutorial.comments_count || 0}</span>
          <span className="hidden sm:inline">
            {tutorial.comments_count === 1 ? "comentario" : "comentarios"}
          </span>
        </div>
      </div>

      <Link
        to={`/tutorials/${tutorial.id}`}
        className="text-primary-600 hover:text-primary-700 inline-flex items-center font-medium"
      >
        Ver tutorial completo
        <svg
          className="ml-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </Card>
  );
}
