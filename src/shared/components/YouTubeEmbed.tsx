import { useState } from "react";

interface YouTubeEmbedProps {
  url: string;
  title: string;
}

/**
 * Componente para embeber videos de YouTube con manejo de errores
 * Nota: YouTube puede bloquear embeds en localhost. Esto es normal y
 * funcionará correctamente cuando la app esté desplegada en producción.
 */
export function YouTubeEmbed({ url, title }: YouTubeEmbedProps) {
  const [hasError, setHasError] = useState(false);

  // Convertir URL de YouTube normal a formato embed si es necesario
  const getEmbedUrl = (videoUrl: string): string => {
    try {
      // Si ya es una URL de embed, devolverla tal cual
      if (videoUrl.includes("/embed/")) {
        return videoUrl;
      }

      // Convertir URL normal de YouTube a embed
      const urlObj = new URL(videoUrl);

      // youtube.com/watch?v=VIDEO_ID
      if (urlObj.hostname.includes("youtube.com")) {
        const videoId = urlObj.searchParams.get("v");
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      // youtu.be/VIDEO_ID
      if (urlObj.hostname === "youtu.be") {
        const videoId = urlObj.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }

      return videoUrl;
    } catch {
      return videoUrl;
    }
  };

  const embedUrl = getEmbedUrl(url);
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (hasError && isLocalhost) {
    return (
      <div className="relative mb-6 aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-red-100 to-orange-100 dark:from-gray-800 dark:to-gray-700">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 text-6xl">🎥</div>
          <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white">
            Video no disponible en localhost
          </h3>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            YouTube bloquea embeds en localhost por seguridad. Esto es normal.
          </p>
          <div className="rounded-lg bg-white p-4 dark:bg-gray-800">
            <p className="mb-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
              Para ver el video en desarrollo:
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              Ver en YouTube
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            ✅ Funcionará correctamente en producción (Vercel, Netlify, etc.)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-6 aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
