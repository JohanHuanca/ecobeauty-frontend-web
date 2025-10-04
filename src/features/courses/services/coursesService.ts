import { supabase } from "../../../core/services/supabase";

// Tipos para los cursos y lecciones
export interface Course {
    id: number;
    expert_profile_id: string;
    title: string;
    description: string | null;
    price: number;
    is_published: boolean;
    created_at: string;
    // Datos del experto (JOIN)
    expert?: {
        id: string;
        full_name: string | null;
        avatar_url: string | null;
    };
    // Conteo de lecciones
    lessons_count?: number;
    // Estado de inscripción del usuario actual
    is_enrolled?: boolean;
}

export interface Lesson {
    id: number;
    course_id: number;
    title: string;
    content_text: string | null;
    video_url: string | null;
    lesson_order: number;
    created_at: string;
}

export interface Enrollment {
    profile_id: string;
    course_id: number;
    enrolled_at: string;
}

// Interfaces para resultados de queries con JOINs
interface CourseQueryResult {
    id: number;
    expert_profile_id: string;
    title: string;
    description: string | null;
    price: number;
    is_published: boolean;
    created_at: string;
    expert: {
        id: string;
        full_name: string | null;
        avatar_url: string | null;
    };
    lessons: Array<{ count: number }>;
}

/**
 * Obtiene todos los cursos publicados (para principiantes) o todos los cursos (para expertos propietarios).
 * @param userId - ID del usuario actual (opcional, para verificar inscripciones)
 * @param expertId - ID del experto (opcional, para filtrar cursos de un experto específico)
 * @param includeUnpublished - Si es true, incluye cursos no publicados (solo para expertos dueños)
 */
export async function getAllCourses(
    userId?: string,
    expertId?: string,
    includeUnpublished = false
): Promise<Course[]> {
    try {
        let query = supabase
            .from("courses")
            .select(
                `
        *,
        expert:profiles!courses_expert_profile_id_fkey(id, full_name, avatar_url),
        lessons:course_lessons(count)
      `
            )
            .order("created_at", { ascending: false });

        // Filtrar por estado de publicación
        if (!includeUnpublished) {
            query = query.eq("is_published", true);
        }

        // Filtrar por experto específico
        if (expertId) {
            query = query.eq("expert_profile_id", expertId);
        }

        const { data, error } = await query;

        if (error) throw error;

        // Mapear resultados y contar lecciones
        const courses: Course[] = (data || []).map((course: CourseQueryResult) => ({
            ...course,
            expert: course.expert,
            lessons_count: course.lessons?.[0]?.count || 0,
        }));

        // Si hay un usuario, verificar inscripciones
        if (userId) {
            const { data: enrollments } = await supabase
                .from("course_enrollments")
                .select("course_id")
                .eq("profile_id", userId);

            const enrolledCourseIds = new Set(
                enrollments?.map((e) => e.course_id) || []
            );

            courses.forEach((course) => {
                course.is_enrolled = enrolledCourseIds.has(course.id);
            });
        }

        return courses;
    } catch (error) {
        console.error("Error al obtener cursos:", error);
        throw error;
    }
}

/**
 * Obtiene un curso por su ID con información del experto y lecciones.
 * @param courseId - ID del curso
 * @param userId - ID del usuario actual (opcional, para verificar inscripción)
 */
export async function getCourseById(
    courseId: number,
    userId?: string
): Promise<Course | null> {
    try {
        const { data, error } = await supabase
            .from("courses")
            .select(
                `
        *,
        expert:profiles!courses_expert_profile_id_fkey(id, full_name, avatar_url)
      `
            )
            .eq("id", courseId)
            .single();

        if (error) throw error;
        if (!data) return null;

        const course: Course = {
            ...data,
            expert: data.expert,
        };

        // Verificar si el usuario está inscrito
        if (userId) {
            const { data: enrollment } = await supabase
                .from("course_enrollments")
                .select("*")
                .eq("profile_id", userId)
                .eq("course_id", courseId)
                .maybeSingle();

            course.is_enrolled = !!enrollment;
        }

        return course;
    } catch (error) {
        console.error("Error al obtener curso:", error);
        throw error;
    }
}

/**
 * Obtiene las lecciones de un curso ordenadas por lesson_order.
 * @param courseId - ID del curso
 */
export async function getCourseLessons(courseId: number): Promise<Lesson[]> {
    try {
        const { data, error } = await supabase
            .from("course_lessons")
            .select("*")
            .eq("course_id", courseId)
            .order("lesson_order", { ascending: true });

        if (error) throw error;

        return data || [];
    } catch (error) {
        console.error("Error al obtener lecciones:", error);
        throw error;
    }
}

/**
 * Crea un nuevo curso (solo expertos).
 * @param courseData - Datos del curso a crear
 */
export async function createCourse(courseData: {
    expert_profile_id: string;
    title: string;
    description: string;
    price: number;
}): Promise<Course> {
    try {
        const { data, error } = await supabase
            .from("courses")
            .insert({
                ...courseData,
                is_published: false, // Los cursos se crean como no publicados
            })
            .select(
                `
        *,
        expert:profiles!courses_expert_profile_id_fkey(id, full_name, avatar_url)
      `
            )
            .single();

        if (error) throw error;

        return {
            ...data,
            expert: data.expert,
        };
    } catch (error) {
        console.error("Error al crear curso:", error);
        throw error;
    }
}

