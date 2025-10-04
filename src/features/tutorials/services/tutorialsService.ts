import { supabase } from '../../../core/services/supabase';

export interface Tutorial {
    id: number;
    profile_id: string;
    title: string;
    description: string | null;
    video_url: string | null;
    created_at: string;
    profiles?: {
        full_name: string | null;
        avatar_url: string | null;
    };
}

export interface CreateTutorialData {
    title: string;
    description: string;
    video_url: string;
}

/**
 * Obtiene todos los tutoriales con información del perfil del creador
 */
export async function getAllTutorials(): Promise<Tutorial[]> {
    const { data, error } = await supabase
        .from('tutorials')
        .select(`
      *,
      profiles (
        full_name,
        avatar_url
      )
    `)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(`Error al cargar tutoriales: ${error.message}`);
    }

    return data || [];
}

/**
 * Obtiene un tutorial específico por ID
 */
export async function getTutorialById(id: number): Promise<Tutorial | null> {
    const { data, error } = await supabase
        .from('tutorials')
        .select(`
      *,
      profiles (
        full_name,
        avatar_url
      )
    `)
        .eq('id', id)
        .single();

    if (error) {
        throw new Error(`Error al cargar el tutorial: ${error.message}`);
    }

    return data;
}

/**
 * Crea un nuevo tutorial (solo para usuarios autenticados)
 */
export async function createTutorial(tutorialData: CreateTutorialData): Promise<Tutorial> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Debes estar autenticado para crear un tutorial');
    }

    const { data, error } = await supabase
        .from('tutorials')
        .insert({
            profile_id: user.id,
            title: tutorialData.title,
            description: tutorialData.description,
            video_url: tutorialData.video_url,
        })
        .select(`
      *,
      profiles (
        full_name,
        avatar_url
      )
    `)
        .single();

    if (error) {
        throw new Error(`Error al crear el tutorial: ${error.message}`);
    }

    return data;
}
