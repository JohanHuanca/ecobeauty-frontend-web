import { supabase } from '../../../core/services/supabase';
import type { AuthError } from '@supabase/supabase-js';

// Tipos para las respuestas del servicio
export interface AuthResponse {
    success: boolean;
    error?: string;
}

// Tipos para los datos de registro
export interface RegisterData {
    email: string;
    password: string;
    fullName: string;
}

// Tipos para los datos de login
export interface LoginData {
    email: string;
    password: string;
}

// Tipos para actualización de perfil
export interface UpdateProfileData {
    fullName?: string;
    avatarUrl?: string;
}

/**
 * Servicio de autenticación que maneja todas las operaciones relacionadas
 * con registro, login, logout y gestión de perfiles
 */
class AuthService {
    /**
     * Registra un nuevo usuario en el sistema
     * @param data Datos del usuario (email, password, fullName)
     * @returns Promesa con el resultado de la operación
     */
    async register(data: RegisterData): Promise<AuthResponse> {
        try {
            const { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.fullName,
                    },
                },
            });

            if (error) {
                return {
                    success: false,
                    error: this.getErrorMessage(error),
                };
            }

            return {
                success: true,
            };
        } catch {
            return {
                success: false,
                error: 'Error inesperado durante el registro',
            };
        }
    }

    /**
     * Inicia sesión con email y contraseña
     * @param data Credenciales del usuario (email, password)
     * @returns Promesa con el resultado de la operación
     */
    async login(data: LoginData): Promise<AuthResponse> {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (error) {
                return {
                    success: false,
                    error: this.getErrorMessage(error),
                };
            }

            return {
                success: true,
            };
        } catch {
            return {
                success: false,
                error: 'Error inesperado durante el inicio de sesión',
            };
        }
    }

    /**
     * Inicia sesión con Google OAuth
     * @returns Promesa con el resultado de la operación
     */
    async loginWithGoogle(): Promise<AuthResponse> {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/`,
                },
            });

            if (error) {
                return {
                    success: false,
                    error: this.getErrorMessage(error),
                };
            }

            return {
                success: true,
            };
        } catch {
            return {
                success: false,
                error: 'Error inesperado durante el inicio de sesión con Google',
            };
        }
    }

    /**
     * Cierra la sesión del usuario actual
     * @returns Promesa con el resultado de la operación
     */
    async logout(): Promise<AuthResponse> {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                return {
                    success: false,
                    error: this.getErrorMessage(error),
                };
            }

            return {
                success: true,
            };
        } catch {
            return {
                success: false,
                error: 'Error inesperado durante el cierre de sesión',
            };
        }
    }

    /**
     * Actualiza el perfil del usuario actual
     * @param userId ID del usuario
     * @param data Datos a actualizar (fullName, avatarUrl)
     * @returns Promesa con el resultado de la operación
     */
    async updateProfile(userId: string, data: UpdateProfileData): Promise<AuthResponse> {
        try {
            const updateData: Record<string, string> = {};

            if (data.fullName !== undefined) {
                updateData.full_name = data.fullName;
            }

            if (data.avatarUrl !== undefined) {
                updateData.avatar_url = data.avatarUrl;
            }

            const { error } = await supabase
                .from('profiles')
                .update(updateData)
                .eq('id', userId);

            if (error) {
                return {
                    success: false,
                    error: this.getErrorMessage(error),
                };
            }

            return {
                success: true,
            };
        } catch {
            return {
                success: false,
                error: 'Error inesperado al actualizar el perfil',
            };
        }
    }

    /**
     * Sube una imagen de avatar al storage de Supabase
     * @param userId ID del usuario
     * @param file Archivo de imagen
     * @returns Promesa con la URL pública de la imagen o null si hay error
     */
    async uploadAvatar(userId: string, file: File): Promise<string | null> {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}-${Date.now()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, {
                    upsert: true,
                });

            if (uploadError) {
                console.error('Error al subir avatar:', uploadError);
                return null;
            }

            const { data } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error) {
            console.error('Error inesperado al subir avatar:', error);
            return null;
        }
    }

    /**
     * Convierte errores de Supabase a mensajes amigables en español
     * @param error Error de Supabase
     * @returns Mensaje de error en español
     */
    private getErrorMessage(error: AuthError | { message: string }): string {
        const errorMessages: Record<string, string> = {
            'Invalid login credentials': 'Credenciales incorrectas',
            'User already registered': 'El usuario ya está registrado',
            'Email not confirmed': 'Por favor, confirma tu email antes de iniciar sesión',
            'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres',
            'Unable to validate email address: invalid format': 'Formato de email inválido',
            'Email rate limit exceeded': 'Demasiados intentos, por favor intenta más tarde',
        };

        const message = error.message || 'Error desconocido';
        return errorMessages[message] || message;
    }
}

// Exportar una instancia única del servicio
export const authService = new AuthService();
