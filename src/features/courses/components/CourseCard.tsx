import { Card, Button, Avatar, Badge } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiBookOpen, HiCog } from "react-icons/hi";
import type { Course } from "../services/coursesService";

interface CourseCardProps {
  course: Course;
  showManageButton?: boolean;
  onEnroll?: (courseId: number) => void;
  enrolling?: boolean;
}

export function CourseCard({
  course,
  showManageButton = false,
  onEnroll,
  enrolling = false,
}: CourseCardProps) {
  return (
    <Card className="max-w-sm">
      {/* Estado de publicación (solo para expertos) */}
      {showManageButton && (
        <div className="flex items-start justify-between">
          <Badge color={course.is_published ? "success" : "warning"}>
            {course.is_published ? "Publicado" : "Borrador"}
          </Badge>
        </div>
      )}

      {/* Título y precio */}
      <div className="mb-2">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {course.title}
        </h5>
        <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
          ${course.price.toFixed(2)}
        </p>
      </div>

      {/* Descripción */}
      <p className="line-clamp-3 font-normal text-gray-700 dark:text-gray-400">
        {course.description || "Sin descripción"}
      </p>

      {/* Información del experto */}
      {course.expert && (
        <div className="flex items-center gap-2 border-t border-gray-200 pt-2 dark:border-gray-700">
          <Avatar
            img={course.expert.avatar_url || undefined}
            alt={course.expert.full_name || "Experto"}
            size="sm"
            rounded
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {course.expert.full_name || "Usuario"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {course.lessons_count || 0} lección
              {course.lessons_count !== 1 ? "es" : ""}
            </p>
          </div>
        </div>
      )}

      {/* Acciones */}
      <div className="flex gap-2">
        {showManageButton ? (
          <>
            <Link to={`/courses/manage/${course.id}`} className="flex-1">
              <Button color="blue" className="w-full">
                <div className="flex items-center gap-2">
                  <HiCog className="h-4 w-4" />
                  <span>Gestionar</span>
                </div>
              </Button>
            </Link>
          </>
        ) : course.is_enrolled ? (
          // Usuario inscrito: solo botón "Ver contenido" ocupando todo el espacio
          <Link to={`/courses/${course.id}`} className="w-full">
            <Button color="blue" className="w-full">
              <div className="flex items-center justify-center gap-2">
                <HiBookOpen className="h-5 w-5" />
                <span>Ver contenido</span>
              </div>
            </Button>
          </Link>
        ) : (
          // Usuario NO inscrito: botones "Ver detalles" y "Comprar"
          <>
            <Link to={`/courses/${course.id}`} className="flex-1">
              <Button color="gray" className="w-full">
                Ver detalles
              </Button>
            </Link>

            {onEnroll ? (
              <Button
                color="green"
                onClick={() => onEnroll(course.id)}
                disabled={enrolling}
                className="flex-1"
              >
                {enrolling ? "Comprando..." : "💳 Comprar"}
              </Button>
            ) : null}
          </>
        )}
      </div>
    </Card>
  );
}
