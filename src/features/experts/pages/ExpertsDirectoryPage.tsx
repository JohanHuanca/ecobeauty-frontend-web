import { useEffect, useState } from "react";
import { TextInput } from "flowbite-react";
import { HiSparkles } from "react-icons/hi";
import { ExpertCard } from "../components/ExpertCard";
import { getAllExperts, ExpertProfile } from "../services/expertsService";

export function ExpertsDirectoryPage() {
  const [experts, setExperts] = useState<ExpertProfile[]>([]);
  const [filteredExperts, setFilteredExperts] = useState<ExpertProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExperts();
  }, []);

  useEffect(() => {
    // Filtrar expertos por query de búsqueda
    if (searchQuery.trim() === "") {
      setFilteredExperts(experts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = experts.filter(
        (expert) =>
          expert.profile?.full_name?.toLowerCase().includes(query) ||
          expert.bio?.toLowerCase().includes(query) ||
          expert.specialties?.some((specialty) =>
            specialty.toLowerCase().includes(query),
          ),
      );
      setFilteredExperts(filtered);
    }
  }, [searchQuery, experts]);

  const loadExperts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllExperts();
      setExperts(data);
      setFilteredExperts(data);
    } catch (err) {
      console.error("Error al cargar expertos:", err);
      setError("Error al cargar el directorio de expertos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 flex items-center gap-3 text-3xl font-bold text-gray-900">
            <HiSparkles className="text-accent-500 h-10 w-10" />
            <span>Directorio de Expertos</span>
          </h1>
          <p className="text-lg text-gray-600">
            Conecta con profesionales en cosmética natural y recibe asesoría
            personalizada
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-8">
          <TextInput
            type="text"
            placeholder="Buscar por nombre, especialidad o experiencia..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sizing="lg"
          />
        </div>

        {/* Estado de carga */}
        {isLoading && (
          <div className="py-12 text-center">
            <div className="border-primary-500 mx-auto h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
            <p className="mt-4 text-gray-600">Cargando expertos...</p>
          </div>
        )}

        {/* Mensaje de error */}
        {error && (
          <div className="bg-danger-50 text-danger-800 rounded-lg p-4 text-center">
            {error}
          </div>
        )}

        {/* Grid de expertos */}
        {!isLoading && !error && (
          <>
            {filteredExperts.length === 0 ? (
              <div className="rounded-lg bg-gray-50 p-12 text-center">
                <p className="text-lg text-gray-600">
                  {searchQuery
                    ? "No se encontraron expertos con ese criterio de búsqueda"
                    : "Aún no hay expertos registrados"}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-primary-600 mt-4 hover:underline"
                  >
                    Limpiar búsqueda
                  </button>
                )}
              </div>
            ) : (
              <>
                <p className="mb-4 text-sm text-gray-600">
                  {filteredExperts.length}{" "}
                  {filteredExperts.length === 1 ? "experto" : "expertos"}{" "}
                  {searchQuery && "encontrados"}
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredExperts.map((expert) => (
                    <ExpertCard key={expert.profile_id} expert={expert} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
