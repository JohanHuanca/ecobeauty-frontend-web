import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Button, Modal, Badge } from "flowbite-react";
import { HiBookOpen, HiPlus, HiPencil, HiArchive } from "react-icons/hi";
import { FaRocket } from "react-icons/fa";
import { CourseForm, type CourseFormData } from "../components/CourseForm";
import { LessonForm, type LessonFormData } from "../components/LessonForm";
import { LessonCard } from "../components/LessonCard";
import {
  getCourseById,
  getCourseLessons,
  updateCourse,
  publishCourse,
  unpublishCourse,
  createLesson,
  updateLesson,
  deleteLesson,
  type Course,
  type Lesson,
} from "../services/coursesService";
import { useSupabaseAuth } from "../../../core/services/useSupabaseAuth";

export function ManageCoursePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { session } = useSupabaseAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para modales
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const loadCourseData = useCallback(async () => {
    if (!id || !session) return;

    try {
      setLoading(true);
      setError(null);

      const courseId = parseInt(id);

      // Cargar curso
      const courseData = await getCourseById(courseId, session.user.id);

      if (!courseData) {
        setError("Curso no encontrado");
        return;
      }

      // Verificar que el usuario es el propietario
      if (courseData.expert_profile_id !== session.user.id) {
        setError("No tienes permiso para gestionar este curso");
        return;
      }

      setCourse(courseData);

      // Cargar lecciones
      const lessonsData = await getCourseLessons(courseId);
      setLessons(lessonsData);
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

  // Actualizar información del curso
  const handleUpdateCourse = async (data: CourseFormData) => {
    if (!course) return;

    try {
      const updated = await updateCourse(course.id, data);
      setCourse(updated);
      setShowEditCourseModal(false);
      alert("Curso actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar curso:", error);
      throw error;
    }
  };

  // Publicar/despublicar curso
  const handleTogglePublish = async () => {
    if (!course) return;

    try {
      if (course.is_published) {
        const updated = await unpublishCourse(course.id);
        setCourse(updated);
        alert("Curso despublicado. Ya no es visible en el catálogo.");
      } else {
        // Validar que haya al menos una lección
        if (lessons.length === 0) {
          alert(
            "Debes agregar al menos una lección antes de publicar el curso.",
          );
          return;
        }

        const updated = await publishCourse(course.id);
        setCourse(updated);
        alert("¡Curso publicado! Ahora es visible en el catálogo.");
      }
    } catch (error) {
      console.error("Error al cambiar estado de publicación:", error);
      alert("No se pudo cambiar el estado de publicación. Intenta nuevamente.");
    }
  };

  // Agregar lección
  const handleAddLesson = async (data: LessonFormData) => {
    if (!course) return;

    try {
      const newLesson = await createLesson({
        course_id: course.id,
        ...data,
      });

      setLessons((prev) =>
        [...prev, newLesson].sort((a, b) => a.lesson_order - b.lesson_order),
      );
      setShowAddLessonModal(false);
      alert("Lección agregada exitosamente");
    } catch (error) {
      console.error("Error al agregar lección:", error);
      throw error;
    }
  };

  // Editar lección
  const handleUpdateLesson = async (data: LessonFormData) => {
    if (!editingLesson) return;

    try {
      const updated = await updateLesson(editingLesson.id, data);

      setLessons((prev) =>
        prev
          .map((lesson) => (lesson.id === updated.id ? updated : lesson))
          .sort((a, b) => a.lesson_order - b.lesson_order),
      );

      setEditingLesson(null);
      alert("Lección actualizada exitosamente");
    } catch (error) {
      console.error("Error al actualizar lección:", error);
      throw error;
    }
  };

  // Eliminar lección
  const handleDeleteLesson = async (lessonId: number) => {
    try {
      await deleteLesson(lessonId);
      setLessons((prev) => prev.filter((lesson) => lesson.id !== lessonId));
      alert("Lección eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar lección:", error);
      alert("No se pudo eliminar la lección. Intenta nuevamente.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">
            {error || "Curso no encontrado"}
          </p>
          <Button
            className="mt-4"
            onClick={() => navigate("/my-created-courses")}
          >
            Volver a mis cursos
          </Button>
        </div>
      </div>
    );
  }

  const maxLessonOrder =
    lessons.length > 0 ? Math.max(...lessons.map((l) => l.lesson_order)) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            color="gray"
            size="sm"
            onClick={() => navigate("/my-created-courses")}
          >
            ← Mis cursos creados
          </Button>

          <div className="mt-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {course.title}
                </h1>
                <Badge color={course.is_published ? "success" : "warning"}>
                  {course.is_published ? "Publicado" : "Borrador"}
                </Badge>
              </div>
              <p className="mt-2 text-gray-600">
                ${course.price.toFixed(2)} • {lessons.length} lección
                {lessons.length !== 1 ? "es" : ""}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                color="success"
                onClick={() => setShowEditCourseModal(true)}
              >
                <div className="flex items-center gap-2">
                  <HiPencil className="h-4 w-4" />
                  <span>Editar curso</span>
                </div>
              </Button>
              <Button
                color={course.is_published ? "warning" : "success"}
                onClick={handleTogglePublish}
              >
                <div className="flex items-center gap-2">
                  {course.is_published ? (
                    <>
                      <HiArchive className="h-4 w-4" />
                      <span>Despublicar</span>
                    </>
                  ) : (
                    <>
                      <FaRocket className="h-4 w-4" />
                      <span>Publicar</span>
                    </>
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Descripción del curso */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
          <p className="text-gray-700">
            {course.description || "Sin descripción"}
          </p>
        </div>

        {/* Sección de lecciones */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <HiBookOpen className="h-6 w-6" />
              <span>Lecciones</span>
            </h2>
            <Button color="success" onClick={() => setShowAddLessonModal(true)}>
              <div className="flex items-center gap-2">
                <HiPlus className="h-4 w-4" />
                <span>Agregar lección</span>
              </div>
            </Button>
          </div>

          {lessons.length === 0 ? (
            <div className="rounded-lg bg-gray-50 p-12 text-center">
              <p className="text-lg text-gray-500">
                Aún no has agregado lecciones a este curso.
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Comienza agregando tu primera lección para estructurar el
                contenido.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  isOwner
                  onEdit={setEditingLesson}
                  onDelete={handleDeleteLesson}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal: Editar curso */}
        <Modal
          show={showEditCourseModal}
          onClose={() => setShowEditCourseModal(false)}
        >
          <div className="p-6">
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Editar información del curso
            </h3>
            <CourseForm
              initialData={{
                title: course.title,
                description: course.description || "",
                price: course.price,
              }}
              onSubmit={handleUpdateCourse}
              submitLabel="Guardar cambios"
            />
          </div>
        </Modal>

        {/* Modal: Agregar lección */}
        <Modal
          show={showAddLessonModal}
          onClose={() => setShowAddLessonModal(false)}
        >
          <div className="p-6">
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Agregar nueva lección
            </h3>
            <LessonForm
              onSubmit={handleAddLesson}
              onCancel={() => setShowAddLessonModal(false)}
              submitLabel="Agregar lección"
              maxOrder={maxLessonOrder + 1}
            />
          </div>
        </Modal>

        {/* Modal: Editar lección */}
        <Modal show={!!editingLesson} onClose={() => setEditingLesson(null)}>
          <div className="p-6">
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Editar lección
            </h3>
            {editingLesson && (
              <LessonForm
                initialData={{
                  title: editingLesson.title,
                  content_text: editingLesson.content_text || "",
                  video_url: editingLesson.video_url || "",
                  lesson_order: editingLesson.lesson_order,
                }}
                onSubmit={handleUpdateLesson}
                onCancel={() => setEditingLesson(null)}
                submitLabel="Guardar cambios"
                maxOrder={maxLessonOrder}
              />
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}
