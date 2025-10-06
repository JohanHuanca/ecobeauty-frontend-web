import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { HiSparkles, HiLightBulb } from "react-icons/hi";
import { CourseForm, type CourseFormData } from "../components/CourseForm";
import { createCourse } from "../services/coursesService";
import { useSupabaseAuth } from "../../../core/services/useSupabaseAuth";

export function CreateCoursePage() {
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();

  const handleSubmit = async (data: CourseFormData) => {
    if (!session) {
      navigate("/login");
      return;
    }

    try {
      const newCourse = await createCourse({
        expert_profile_id: session.user.id,
        ...data,
      });

      alert("¡Curso creado exitosamente!");

      // Redirigir a la página de gestión del curso
      navigate(`/courses/manage/${newCourse.id}`);
    } catch (error) {
      console.error("Error al crear curso:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <Button
              color="gray"
              size="sm"
              onClick={() => navigate("/my-created-courses")}
            >
              ← Mis cursos creados
            </Button>

            <h1 className="mt-4 flex items-center gap-3 text-4xl font-bold text-gray-900">
              <HiSparkles className="text-accent-500 h-10 w-10" />
              <span>Crear Nuevo Curso</span>
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Comparte tu conocimiento creando un curso premium
            </p>
          </div>

          {/* Formulario */}
          <div className="rounded-lg bg-white p-8 shadow-md">
            <CourseForm onSubmit={handleSubmit} submitLabel="Crear curso" />
          </div>

          {/* Información adicional */}
          <div className="border-primary-200 bg-primary-50 mt-6 rounded-lg border p-6">
            <h3 className="text-primary-900 flex items-center gap-2 text-lg font-semibold">
              <HiLightBulb className="h-5 w-5" />
              <span>Próximos pasos</span>
            </h3>
            <ul className="text-primary-800 mt-2 list-inside list-disc space-y-1">
              <li>Después de crear el curso, podrás agregar lecciones</li>
              <li>Cada lección puede incluir contenido de texto y/o video</li>
              <li>
                Cuando estés listo, publica el curso para ponerlo a la venta
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
