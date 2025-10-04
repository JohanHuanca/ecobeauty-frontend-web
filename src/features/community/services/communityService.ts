import { supabase } from '../../../core/services/supabase';

export interface Post {
    id: number;
    profile_id: string;
    content: string;
    image_url: string | null;
    created_at: string;
    profiles?: {
        full_name: string | null;
        avatar_url: string | null;
    };
    comments_count?: number;
}

export interface PostComment {
    id: number;
    profile_id: string;
    post_id: number;
    parent_comment_id: number | null;
    content: string;
    created_at: string;
    profiles?: {
        full_name: string | null;
        avatar_url: string | null;
    };
}

export interface PostWithComments extends Post {
    comments: PostComment[];
}

export interface CreatePostData {
    content: string;
    image?: File;
}

/**
 * Obtiene todos los posts del feed ordenados por fecha
 */
export async function getAllPosts(): Promise<Post[]> {
    const { data, error } = await supabase
        .from('posts')
        .select(`
      *,
      profiles (
        full_name,
        avatar_url
      )
    `)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(`Error al cargar publicaciones: ${error.message}`);
    }

    // Contar comentarios para cada post
    const postsWithCounts = await Promise.all(
        (data || []).map(async (post) => {
            const { count } = await supabase
                .from('post_comments')
                .select('*', { count: 'exact', head: true })
                .eq('post_id', post.id);

            return {
                ...post,
                comments_count: count || 0,
            };
        })
    );

    return postsWithCounts;
}

/**
 * Obtiene un post específico con todos sus comentarios
 */
export async function getPostById(id: number): Promise<PostWithComments | null> {
    const { data: post, error: postError } = await supabase
        .from('posts')
        .select(`
      *,
      profiles (
        full_name,
        avatar_url
      )
    `)
        .eq('id', id)
        .single();

    if (postError) {
        throw new Error(`Error al cargar la publicación: ${postError.message}`);
    }

    // Obtener comentarios del post (solo comentarios raíz, sin respuestas anidadas por ahora)
    const { data: comments, error: commentsError } = await supabase
        .from('post_comments')
        .select(`
      *,
      profiles (
        full_name,
        avatar_url
      )
    `)
        .eq('post_id', id)
        .is('parent_comment_id', null)
        .order('created_at', { ascending: true });

    if (commentsError) {
        throw new Error(`Error al cargar comentarios: ${commentsError.message}`);
    }

    return {
        ...post,
        comments: comments || [],
    };
}

/**
 * Sube una imagen al bucket de posts
 */
async function uploadPostImage(file: File, userId: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('posts')
        .upload(filePath, file);

    if (uploadError) {
        throw new Error(`Error al subir imagen: ${uploadError.message}`);
    }

    const { data } = supabase.storage.from('posts').getPublicUrl(filePath);
    return data.publicUrl;
}

/**
 * Crea un nuevo post
 */
export async function createPost(postData: CreatePostData): Promise<Post> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Debes estar autenticado para publicar');
    }

    let imageUrl: string | null = null;

    // Subir imagen si existe
    if (postData.image) {
        imageUrl = await uploadPostImage(postData.image, user.id);
    }

    const { data, error } = await supabase
        .from('posts')
        .insert({
            profile_id: user.id,
            content: postData.content,
            image_url: imageUrl,
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
        throw new Error(`Error al crear la publicación: ${error.message}`);
    }

    return data;
}

/**
 * Crea un comentario en un post
 */
export async function createComment(
    postId: number,
    content: string
): Promise<PostComment> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Debes estar autenticado para comentar');
    }

    const { data, error } = await supabase
        .from('post_comments')
        .insert({
            profile_id: user.id,
            post_id: postId,
            content: content,
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
        throw new Error(`Error al crear el comentario: ${error.message}`);
    }

    return data;
}
