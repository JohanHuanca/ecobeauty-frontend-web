import { supabase } from "../../../core/services/supabase";

// Tipos para los perfiles de expertos
export interface ExpertProfile {
    profile_id: string;
    bio: string | null;
    specialties: string[] | null;
    phone_number: string | null;
    hourly_rate: number | null;
    created_at: string;
    // Datos del perfil base (JOIN)
    profile?: {
        id: string;
        full_name: string | null;
        avatar_url: string | null;
    };
}

/**
 * Obtiene todos los perfiles de expertos.
 */
export async function getAllExperts(): Promise<ExpertProfile[]> {
    try {
        const { data, error } = await supabase
            .from("expert_profiles")
            .select(
                `
        *,
        profile:profiles!expert_profiles_profile_id_fkey(id, full_name, avatar_url)
      `
            )
            .order("created_at", { ascending: false });

        if (error) throw error;

        return (data || []).map((expert) => ({
            ...expert,
            profile: expert.profile,
        }));
    } catch (error) {
        console.error("Error al obtener expertos:", error);
        throw error;
    }
}

/**
 * Obtiene un perfil de experto por su ID.
 * @param profileId - ID del perfil del experto
 */
export async function getExpertById(
    profileId: string
): Promise<ExpertProfile | null> {
    try {
        const { data, error } = await supabase
            .from("expert_profiles")
            .select(
                `
        *,
        profile:profiles!expert_profiles_profile_id_fkey(id, full_name, avatar_url)
      `
            )
            .eq("profile_id", profileId)
            .maybeSingle();

        if (error) throw error;
        if (!data) return null;

        return {
            ...data,
            profile: data.profile,
        };
    } catch (error) {
        console.error("Error al obtener perfil de experto:", error);
        throw error;
    }
}

/**
 * Verifica si un usuario tiene un perfil de experto.
 * @param profileId - ID del perfil del usuario
 */
export async function checkIfHasProfile(
    profileId: string
): Promise<boolean> {
    try {
        const { data, error } = await supabase
            .from("expert_profiles")
            .select("profile_id")
            .eq("profile_id", profileId)
            .maybeSingle();

        if (error) throw error;

        return !!data;
    } catch (error) {
        console.error("Error al verificar perfil de experto:", error);
        throw error;
    }
}

/**
 * Crea un nuevo perfil de experto.
 * @param profileData - Datos del perfil de experto
 */
export async function createExpertProfile(profileData: {
    profile_id: string;
    bio: string;
    specialties: string[];
    phone_number: string;
    hourly_rate: number;
}): Promise<ExpertProfile> {
    try {
        const { data, error } = await supabase
            .from("expert_profiles")
            .insert(profileData)
            .select(
                `
        *,
        profile:profiles!expert_profiles_profile_id_fkey(id, full_name, avatar_url)
      `
            )
            .single();

        if (error) throw error;

        return {
            ...data,
            profile: data.profile,
        };
    } catch (error) {
        console.error("Error al crear perfil de experto:", error);
        throw error;
    }
}

/**
 * Actualiza un perfil de experto existente.
 * @param profileId - ID del perfil del experto
 * @param updates - Datos a actualizar
 */
export async function updateExpertProfile(
    profileId: string,
    updates: {
        bio?: string;
        specialties?: string[];
        phone_number?: string;
        hourly_rate?: number;
    }
): Promise<ExpertProfile> {
    try {
        const { data, error } = await supabase
            .from("expert_profiles")
            .update(updates)
            .eq("profile_id", profileId)
            .select(
                `
        *,
        profile:profiles!expert_profiles_profile_id_fkey(id, full_name, avatar_url)
      `
            )
            .single();

        if (error) throw error;

        return {
            ...data,
            profile: data.profile,
        };
    } catch (error) {
        console.error("Error al actualizar perfil de experto:", error);
        throw error;
    }
}
