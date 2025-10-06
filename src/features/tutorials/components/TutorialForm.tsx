import { useState } from "react";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import type { CreateTutorialData } from "../services/tutorialsService";

interface TutorialFormProps {
  onSubmit: (data: CreateTutorialData) => Promise<void>;
  isLoading?: boolean;
}

export function TutorialForm({
  onSubmit,
  isLoading = false,
}: TutorialFormProps) {
  const [formData, setFormData] = useState<CreateTutorialData>({
    title: "",
    description: "",
    video_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="title">Título del tutorial</Label>
        <TextInput
          id="title"
          type="text"
          placeholder="Ej: Cómo hacer jabón natural de lavanda"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          placeholder="Describe qué aprenderán los usuarios en este tutorial..."
          rows={4}
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="video_url">URL del video</Label>
        <TextInput
          id="video_url"
          type="url"
          placeholder="https://www.youtube.com/embed/..."
          required
          value={formData.video_url}
          onChange={(e) =>
            setFormData({ ...formData, video_url: e.target.value })
          }
          disabled={isLoading}
        />
        <p className="mt-1 text-sm text-gray-500">
          Usa el formato de embed de YouTube o Vimeo
        </p>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Publicando..." : "Publicar tutorial"}
      </Button>
    </form>
  );
}
