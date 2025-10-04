import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Button } from "flowbite-react";
import { HiAcademicCap, HiPlus, HiLightBulb } from "react-icons/hi";
import { CourseCard } from "../components/CourseCard";
import { getAllCourses, type Course } from "../services/coursesService";
import { useSupabaseAuth } from "../../../core/services/useSupabaseAuth";

export function MyCreatedCoursesPage() {
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMyCreatedCourses = useCallback(async () => {
    if (!session) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Obtener todos los cursos del experto (publicados y no publicados)
      const data = await getAllCourses(
        undefined,
        session.user.id,
        true, // Incluir cursos no publicados
      );
      setCourses(data);
    } catch (err) {
      console.error("Error al cargar mis cursos creados:", err);
      setError("No se pudieron cargar tus cursos. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }, [session, navigate]);

  useEffect(() => {
    loadMyCreatedCourses();
  }, [loadMyCreatedCourses]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-900 dark:text-white">
              <HiAcademicCap className="h-10 w-10 text-green-600" />
              <span>Mis Cursos Creados</span>
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Gestiona tus cursos y contenido educativo
            </p>
          </div>

          <Button color="blue" onClick={() => navigate("/courses/create")}>
            <HiPlus className="mr-2 h-5 w-5" />
            Crear nuevo curso
          </Button>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-gray-800 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Grid de cursos */}
        {courses.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center dark:bg-gray-800">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Aún no has creado ningún curso.
            </p>
            <p className="mt-2 text-gray-400 dark:text-gray-500">
              ¡Comienza a compartir tu conocimiento creando tu primer curso!
            </p>
            <Button
              className="mt-6"
              color="blue"
              onClick={() => navigate("/courses/create")}
            >
              <div className="flex items-center gap-2">
                <HiPlus className="h-4 w-4" />
                <span>Crear mi primer curso</span>
              </div>
            </Button>
          </div>
        ) : (
          <>
            {/* Estadísticas rápidas */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total de cursos
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {courses.length}
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Publicados
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {courses.filter((c) => c.is_published).length}
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Borradores
                </p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {courses.filter((c) => !c.is_published).length}
                </p>
              </div>
            </div>

            {/* Grid de cursos */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} showManageButton />
              ))}
            </div>
          </>
        )}

        {/* Información adicional */}
        <div className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-gray-800">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-900 dark:text-blue-300">
            <HiLightBulb className="h-5 w-5" />
            <span>Consejos para tus cursos</span>
          </h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-blue-800 dark:text-blue-400">
            <li>
              Asegúrate de agregar al menos 3-5 lecciones antes de publicar
            </li>
            <li>
              Utiliza videos de alta calidad y contenido de texto bien
              estructurado
            </li>
            <li>Revisa el precio de mercado para cursos similares</li>
            <li>
              Puedes despublicar un curso en cualquier momento si necesitas
              actualizarlo
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
