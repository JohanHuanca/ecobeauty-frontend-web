import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Button, Avatar, Badge } from "flowbite-react";
import { HiBookOpen } from "react-icons/hi";
import { LessonCard } from "../components/LessonCard";
import {
  getCourseById,
  getCourseLessons,
  enrollInCourse,
  type Course,
  type Lesson,
} from "../services/coursesService";
import { useSupabaseAuth } from "../../../core/services/useSupabaseAuth";

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCourseData = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const courseId = parseInt(id);

      // Cargar curso
      const courseData = await getCourseById(courseId, session?.user.id);

      if (!courseData) {
        setError("Curso no encontrado");
        return;
      }

      setCourse(courseData);

      // Si el usuario está inscrito, cargar lecciones
      if (courseData.is_enrolled) {
        const lessonsData = await getCourseLessons(courseId);
        setLessons(lessonsData);

        // Seleccionar la primera lección por defecto
        if (lessonsData.length > 0) {
          setSelectedLesson(lessonsData[0]);
        }
      }
    } catch (err) {
      console.error("Error al cargar curso:", err);
      setError("No se pudo cargar el curso. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }, [id, session]);

  useEffect(() => {
    loadCourseData();
  }, [loadCourseData]);

  const handleEnroll = async () => {
    if (!session) {
      navigate("/login");
      return;
    }

    if (!course) return;

    try {
      setEnrolling(true);
      setError(null);

      await enrollInCourse(session.user.id, course.id);

      // Recargar datos del curso
      await loadCourseData();

      alert("¡Te has inscrito exitosamente en el curso!");
    } catch (err) {
      console.error("Error al inscribirse:", err);
      setError("No se pudo completar la inscripción. Intenta nuevamente.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 dark:text-red-400">{error}</p>
          <Button className="mt-4" onClick={() => navigate("/courses")}>
            Volver al catálogo
          </Button>
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  // Vista para usuarios NO inscritos
  if (!course.is_enrolled) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            {/* Header del curso */}
            <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
              <Badge color="success" className="mb-4 w-fit">
                Curso Premium
              </Badge>

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {course.title}
              </h1>

              <p className="mt-4 text-3xl font-bold text-green-600 dark:text-green-400">
                ${course.price.toFixed(2)} USD
              </p>

              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                {course.description || "Sin descripción"}
              </p>

              {/* Información del experto */}
              {course.expert && (
                <div className="mt-6 flex items-center gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <Avatar
                    img={course.expert.avatar_url || undefined}
                    alt={course.expert.full_name || "Experto"}
                    size="lg"
                    rounded
                  />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Creado por
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {course.expert.full_name || "Usuario"}
                    </p>
                  </div>
                </div>
              )}

              {/* Botón de inscripción */}
              <div className="mt-8">
                {error && (
                  <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-gray-700 dark:text-red-400">
                    {error}
                  </div>
                )}

                <Button
                  size="xl"
                  className="w-full"
                  onClick={handleEnroll}
                  disabled={enrolling}
                >
                  {enrolling ? "Procesando..." : "💳 Comprar curso"}
                </Button>

                <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  Al comprar este curso tendrás acceso completo a todo su
                  contenido
                </p>
              </div>
            </div>

            {/* Botón para volver */}
            <div className="mt-6">
              <Button color="gray" onClick={() => navigate("/courses")}>
                ← Volver al catálogo
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista para usuarios INSCRITOS (con acceso al contenido)
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header del curso */}
        <div className="mb-6">
          <Button
            color="gray"
            onClick={() => navigate("/my-courses")}
            size="sm"
          >
            ← Mis cursos
          </Button>

          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            {course.title}
          </h1>

          {course.expert && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Por {course.expert.full_name || "Usuario"}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Lista de lecciones (sidebar) */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                <HiBookOpen className="h-5 w-5" />
                <span>Contenido del curso</span>
              </h2>

              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {lessons.length} lección{lessons.length !== 1 ? "es" : ""}
              </p>

              {lessons.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                  Este curso aún no tiene lecciones disponibles.
                </p>
              ) : (
                <div className="space-y-2">
                  {lessons.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      onClick={setSelectedLesson}
                      isSelected={selectedLesson?.id === lesson.id}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contenido de la lección seleccionada */}
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    {selectedLesson.lesson_order}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedLesson.title}
                  </h2>
                </div>

                {/* Video */}
                {selectedLesson.video_url && (
                  <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg">
                    <iframe
                      src={
                        selectedLesson.video_url.includes("youtube.com/embed/")
                          ? selectedLesson.video_url
                          : selectedLesson.video_url
                              .replace("watch?v=", "embed/")
                              .replace("youtu.be/", "youtube.com/embed/")
                      }
                      title={selectedLesson.title}
                      className="h-full w-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                )}

                {/* Contenido de texto */}
                {selectedLesson.content_text && (
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                      {selectedLesson.content_text}
                    </div>
                  </div>
                )}

                {!selectedLesson.video_url && !selectedLesson.content_text && (
                  <p className="text-gray-500 dark:text-gray-400">
                    Esta lección no tiene contenido disponible.
                  </p>
                )}
              </div>
            ) : (
              <div className="rounded-lg bg-white p-12 text-center shadow-md dark:bg-gray-800">
                <p className="text-xl text-gray-500 dark:text-gray-400">
                  Selecciona una lección para comenzar
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
