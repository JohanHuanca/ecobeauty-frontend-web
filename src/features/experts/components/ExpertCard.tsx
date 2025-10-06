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
          <h5 className="mt-4 text-xl font-bold text-gray-900">
            {expert.profile?.full_name || "Usuario"}
          </h5>
          <Badge className="bg-secondary-100 text-secondary-800 mt-2">
            <div className="flex items-center gap-1">
              <HiSparkles className="h-3 w-3" />
              <span>Experto</span>
            </div>
          </Badge>
        </div>

        {/* Especialidades */}
        {expert.specialties && expert.specialties.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-gray-700">
              Especialidades:
            </p>
            <div className="flex flex-wrap gap-2">
              {expert.specialties.slice(0, 3).map((specialty, index) => (
                <Badge key={index} className="bg-primary-100 text-primary-800">
                  {specialty}
                </Badge>
              ))}
              {expert.specialties.length > 3 && (
                <Badge className="bg-gray-100 text-gray-800">
                  +{expert.specialties.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Bio preview */}
        {expert.bio && (
          <p className="mt-4 line-clamp-3 text-sm text-gray-600">
            {expert.bio}
          </p>
        )}

        {/* Tarifa */}
        {expert.hourly_rate !== null && expert.hourly_rate > 0 && (
          <div className="bg-primary-50 mt-4 rounded-lg p-3">
            <p className="text-center text-sm text-gray-600">Tarifa por hora</p>
            <p className="text-primary-600 text-center text-2xl font-bold">
              ${expert.hourly_rate.toFixed(2)}
            </p>
          </div>
        )}

        {/* Call to action */}
        <div className="text-primary-600 hover:text-primary-700 mt-4 text-center text-sm">
          Ver perfil completo →
        </div>
      </Card>
    </Link>
  );
}
