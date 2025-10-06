import { useState } from "react";
import { Label, TextInput, Textarea, Button } from "flowbite-react";

export interface LessonFormData {
  title: string;
  content_text: string;
  video_url: string;
  lesson_order: number;
}

interface LessonFormProps {
  initialData?: Partial<LessonFormData>;
  onSubmit: (data: LessonFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  maxOrder?: number;
}

export function LessonForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Guardar lección",
  maxOrder = 1,
}: LessonFormProps) {
  const [formData, setFormData] = useState<LessonFormData>({
    title: initialData?.title || "",
    content_text: initialData?.content_text || "",
    video_url: initialData?.video_url || "",
    lesson_order: initialData?.lesson_order || maxOrder,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones
    if (!formData.title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    if (formData.lesson_order < 1) {
      setError("El orden de la lección debe ser mayor a 0");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } catch (err) {
      console.error("Error al enviar formulario:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Error al guardar la lección. Intenta nuevamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Título */}
      <div>
        <Label htmlFor="title">
          Título de la lección <span className="text-danger-500">*</span>
        </Label>
        <TextInput
          id="title"
          type="text"
          placeholder="Ej: Introducción a los ingredientes naturales"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Orden */}
      <div>
        <Label htmlFor="order">
          Orden <span className="text-danger-500">*</span>
        </Label>
        <TextInput
          id="order"
          type="number"
          min="1"
          value={formData.lesson_order}
          onChange={(e) =>
            setFormData({
              ...formData,
              lesson_order: parseInt(e.target.value) || 1,
            })
          }
          required
          disabled={isSubmitting}
        />
        <p className="mt-1 text-sm text-gray-500">
          Determina la secuencia de las lecciones en el curso
        </p>
      </div>

      {/* Contenido de texto */}
      <div>
        <Label htmlFor="content">Contenido de texto</Label>
        <Textarea
          id="content"
          placeholder="Escribe el contenido escrito de la lección (opcional si hay video)..."
          rows={6}
          value={formData.content_text}
          onChange={(e) =>
            setFormData({ ...formData, content_text: e.target.value })
          }
          disabled={isSubmitting}
        />
      </div>

      {/* URL del video */}
      <div>
        <Label htmlFor="video_url">URL del video (YouTube, Vimeo, etc.)</Label>
        <TextInput
          id="video_url"
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={formData.video_url}
          onChange={(e) =>
            setFormData({ ...formData, video_url: e.target.value })
          }
          disabled={isSubmitting}
        />
        <p className="mt-1 text-sm text-gray-500">
          Opcional: agrega un video educativo a esta lección
        </p>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="bg-danger-50 text-danger-800 rounded-lg p-4 text-sm">
          {error}
        </div>
      )}

      {/* Botones */}
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 flex-1 text-white"
        >
          {isSubmitting ? "Guardando..." : submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="bg-secondary-600 hover:bg-secondary-700 disabled:bg-secondary-400 text-white"
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
