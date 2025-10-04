import { Card, Avatar, Badge } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiSparkles } from "react-icons/hi";
import type { ExpertProfile } from "../services/expertsService";

interface ExpertCardProps {
  expert: ExpertProfile;
}

export function ExpertCard({ expert }: ExpertCardProps) {
  return (
    <Link to={`/experts/${expert.profile_id}`}>
      <Card className="max-w-sm cursor-pointer transition-all hover:shadow-lg">
        {/* Avatar y nombre */}
        <div className="flex flex-col items-center">
          <Avatar
            img={expert.profile?.avatar_url || undefined}
            alt={expert.profile?.full_name || "Experto"}
            size="xl"
            rounded
          />
          <h5 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
            {expert.profile?.full_name || "Usuario"}
          </h5>
          <Badge color="purple" className="mt-2">
            <div className="flex items-center gap-1">
              <HiSparkles className="h-3 w-3" />
              <span>Experto</span>
            </div>
          </Badge>
        </div>

        {/* Especialidades */}
        {expert.specialties && expert.specialties.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Especialidades:
            </p>
            <div className="flex flex-wrap gap-2">
              {expert.specialties.slice(0, 3).map((specialty, index) => (
                <Badge key={index} color="success">
                  {specialty}
                </Badge>
              ))}
              {expert.specialties.length > 3 && (
                <Badge color="gray">+{expert.specialties.length - 3}</Badge>
              )}
            </div>
          </div>
        )}

        {/* Bio preview */}
        {expert.bio && (
          <p className="mt-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
            {expert.bio}
          </p>
        )}

        {/* Tarifa */}
        {expert.hourly_rate !== null && expert.hourly_rate > 0 && (
          <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-gray-700">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Tarifa por hora
            </p>
            <p className="text-center text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${expert.hourly_rate.toFixed(2)}
            </p>
          </div>
        )}

        {/* Call to action */}
        <div className="mt-4 text-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          Ver perfil completo →
        </div>
      </Card>
    </Link>
  );
}
