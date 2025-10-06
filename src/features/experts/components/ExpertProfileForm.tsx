import { useState } from "react";
import { Label, TextInput, Textarea, Button } from "flowbite-react";

export interface ExpertProfileFormData {
  bio: string;
  specialties: string[];
  phone_number: string;
  hourly_rate: number;
}

interface ExpertProfileFormProps {
  initialData?: Partial<ExpertProfileFormData>;
  onSubmit: (data: ExpertProfileFormData) => Promise<void>;
  submitLabel?: string;
}

export function ExpertProfileForm({
  initialData,
  onSubmit,
  submitLabel = "Guardar perfil",
}: ExpertProfileFormProps) {
  const [formData, setFormData] = useState<ExpertProfileFormData>({
    bio: initialData?.bio || "",
    specialties: initialData?.specialties || [],
    phone_number: initialData?.phone_number || "",
    hourly_rate: initialData?.hourly_rate || 0,
  });

  const [specialtyInput, setSpecialtyInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddSpecialty = () => {
    const trimmed = specialtyInput.trim();
    if (trimmed && !formData.specialties.includes(trimmed)) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, trimmed],
      });
      setSpecialtyInput("");
    }
  };

  const handleRemoveSpecialty = (index: number) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones
    if (!formData.bio.trim()) {
      setError("La biografía es obligatoria");
      return;
    }

    if (formData.specialties.length === 0) {
      setError("Debes agregar al menos una especialidad");
      return;
    }

    if (!formData.phone_number.trim()) {
      setError("El número de WhatsApp es obligatorio");
      return;
    }

    if (formData.hourly_rate < 0) {
      setError("La tarifa no puede ser negativa");
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
          : "Error al guardar el perfil. Intenta nuevamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Biografía */}
      <div>
        <Label htmlFor="bio">
          Biografía profesional <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="bio"
          placeholder="Cuéntanos sobre tu experiencia, formación y enfoque en cosmética natural..."
          rows={6}
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          required
          disabled={isSubmitting}
        />
        <p className="mt-1 text-sm text-gray-500">
          Esta es tu carta de presentación. Sé auténtico y profesional.
        </p>
      </div>

      {/* Especialidades */}
      <div>
        <Label htmlFor="specialty">
          Especialidades <span className="text-red-500">*</span>
        </Label>
        <div className="flex gap-2">
          <TextInput
            id="specialty"
            type="text"
            placeholder="Ej: Jabones artesanales"
            value={specialtyInput}
            onChange={(e) => setSpecialtyInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSpecialty();
              }
            }}
            disabled={isSubmitting}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAddSpecialty}
            disabled={isSubmitting || !specialtyInput.trim()}
          >
            Agregar
          </Button>
        </div>

        {/* Lista de especialidades */}
        {formData.specialties.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.specialties.map((specialty, index) => (
              <span
                key={index}
                className="bg-primary-100 text-primary-800 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium"
              >
                {specialty}
                <button
                  type="button"
                  onClick={() => handleRemoveSpecialty(index)}
                  className="hover:text-primary-600"
                  disabled={isSubmitting}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Número de WhatsApp */}
      <div>
        <Label htmlFor="phone">
          Número de WhatsApp <span className="text-red-500">*</span>
        </Label>
        <TextInput
          id="phone"
          type="tel"
          placeholder="+591 70123456"
          value={formData.phone_number}
          onChange={(e) =>
            setFormData({ ...formData, phone_number: e.target.value })
          }
          required
          disabled={isSubmitting}
        />
        <p className="mt-1 text-sm text-gray-500">
          Incluye código de país. Los clientes te contactarán por este número.
        </p>
      </div>

      {/* Tarifa por hora */}
      <div>
        <Label htmlFor="rate">
          Tarifa por hora (USD) <span className="text-red-500">*</span>
        </Label>
        <TextInput
          id="rate"
          type="number"
          step="0.01"
          min="0"
          placeholder="25.00"
          value={formData.hourly_rate}
          onChange={(e) =>
            setFormData({
              ...formData,
              hourly_rate: parseFloat(e.target.value) || 0,
            })
          }
          required
          disabled={isSubmitting}
        />
        <p className="mt-1 text-sm text-gray-500">
          Define tu tarifa para consultorías o servicios personalizados
        </p>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {/* Botón de envío */}
      <Button type="submit" disabled={isSubmitting} size="lg">
        {isSubmitting ? "Guardando..." : submitLabel}
      </Button>
    </form>
  );
}
