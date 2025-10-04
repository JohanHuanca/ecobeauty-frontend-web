import { Card, Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
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
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {tutorial.profiles?.full_name || "Usuario"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(tutorial.created_at).toLocaleDateString("es-ES")}
          </p>
        </div>
      </div>

      {tutorial.video_url && (
        <div className="relative mb-3 aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
          <iframe
            src={tutorial.video_url}
            title={tutorial.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {tutorial.title}
      </h5>

      <p className="mb-4 line-clamp-3 font-normal text-gray-700 dark:text-gray-400">
        {tutorial.description}
      </p>

      <Link
        to={`/tutorials/${tutorial.id}`}
        className="inline-flex items-center font-medium text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
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
