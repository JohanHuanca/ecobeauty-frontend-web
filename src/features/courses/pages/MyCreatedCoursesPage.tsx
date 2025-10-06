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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-900">
              <HiAcademicCap className="text-primary-600 h-10 w-10" />
              <span>Mis Cursos Creados</span>
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Gestiona tus cursos y contenido educativo
            </p>
          </div>

          <Button
            className="bg-primary-600 hover:bg-primary-700 text-white"
            onClick={() => navigate("/courses/create")}
          >
            <HiPlus className="mr-2 h-5 w-5" />
            Crear nuevo curso
          </Button>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="bg-danger-50 text-danger-800 mb-6 rounded-lg p-4">
            {error}
          </div>
        )}

        {/* Grid de cursos */}
        {courses.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center">
            <p className="text-xl text-gray-500">
              Aún no has creado ningún curso.
            </p>
            <p className="mt-2 text-gray-400">
              ¡Comienza a compartir tu conocimiento creando tu primer curso!
            </p>
            <Button
              className="mt-6"
              color="success"
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
              <div className="rounded-lg bg-white p-4 shadow-md">
                <p className="text-sm text-gray-500">Total de cursos</p>
                <p className="text-3xl font-bold text-gray-900">
                  {courses.length}
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-md">
                <p className="text-sm text-gray-500">Publicados</p>
                <p className="text-primary-600 text-3xl font-bold">
                  {courses.filter((c) => c.is_published).length}
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-md">
                <p className="text-sm text-gray-500">Borradores</p>
                <p className="text-accent-600 text-3xl font-bold">
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
        <div className="border-primary-200 bg-primary-50 mt-12 rounded-lg border p-6">
          <h3 className="text-primary-900 flex items-center gap-2 text-lg font-semibold">
            <HiLightBulb className="h-5 w-5" />
            <span>Consejos para tus cursos</span>
          </h3>
          <ul className="text-primary-800 mt-2 list-inside list-disc space-y-1">
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
