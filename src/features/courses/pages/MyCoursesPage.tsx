import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Button } from "flowbite-react";
import { HiBookOpen } from "react-icons/hi";
import { CourseCard } from "../components/CourseCard";
import { getEnrolledCourses, type Course } from "../services/coursesService";
import { useSupabaseAuth } from "../../../core/services/useSupabaseAuth";

export function MyCoursesPage() {
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMyCourses = useCallback(async () => {
    if (!session) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await getEnrolledCourses(session.user.id);
      setCourses(data);
    } catch (err) {
      console.error("Error al cargar mis cursos:", err);
      setError("No se pudieron cargar tus cursos. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }, [session, navigate]);

  useEffect(() => {
    loadMyCourses();
  }, [loadMyCourses]);

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
            <HiBookOpen className="text-primary-600 h-10 w-10" />
            <span>Mis Cursos</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Cursos en los que estás inscrito
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
              Aún no estás inscrito en ningún curso.
            </p>
            <p className="mt-2 text-gray-400">
              ¡Explora nuestro catálogo y comienza a aprender!
            </p>
            <Button
              className="bg-primary-600 hover:bg-primary-700 mt-6 text-white"
              onClick={() => navigate("/courses")}
            >
              Ver catálogo de cursos
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
