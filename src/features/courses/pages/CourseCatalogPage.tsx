import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { HiAcademicCap, HiLightBulb } from "react-icons/hi";
import { CourseCard } from "../components/CourseCard";
import {
  getAllCourses,
  enrollInCourse,
  type Course,
} from "../services/coursesService";
import { useSupabaseAuth } from "../../../core/services/useSupabaseAuth";

export function CourseCatalogPage() {
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtener solo cursos publicados, con información de inscripción si hay sesión
      const data = await getAllCourses(session?.user.id, undefined, false);
      setCourses(data);
    } catch (err) {
      console.error("Error al cargar cursos:", err);
      setError("No se pudieron cargar los cursos. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const handleEnroll = async (courseId: number) => {
    if (!session) {
      // Redirigir al login si no hay sesión
      navigate("/login");
      return;
    }

    try {
      setEnrolling(courseId);
      setError(null);

      await enrollInCourse(session.user.id, courseId);

      // Actualizar el estado local del curso
      setCourses((prev) =>
        prev.map((course) =>
          course.id === courseId ? { ...course, is_enrolled: true } : course,
        ),
      );

      // Mostrar mensaje de éxito
      alert("¡Te has inscrito exitosamente en el curso!");

      // Redirigir al curso
      navigate(`/courses/${courseId}`);
    } catch (err) {
      console.error("Error al inscribirse:", err);
      setError("No se pudo completar la inscripción. Intenta nuevamente.");
    } finally {
      setEnrolling(null);
    }
  };

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
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-900">
            <HiAcademicCap className="text-primary-600 h-10 w-10" />
            <span>Catálogo de Cursos</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Descubre cursos premium creados por nuestros expertos en cosmética
            natural
          </p>
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
              No hay cursos disponibles en este momento.
            </p>
            <p className="mt-2 text-gray-400">
              ¡Vuelve pronto para descubrir nuevos contenidos!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={handleEnroll}
                enrolling={enrolling === course.id}
              />
            ))}
          </div>
        )}

        {/* Nota sobre cursos gratuitos */}
        <div className="border-primary-200 bg-primary-50 mt-12 rounded-lg border p-6">
          <h3 className="text-primary-900 flex items-center gap-2 text-lg font-semibold">
            <HiLightBulb className="h-5 w-5" />
            <span>¿Buscas contenido gratuito?</span>
          </h3>
          <p className="text-primary-800 mt-2">
            Explora nuestra sección de{" "}
            <button
              onClick={() => navigate("/tutorials")}
              className="hover:text-primary-600 font-semibold underline"
            >
              Tutoriales gratuitos
            </button>{" "}
            donde encontrarás contenido educativo sin costo.
          </p>
        </div>
      </div>
    </div>
  );
}
