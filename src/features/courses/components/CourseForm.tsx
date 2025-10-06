import { useState } from "react";
import { Label, TextInput, Textarea, Button } from "flowbite-react";

export interface CourseFormData {
  title: string;
  description: string;
  price: number;
}

interface CourseFormProps {
  initialData?: Partial<CourseFormData>;
  onSubmit: (data: CourseFormData) => Promise<void>;
  submitLabel?: string;
}

export function CourseForm({
  initialData,
  onSubmit,
  submitLabel = "Crear curso",
}: CourseFormProps) {
  const [formData, setFormData] = useState<CourseFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
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

    if (formData.price < 0) {
      setError("El precio no puede ser negativo");
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
          : "Error al guardar el curso. Intenta nuevamente.",
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
          Título del curso <span className="text-danger-500">*</span>
        </Label>
        <TextInput
          id="title"
          type="text"
          placeholder="Ej: Jabones artesanales para principiantes"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Descripción */}
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          placeholder="Describe lo que aprenderán los estudiantes en este curso..."
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          disabled={isSubmitting}
        />
      </div>

      {/* Precio */}
      <div>
        <Label htmlFor="price">
          Precio (USD) <span className="text-danger-500">*</span>
        </Label>
        <TextInput
          id="price"
          type="number"
          step="0.01"
          min="0"
          placeholder="19.99"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
          }
          required
          disabled={isSubmitting}
        />
        <p className="mt-1 text-sm text-gray-500">
          Define el precio de venta de tu curso
        </p>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="bg-danger-50 text-danger-800 rounded-lg p-4 text-sm">
          {error}
        </div>
      )}

      {/* Botón de envío */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 text-white"
      >
        {isSubmitting ? "Guardando..." : submitLabel}
      </Button>
    </form>
  );
}
