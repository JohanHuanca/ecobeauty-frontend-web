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
    likes_count?: number;
    comments_count?: number;
    user_has_liked?: boolean;
}

export interface CreateTutorialData {
    title: string;
    description: string;
    video_url: string;
}

export interface TutorialComment {
    id: number;
    profile_id: string;
    tutorial_id: number;
    parent_comment_id: number | null;
    content: string;
    created_at: string;
    profiles?: {
        full_name: string | null;
        avatar_url: string | null;
    };
    replies?: TutorialComment[]; // Respuestas anidadas
}

export interface CreateCommentData {
    tutorial_id: number;
    content: string;
    parent_comment_id?: number;
}

/**
 * Obtiene todos los tutoriales con información del perfil del creador,
 * contadores de likes y comentarios, y ordenados por relevancia
 */
export async function getAllTutorials(orderBy: 'recent' | 'popular' = 'popular'): Promise<Tutorial[]> {
    const { data: { user } } = await supabase.auth.getUser();

    // Query base con contadores
    let query = supabase
        .from('tutorials')
        .select(`
            *,
            profiles!tutorials_profile_id_fkey (
                full_name,
                avatar_url
            )
        `);

    // Ordenamiento
    if (orderBy === 'recent') {
        query = query.order('created_at', { ascending: false });
    }
    // Para 'popular', ordenaremos manualmente después de calcular los contadores

    const { data: tutorials, error } = await query;

    if (error) {
        throw new Error(`Error al cargar tutoriales: ${error.message}`);
    }

    if (!tutorials || tutorials.length === 0) {
        return [];
    }

    // Obtener contadores de likes y comentarios para todos los tutoriales
    const tutorialIds = tutorials.map(t => t.id);

    // Contar likes
    const { data: likesData } = await supabase
        .from('tutorial_likes')
        .select('tutorial_id')
        .in('tutorial_id', tutorialIds);

    // Contar comentarios
    const { data: commentsData } = await supabase
        .from('tutorial_comments')
        .select('tutorial_id')
        .in('tutorial_id', tutorialIds);

    // Verificar si el usuario actual dio like
    let userLikes: number[] = [];
    if (user) {
        const { data: userLikesData } = await supabase
            .from('tutorial_likes')
            .select('tutorial_id')
            .eq('profile_id', user.id)
            .in('tutorial_id', tutorialIds);
        userLikes = userLikesData?.map(l => l.tutorial_id) || [];
    }

    // Agregar contadores a cada tutorial
    const tutorialsWithStats = tutorials.map(tutorial => {
        const likes_count = likesData?.filter(l => l.tutorial_id === tutorial.id).length || 0;
        const comments_count = commentsData?.filter(c => c.tutorial_id === tutorial.id).length || 0;
        const user_has_liked = userLikes.includes(tutorial.id);

        return {
            ...tutorial,
            likes_count,
            comments_count,
            user_has_liked,
        };
    });

    // Ordenar por popularidad si es necesario
    if (orderBy === 'popular') {
        tutorialsWithStats.sort((a, b) => {
            const scoreA = (a.likes_count * 2) + a.comments_count;
            const scoreB = (b.likes_count * 2) + b.comments_count;
            return scoreB - scoreA; // Descendente
        });
    }

    return tutorialsWithStats;
}

/**
 * Obtiene un tutorial específico por ID con contadores y estado de like del usuario
 */
