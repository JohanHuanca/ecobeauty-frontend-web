import { Card, Button } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import type { Lesson } from "../services/coursesService";

interface LessonCardProps {
  lesson: Lesson;
  isOwner?: boolean;
  onEdit?: (lesson: Lesson) => void;
  onDelete?: (lessonId: number) => void;
  onClick?: (lesson: Lesson) => void;
  isSelected?: boolean;
}

export function LessonCard({
  lesson,
  isOwner = false,
  onEdit,
  onDelete,
  onClick,
  isSelected = false,
}: LessonCardProps) {
  // Función para extraer el ID de video de YouTube
  const getYouTubeEmbedUrl = (url: string): string | null => {
    if (!url) return null;

    // Patrones de URL de YouTube
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
      /youtube\.com\/embed\/([^&\s]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }

    // Si ya es una URL de embed válida, devolverla
    if (url.includes("youtube.com/embed/")) {
      return url;
    }

    return null;
  };

  const embedUrl = lesson.video_url
    ? getYouTubeEmbedUrl(lesson.video_url)
    : null;

  return (
    <Card
      className={`cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={() => onClick?.(lesson)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="bg-primary-100 text-primary-600 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
              {lesson.lesson_order}
            </span>
            <h5 className="text-xl font-bold tracking-tight text-gray-900">
              {lesson.title}
            </h5>
          </div>

          {/* Indicadores de contenido */}
          <div className="mt-2 flex gap-2">
            {lesson.content_text && (
              <span className="inline-flex items-center rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                📄 Texto
              </span>
            )}
            {lesson.video_url && (
              <span className="inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                🎥 Video
              </span>
            )}
          </div>

          {/* Preview del contenido de texto */}
          {lesson.content_text && (
            <p className="mt-2 line-clamp-2 text-sm text-gray-700">
              {lesson.content_text}
            </p>
          )}

          {/* Preview del video (solo si hay un embed URL válido) */}
          {embedUrl && isSelected && (
            <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src={embedUrl}
                title={lesson.title}
                className="h-full w-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          )}
        </div>

        {/* Botones de acción (solo para el propietario) */}
        {isOwner && (
          <div className="ml-4 flex gap-2">
            {onEdit && (
              <Button
                size="xs"
                color="success"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(lesson);
                }}
              >
                <HiPencil className="h-3 w-3" />
              </Button>
            )}
            {onDelete && (
              <Button
                size="xs"
                color="failure"
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    window.confirm(
                      "¿Estás seguro de que deseas eliminar esta lección?",
                    )
                  ) {
                    onDelete(lesson.id);
                  }
                }}
              >
                <HiTrash className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