/**
 * Actualiza un curso existente (solo el propietario).
 * @param courseId - ID del curso a actualizar
 * @param updates - Datos a actualizar
 */
export async function updateCourse(
    courseId: number,
    updates: {
        title?: string;
        description?: string;
        price?: number;
    }
): Promise<Course> {
    try {
        const { data, error } = await supabase
            .from("courses")
            .update(updates)
            .eq("id", courseId)
            .select(
                `
        *,
        expert:profiles!courses_expert_profile_id_fkey(id, full_name, avatar_url)
      `
            )
            .single();

        if (error) throw error;

        return {
            ...data,
            expert: data.expert,
        };
    } catch (error) {
        console.error("Error al actualizar curso:", error);
        throw error;
    }
}

/**
 * Publica un curso (lo hace visible en el catálogo).
 * @param courseId - ID del curso a publicar
 */
export async function publishCourse(courseId: number): Promise<Course> {
    try {
        const { data, error } = await supabase
            .from("courses")
            .update({ is_published: true })
            .eq("id", courseId)
            .select(
                `
        *,
        expert:profiles!courses_expert_profile_id_fkey(id, full_name, avatar_url)
      `
            )
            .single();

        if (error) throw error;

        return {
            ...data,
            expert: data.expert,
        };
    } catch (error) {
        console.error("Error al publicar curso:", error);
        throw error;
    }
}

/**
 * Despublica un curso (lo oculta del catálogo).
 * @param courseId - ID del curso a despublicar
 */
export async function unpublishCourse(courseId: number): Promise<Course> {
    try {
        const { data, error } = await supabase
            .from("courses")
            .update({ is_published: false })
            .eq("id", courseId)
            .select(
                `
        *,
        expert:profiles!courses_expert_profile_id_fkey(id, full_name, avatar_url)
      `
            )
            .single();

        if (error) throw error;

        return {
            ...data,
            expert: data.expert,
        };
    } catch (error) {
        console.error("Error al despublicar curso:", error);
        throw error;
    }
}

/**
 * Inscribe a un usuario en un curso (compra del curso).
 * @param userId - ID del usuario
 * @param courseId - ID del curso
 */
export async function enrollInCourse(
    userId: string,
    courseId: number
): Promise<Enrollment> {
    try {
        const { data, error } = await supabase
            .from("course_enrollments")
            .insert({
                profile_id: userId,
                course_id: courseId,
            })
            .select()
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Error al inscribirse en curso:", error);
        throw error;
    }
}

/**
 * Obtiene todos los cursos en los que está inscrito un usuario.
 * @param userId - ID del usuario
 */
export async function getEnrolledCourses(userId: string): Promise<Course[]> {
    try {
        const { data, error } = await supabase
            .from("course_enrollments")
            .select(
                `
        enrolled_at,
        course:courses(
          *,
          expert:profiles!courses_expert_profile_id_fkey(id, full_name, avatar_url),
          lessons:course_lessons(count)
        )
      `
            )
            .eq("profile_id", userId)
            .order("enrolled_at", { ascending: false });

        if (error) throw error;

        // Mapear resultados
        const courses: Course[] = (data || []).map((enrollment) => {
            const courseData = enrollment.course as unknown as CourseQueryResult;
            return {
                ...courseData,
                expert: courseData.expert,
                lessons_count: courseData.lessons?.[0]?.count || 0,
                is_enrolled: true,
            };
        });

        return courses;
    } catch (error) {
        console.error("Error al obtener cursos inscritos:", error);
        throw error;
    }
}

/**
 * Crea una nueva lección en un curso (solo el propietario del curso).
 * @param lessonData - Datos de la lección
 */
export async function createLesson(lessonData: {
    course_id: number;
    title: string;
    content_text?: string;
    video_url?: string;
    lesson_order: number;
}): Promise<Lesson> {
    try {
        const { data, error } = await supabase
            .from("course_lessons")
            .insert(lessonData)
            .select()
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Error al crear lección:", error);
        throw error;
    }
}

/**
 * Actualiza una lección existente.
 * @param lessonId - ID de la lección
 * @param updates - Datos a actualizar
 */
export async function updateLesson(
    lessonId: number,
    updates: {
        title?: string;
        content_text?: string;
        video_url?: string;
        lesson_order?: number;
    }
): Promise<Lesson> {
    try {
        const { data, error } = await supabase
            .from("course_lessons")
            .update(updates)
            .eq("id", lessonId)
            .select()
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Error al actualizar lección:", error);
        throw error;
    }
}

/**
 * Elimina una lección.
 * @param lessonId - ID de la lección a eliminar
 */
export async function deleteLesson(lessonId: number): Promise<void> {
    try {
        const { error } = await supabase
            .from("course_lessons")
            .delete()
            .eq("id", lessonId);

        if (error) throw error;
    } catch (error) {
        console.error("Error al eliminar lección:", error);
        throw error;
    }
}