export async function getTutorialById(id: number): Promise<Tutorial | null> {
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from('tutorials')
        .select(`
            *,
            profiles!tutorials_profile_id_fkey (
                full_name,
                avatar_url
            )
        `)
        .eq('id', id)
        .single();

    if (error) {
        throw new Error(`Error al cargar el tutorial: ${error.message}`);
    }

    if (!data) return null;

    // Contar likes
    const { count: likes_count } = await supabase
        .from('tutorial_likes')
        .select('*', { count: 'exact', head: true })
        .eq('tutorial_id', id);

    // Contar comentarios
    const { count: comments_count } = await supabase
        .from('tutorial_comments')
        .select('*', { count: 'exact', head: true })
        .eq('tutorial_id', id);

    // Verificar si el usuario dio like
    let user_has_liked = false;
    if (user) {
        const { data: likeData } = await supabase
            .from('tutorial_likes')
            .select('tutorial_id')
            .eq('profile_id', user.id)
            .eq('tutorial_id', id)
            .maybeSingle();
        user_has_liked = !!likeData;
    }

    return {
        ...data,
        likes_count: likes_count || 0,
        comments_count: comments_count || 0,
        user_has_liked,
    };
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
      profiles!tutorials_profile_id_fkey (
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

/**
 * Obtiene todos los tutoriales creados por el usuario actual
 */
export async function getMyCreatedTutorials(): Promise<Tutorial[]> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Debes estar autenticado');
    }

    const { data: tutorials, error } = await supabase
        .from('tutorials')
        .select(`
            *,
            profiles!tutorials_profile_id_fkey (
                full_name,
                avatar_url
            )
        `)
        .eq('profile_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(`Error al cargar tus tutoriales: ${error.message}`);
    }

    if (!tutorials || tutorials.length === 0) {
        return [];
    }

    // Obtener contadores de likes y comentarios
    const tutorialIds = tutorials.map(t => t.id);

    const { data: likesData } = await supabase
        .from('tutorial_likes')
        .select('tutorial_id')
        .in('tutorial_id', tutorialIds);

    const { data: commentsData } = await supabase
        .from('tutorial_comments')
        .select('tutorial_id')
        .in('tutorial_id', tutorialIds);

    // Agregar contadores
    const tutorialsWithStats = tutorials.map(tutorial => {
        const likes_count = likesData?.filter(l => l.tutorial_id === tutorial.id).length || 0;
        const comments_count = commentsData?.filter(c => c.tutorial_id === tutorial.id).length || 0;

        return {
            ...tutorial,
            likes_count,
            comments_count,
            user_has_liked: false, // No necesario para los propios tutoriales
        };
    });

    return tutorialsWithStats;
}

/**
 * Obtiene todos los comentarios de un tutorial con sus respuestas anidadas
 */
export async function getTutorialComments(tutorialId: number): Promise<TutorialComment[]> {
    // Obtener TODOS los comentarios del tutorial (padres e hijos)
    const { data: allComments, error } = await supabase
        .from('tutorial_comments')
        .select(`
            *,
            profiles!tutorial_comments_profile_id_fkey (
                full_name,
                avatar_url
            )
        `)
        .eq('tutorial_id', tutorialId)
        .order('created_at', { ascending: true }); // Orden ascendente para construir el árbol

    if (error) {
        throw new Error(`Error al cargar comentarios: ${error.message}`);
    }

    if (!allComments || allComments.length === 0) {
        return [];
    }

    // Organizar los comentarios en una estructura jerárquica
    const commentsMap = new Map<number, TutorialComment>();
    const rootComments: TutorialComment[] = [];

    // Primera pasada: crear el mapa de comentarios
    allComments.forEach(comment => {
        commentsMap.set(comment.id, { ...comment, replies: [] });
    });

    // Segunda pasada: construir la jerarquía
    allComments.forEach(comment => {
        const commentWithReplies = commentsMap.get(comment.id)!;

        if (comment.parent_comment_id === null) {
            // Es un comentario raíz
            rootComments.push(commentWithReplies);
        } else {
            // Es una respuesta, agregarlo al comentario padre
            const parent = commentsMap.get(comment.parent_comment_id);
            if (parent) {
                parent.replies!.push(commentWithReplies);
            }
        }
    });

    // Ordenar comentarios raíz por fecha descendente (más recientes primero)
    rootComments.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return rootComments;
}

/**
 * Crea un nuevo comentario en un tutorial
 */
export async function createTutorialComment(commentData: CreateCommentData): Promise<TutorialComment> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Debes estar autenticado para comentar');
    }

    const { data, error } = await supabase
        .from('tutorial_comments')
        .insert({
            profile_id: user.id,
            tutorial_id: commentData.tutorial_id,
            content: commentData.content,
            parent_comment_id: commentData.parent_comment_id || null,
        })
        .select(`
            *,
            profiles!tutorial_comments_profile_id_fkey (
                full_name,
                avatar_url
            )
        `)
        .single();

    if (error) {
        throw new Error(`Error al crear el comentario: ${error.message}`);
    }

    return data;
}

/**
 * Da like a un tutorial
 */
export async function likeTutorial(tutorialId: number): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Debes estar autenticado para dar like');
    }

    const { error } = await supabase
        .from('tutorial_likes')
        .insert({
            profile_id: user.id,
            tutorial_id: tutorialId,
        });

    if (error) {
        // Si ya existe el like, no hacer nada
        if (error.code === '23505') {
            return;
        }
        throw new Error(`Error al dar like: ${error.message}`);
    }
}

/**
 * Quita el like de un tutorial
 */
export async function unlikeTutorial(tutorialId: number): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Debes estar autenticado');
    }

    const { error } = await supabase
        .from('tutorial_likes')
        .delete()
        .eq('profile_id', user.id)
        .eq('tutorial_id', tutorialId);

    if (error) {
        throw new Error(`Error al quitar like: ${error.message}`);
    }
}
