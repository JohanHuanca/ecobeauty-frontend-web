import { useState } from "react";
import { Button, Textarea } from "flowbite-react";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  isLoading?: boolean;
}

export function CommentForm({ onSubmit, isLoading = false }: CommentFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await onSubmit(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Textarea
        placeholder="Escribe tu comentario..."
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isLoading}
        required
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          size="sm"
          disabled={isLoading || !content.trim()}
          className="bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 text-white"
        >
          {isLoading ? "Enviando..." : "Comentar"}
        </Button>
      </div>
    </form>
  );
}
