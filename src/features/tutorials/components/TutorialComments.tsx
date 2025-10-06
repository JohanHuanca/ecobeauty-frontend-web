import { useState, useEffect } from "react";
import { Avatar, Button, Textarea, Spinner } from "flowbite-react";
import { HiReply } from "react-icons/hi";
import { useSupabaseAuth } from "../../../core/services/useSupabaseAuth";
import {
  getTutorialComments,
  createTutorialComment,
  type TutorialComment,
} from "../services/tutorialsService";

interface TutorialCommentsProps {
  tutorialId: number;
}

export function TutorialComments({ tutorialId }: TutorialCommentsProps) {
  const { session, profile } = useSupabaseAuth();
  const [comments, setComments] = useState<TutorialComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComments = async () => {
      try {
        setIsLoading(true);
        const data = await getTutorialComments(tutorialId);
        setComments(data);
      } catch (err) {
        console.error("Error al cargar comentarios:", err);
        setError("Error al cargar los comentarios");
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [tutorialId]);

  // Función para contar todos los comentarios (padres + hijos)
  const countAllComments = (comments: TutorialComment[]): number => {
    return comments.reduce((total, comment) => {
      return (
        total + 1 + (comment.replies ? countAllComments(comment.replies) : 0)
      );
    }, 0);
  };

  const totalComments = countAllComments(comments);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError("El comentario no puede estar vacío");
      return;
    }

    if (!session) {
      setError("Debes iniciar sesión para comentar");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const comment = await createTutorialComment({
        tutorial_id: tutorialId,
        content: newComment.trim(),
      });

      setComments([comment, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Error al crear comentario:", err);
      setError(
        err instanceof Error ? err.message : "Error al publicar el comentario",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentCommentId: number) => {
    if (!replyContent.trim()) {
      setError("La respuesta no puede estar vacía");
      return;
    }

    if (!session) {
      setError("Debes iniciar sesión para responder");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await createTutorialComment({
        tutorial_id: tutorialId,
        content: replyContent.trim(),
        parent_comment_id: parentCommentId,
      });

      // Recargar todos los comentarios para actualizar la jerarquía
      const updatedComments = await getTutorialComments(tutorialId);
      setComments(updatedComments);
      setReplyContent("");
      setReplyTo(null);
    } catch (err) {
      console.error("Error al crear respuesta:", err);
      setError(
        err instanceof Error ? err.message : "Error al publicar la respuesta",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderComment = (comment: TutorialComment, isReply = false) => {
    const isReplying = replyTo === comment.id;

    return (
      <div key={comment.id} className={isReply ? "ml-12" : ""}>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <Avatar
              img={comment.profiles?.avatar_url || undefined}
              rounded
              size="md"
            />
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  {comment.profiles?.full_name || "Usuario"}
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="mb-2 whitespace-pre-wrap text-gray-700">
                {comment.content}
              </p>

              {/* Botón de responder solo si no es una respuesta anidada */}
              {!isReply && session && (
                <button
                  onClick={() => setReplyTo(isReplying ? null : comment.id)}
                  className="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm font-medium"
                >
                  <HiReply className="h-4 w-4" />
                  {isReplying ? "Cancelar" : "Responder"}
                </button>
              )}
            </div>
          </div>

          {/* Formulario de respuesta */}
          {isReplying && (
            <div className="mt-4 ml-12">
              <div className="flex items-start gap-3">
                <Avatar
                  img={profile?.avatar_url || undefined}
                  rounded
                  size="sm"
                />
                <div className="flex-1">
                  <Textarea
                    placeholder="Escribe tu respuesta..."
                    rows={2}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setReplyTo(null);
                        setReplyContent("");
                      }}
                      disabled={isSubmitting}
                      className="bg-secondary-600 hover:bg-secondary-700 text-white"
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSubmitReply(comment.id)}
                      disabled={isSubmitting || !replyContent.trim()}
                      className="bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 text-white"
                    >
                      {isSubmitting ? "Publicando..." : "Publicar"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Renderizar respuestas anidadas */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map((reply) => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Comentarios ({totalComments})
      </h2>

      {/* Formulario para nuevo comentario */}
      {session ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="mb-4 flex items-start gap-3">
            <Avatar img={profile?.avatar_url || undefined} rounded size="md" />
            <div className="flex-1">
              <Textarea
                placeholder="Escribe tu comentario..."
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-danger-50 border-danger-200 mb-4 rounded-lg border p-3">
              <span className="text-danger-800 text-sm font-medium">
                {error}
              </span>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 text-white"
            >
              {isSubmitting ? "Publicando..." : "Publicar comentario"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="bg-primary-50 mb-8 rounded-lg p-4 text-center">
          <p className="text-primary-800">Debes iniciar sesión para comentar</p>
        </div>
      )}

      {/* Lista de comentarios */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner size="lg" />
        </div>
      ) : comments.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-8 text-center">
          <p className="text-gray-600">
            Aún no hay comentarios. ¡Sé el primero en comentar!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => renderComment(comment))}
        </div>
      )}
    </div>
  );
}
