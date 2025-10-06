import { useState, useRef } from "react";
import { Button, Label, Textarea, FileInput } from "flowbite-react";
import type { CreatePostData } from "../services/communityService";

interface PostFormProps {
  onSubmit: (data: CreatePostData) => Promise<void>;
  isLoading?: boolean;
}

export function PostForm({ onSubmit, isLoading = false }: PostFormProps) {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postData: CreatePostData = {
      content,
      ...(imageFile && { image: imageFile }),
    };

    await onSubmit(postData);

    // Limpiar formulario
    setContent("");
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="content">
          ¿Qué quieres compartir con la comunidad?
        </Label>
        <Textarea
          id="content"
          placeholder="Comparte tu experiencia, haz una pregunta, o da un consejo..."
          rows={4}
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="image">Imagen (opcional)</Label>
        <FileInput
          id="image"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          disabled={isLoading}
        />
        <p className="mt-1 text-sm text-gray-500">
          Comparte una foto de tu creación o proyecto
        </p>
      </div>

      {imagePreview && (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Vista previa"
            className="h-64 w-full rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
            disabled={isLoading}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Publicando..." : "Publicar"}
      </Button>
    </form>
  );
}
