import { useState } from "react";
import { Avatar, Button, Textarea } from "flowbite-react";
import { HiReply } from "react-icons/hi";
import type { PostComment } from "../services/communityService";

interface CommentItemProps {
  comment: PostComment;
  onReply?: (parentCommentId: number, content: string) => Promise<void>;
  isReply?: boolean;
  isAuthenticated?: boolean;
}

export function CommentItem({
  comment,
  onReply,
  isReply = false,
  isAuthenticated = false,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReply = async () => {
    if (!replyContent.trim() || !onReply) return;

    try {
      setIsSubmitting(true);
      await onReply(comment.id, replyContent.trim());
      setReplyContent("");
      setIsReplying(false);
    } catch (err) {
      console.error("Error al crear respuesta:", err);
      alert(
        err instanceof Error ? err.message : "Error al publicar la respuesta",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={isReply ? "mt-3 ml-12" : "py-4"}>
      <div className="flex gap-3">
        <Avatar
          img={comment.profiles?.avatar_url || undefined}
          rounded
          size="sm"
        />
        <div className="min-w-0 flex-1">
          <div className="rounded-lg bg-gray-100 p-3">
            <p className="mb-1 text-sm font-medium text-gray-900">
              {comment.profiles?.full_name || "Usuario"}
            </p>
            <p className="text-sm whitespace-pre-wrap text-gray-700">
              {comment.content}
            </p>
          </div>
          <div className="mt-1 ml-3 flex items-center gap-4">
            <p className="text-xs text-gray-500">
              {new Date(comment.created_at).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {/* Botón de responder solo si no es una respuesta anidada y el usuario está autenticado */}
            {!isReply && isAuthenticated && onReply && (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-xs font-medium"
              >
                <HiReply className="h-4 w-4" />
                {isReplying ? "Cancelar" : "Responder"}
              </button>
            )}
          </div>

          {/* Formulario de respuesta */}
          {isReplying && (
            <div className="mt-3 ml-3 flex items-start gap-2">
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
                    className="bg-secondary-600 hover:bg-secondary-700 text-white"
                    onClick={() => {
                      setIsReplying(false);
                      setReplyContent("");
                    }}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSubmitReply}
                    disabled={isSubmitting || !replyContent.trim()}
                    className="bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 text-white"
                  >
                    {isSubmitting ? "Publicando..." : "Publicar"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Renderizar respuestas anidadas */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-0">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              isReply={true}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      )}
    </div>
  );
}
