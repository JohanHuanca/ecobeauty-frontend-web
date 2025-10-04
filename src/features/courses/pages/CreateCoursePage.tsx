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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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

            <h1 className="mt-4 flex items-center gap-3 text-4xl font-bold text-gray-900 dark:text-white">
              <HiSparkles className="h-10 w-10 text-yellow-500" />
              <span>Crear Nuevo Curso</span>
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Comparte tu conocimiento creando un curso premium
            </p>
          </div>

          {/* Formulario */}
          <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
            <CourseForm onSubmit={handleSubmit} submitLabel="Crear curso" />
          </div>

          {/* Información adicional */}
          <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-gray-800">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-900 dark:text-blue-300">
              <HiLightBulb className="h-5 w-5" />
              <span>Próximos pasos</span>
            </h3>
            <ul className="mt-2 list-inside list-disc space-y-1 text-blue-800 dark:text-blue-400">
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
