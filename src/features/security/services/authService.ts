
import { supabase } from '../../../core/services/supabase';

export interface AuthResponse {
    success: boolean;
    message?: string;
    error?: { message: string; code?: string };
}

export const authService = {
    async signUpWithEmail(email: string, password: string, fullName: string): Promise<AuthResponse> {
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: fullName },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) {
                return { success: false, error: { message: error.message, code: error.code } };
            }
            return { success: true, message: 'Registro exitoso. Por favor verifica tu correo electrónico.' };
        } catch {
            return { success: false, error: { message: 'Error inesperado al registrarse' } };
        }
    },

    async signInWithEmail(email: string, password: string): Promise<AuthResponse> {
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                return { success: false, error: { message: error.message, code: error.code } };
            }
            return { success: true, message: 'Inicio de sesión exitoso' };
        } catch {
            return { success: false, error: { message: 'Error inesperado al iniciar sesión' } };
        }
    },

    async signInWithGoogle(): Promise<AuthResponse> {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    queryParams: { access_type: 'offline', prompt: 'consent' },
                },
            });
            if (error) {
                return { success: false, error: { message: error.message, code: error.code } };
            }
            return { success: true, message: 'Redirigiendo a Google...' };
        } catch {
            return { success: false, error: { message: 'Error al iniciar sesión con Google' } };
        }
    },

    async signOut(): Promise<AuthResponse> {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                return { success: false, error: { message: error.message, code: error.code } };
            }
            return { success: true, message: 'Sesión cerrada exitosamente' };
        } catch {
            return { success: false, error: { message: 'Error al cerrar sesión' } };
        }
    },

    async resetPasswordForEmail(email: string): Promise<AuthResponse> {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });
            if (error) {
                return { success: false, error: { message: error.message, code: error.code } };
            }
            return { success: true, message: 'Se ha enviado un enlace de recuperación a tu correo' };
        } catch {
            return { success: false, error: { message: 'Error al enviar el correo de recuperación' } };
        }
    },

    async updatePassword(newPassword: string): Promise<AuthResponse> {
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) {
                return { success: false, error: { message: error.message, code: error.code } };
            }
            return { success: true, message: 'Contraseña actualizada exitosamente' };
        } catch {
            return { success: false, error: { message: 'Error al actualizar la contraseña' } };
        }
    },

    async getCurrentUser() {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            return user;
        } catch {
            return null;
        }
    },

    async getCurrentProfile() {
        try {
            const user = await this.getCurrentUser();
            if (!user) return null;
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            if (error) {
                console.error('Error al obtener perfil:', error);
                return null;
            }
            return data;
        } catch {
            return null;
        }
    },

    async getUserRoles(userId: string) {
        try {
            const { data, error } = await supabase
                .from('user_roles')
                .select('*, roles(*)')
                .eq('profile_id', userId);
            if (error) {
                console.error('Error al obtener roles:', error);
                return [];
            }
            return data;
        } catch {
            return [];
        }
    },

    async hasRole(userId: string, roleName: string): Promise<boolean> {
        try {
            const { data, error } = await supabase
                .from('user_roles')
                .select('roles(name)')
                .eq('profile_id', userId)
                .eq('roles.name', roleName)
                .single();
            return !error && data !== null;
        } catch {
            return false;
        }
    },

    async updateProfile(userId: string, data: { fullName?: string; avatarUrl?: string }): Promise<AuthResponse> {
        try {
            const updateData: Record<string, string> = {};
            if (data.fullName !== undefined) updateData.full_name = data.fullName;
            if (data.avatarUrl !== undefined) updateData.avatar_url = data.avatarUrl;
            const { error } = await supabase.from('profiles').update(updateData).eq('id', userId);
            if (error) {
                return { success: false, error: { message: error.message, code: error.code } };
            }
            return { success: true, message: 'Perfil actualizado exitosamente' };
        } catch {
            return { success: false, error: { message: 'Error inesperado al actualizar el perfil' } };
        }
    },

    async uploadAvatar(userId: string, file: File): Promise<string | null> {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}-${Date.now()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;
            const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
            if (uploadError) {
                console.error('Error al subir avatar:', uploadError);
                return null;
            }
            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
            return data.publicUrl;
        } catch (error) {
            console.error('Error inesperado al subir avatar:', error);
            return null;
        }
    },
};
