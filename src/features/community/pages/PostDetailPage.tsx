import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Avatar, Button, Card, Spinner } from "flowbite-react";
import { CommentItem } from "../components/CommentItem";
import { CommentForm } from "../components/CommentForm";
import {
  getPostById,
  createComment,
  type PostWithComments,
} from "../services/communityService";
import { useSupabaseAuth } from "../../../core/services/useSupabaseAuth";

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostWithComments | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useSupabaseAuth();

  useEffect(() => {
    if (id) {
      loadPost(parseInt(id, 10));
    }
  }, [id]);

  async function loadPost(postId: number) {
    try {
      setIsLoading(true);
      const data = await getPostById(postId);
      setPost(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar la publicación",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateComment(content: string) {
    if (!post) return;

    try {
      setIsCommentLoading(true);
      await createComment(post.id, content);
      // Recargar el post completo para actualizar la jerarquía
      await loadPost(post.id);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al crear comentario");
    } finally {
      setIsCommentLoading(false);
    }
  }

  async function handleCreateReply(parentCommentId: number, content: string) {
    if (!post) return;

    await createComment(post.id, content, parentCommentId);
    // Recargar el post completo para actualizar la jerarquía
    await loadPost(post.id);
  }

  // Función para contar todos los comentarios (padres + hijos)
  const countAllComments = (comments: PostWithComments["comments"]): number => {
    return comments.reduce((total, comment) => {
      return (
        total + 1 + (comment.replies ? countAllComments(comment.replies) : 0)
      );
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-red-800 dark:text-red-200">
            {error || "Publicación no encontrada"}
          </p>
        </div>
        <Link to="/community">
          <Button color="gray">Volver a la comunidad</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link
          to="/community"
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-500"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver a la comunidad
        </Link>

        {/* Post principal */}
        <Card className="mb-6">
          <div className="mb-4 flex items-center gap-3">
            <Avatar
              img={post.profiles?.avatar_url || undefined}
              rounded
              size="md"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                {post.profiles?.full_name || "Usuario"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
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

          <p className="mb-4 whitespace-pre-wrap text-gray-700 dark:text-gray-300">
            {post.content}
          </p>

          {post.image_url && (
            <div className="relative mb-4 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
              <img
                src={post.image_url}
                alt="Publicación"
                className="max-h-96 w-full object-contain"
              />
            </div>
          )}
        </Card>

        {/* Sección de comentarios */}
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Comentarios ({countAllComments(post.comments)})
          </h2>

          {session ? (
            <div className="mb-6 border-b border-gray-200 pb-6 dark:border-gray-700">
              <CommentForm
                onSubmit={handleCreateComment}
                isLoading={isCommentLoading}
              />
            </div>
          ) : (
            <div className="mb-6 border-b border-gray-200 pb-6 dark:border-gray-700">
              <p className="py-4 text-center text-gray-600 dark:text-gray-400">
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-500"
                >
                  Inicia sesión
                </Link>{" "}
                para comentar en esta publicación
              </p>
            </div>
          )}

          {post.comments.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No hay comentarios aún. ¡Sé el primero en comentar!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {post.comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onReply={handleCreateReply}
                  isAuthenticated={!!session}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
