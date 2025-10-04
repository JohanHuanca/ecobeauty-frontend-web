# Feature: Autenticación y Gestión de Perfiles

## 📋 Descripción

Este módulo implementa el sistema completo de autenticación y gestión de perfiles para la plataforma EcoBeauty, incluyendo:

- ✅ Registro de nuevos usuarios
- ✅ Inicio de sesión con email/contraseña
- ✅ Inicio de sesión con Google OAuth
- ✅ Gestión de perfil de usuario
- ✅ Cierre de sesión seguro
- ✅ Protección de rutas privadas

## 🏗️ Estructura del Proyecto

```
src/features/security/
├── components/           # Componentes reutilizables
│   ├── LoginForm.tsx    # Formulario de inicio de sesión
│   └── RegisterForm.tsx # Formulario de registro
├── pages/               # Páginas del feature
│   ├── LoginPage.tsx    # Página de login
│   ├── RegisterPage.tsx # Página de registro
│   └── ProfilePage.tsx  # Página de perfil del usuario
└── services/            # Servicios y lógica de negocio
    └── authService.ts   # Servicio de autenticación

src/core/services/
├── supabase.ts          # Cliente de Supabase
└── useSupabaseAuth.ts   # Hook personalizado de autenticación

src/shared/components/
└── ProtectedRoute.tsx   # Componente para rutas protegidas
```

## 🚀 Características Implementadas

### HU-Auth-1: Registro de Usuario

- Formulario con validación de campos
- Validación de contraseñas coincidentes
- Mensajes de error claros en español
- Confirmación visual de registro exitoso

### HU-Auth-2: Inicio de Sesión

- Autenticación con email y contraseña
- Validación de credenciales
- Manejo de errores con mensajes amigables
- Redirección automática al perfil

### HU-Auth-3: Login con Google

- Integración con Google OAuth
- Flujo de autenticación simplificado
- Redirección automática post-autenticación

### HU-Auth-4: Cierre de Sesión

- Botón de logout en el perfil
- Limpieza de sesión en Supabase
- Redirección automática al login

### HU-Auth-5: Gestión de Perfil

- Visualización de información del usuario
- Edición de nombre completo
- Cambio de avatar con upload a Supabase Storage
- Visualización de roles (Experto/Principiante)
- Validación de tamaño y tipo de imagen

## 🔧 Tecnologías Utilizadas

- **React 19** con TypeScript
- **Supabase** para autenticación y base de datos
- **Flowbite-React** para componentes UI
- **React Router DOM** para navegación
- **React Icons** para iconografía

## 📦 Servicios Implementados

### `authService.ts`

Servicio centralizado que maneja todas las operaciones de autenticación:

```typescript
// Métodos disponibles:
- register(data: RegisterData): Promise<AuthResponse>
- login(data: LoginData): Promise<AuthResponse>
- loginWithGoogle(): Promise<AuthResponse>
- logout(): Promise<AuthResponse>
- updateProfile(userId: string, data: UpdateProfileData): Promise<AuthResponse>
- uploadAvatar(userId: string, file: File): Promise<string | null>
```

### `useSupabaseAuth.ts`

Hook personalizado que proporciona:

- Estado global de autenticación
- Información del perfil del usuario
- Estados de roles (isExpert, isNovice)
- Estado de inicialización
- Sincronización automática con Supabase

## 🛣️ Rutas Configuradas

| Ruta        | Tipo      | Componente   | Descripción                |
| ----------- | --------- | ------------ | -------------------------- |
| `/`         | Pública   | Redirect     | Redirige a `/login`        |
| `/login`    | Pública   | LoginPage    | Página de inicio de sesión |
| `/register` | Pública   | RegisterPage | Página de registro         |
| `/profile`  | Protegida | ProfilePage  | Perfil del usuario         |

## 🔐 Sistema de Protección de Rutas

El componente `ProtectedRoute` verifica la autenticación del usuario:

1. **Inicializando**: Muestra spinner mientras verifica la sesión
2. **No autenticado**: Redirige automáticamente a `/login`
3. **Autenticado**: Permite acceso al contenido protegido

## 🎨 Componentes UI

Todos los componentes utilizan **Flowbite-React** para mantener consistencia visual:

- Cards para contenedores
- Buttons con estados de loading
- TextInput con iconos
- Alert para mensajes de error/éxito
- Avatar con soporte de imágenes
- Badge para mostrar roles
- Spinner para estados de carga

## ⚙️ Configuración Requerida

### 1. Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima
```

### 2. Configuración de Supabase

#### A. Base de Datos

Ejecutar el script SQL `public/supabase_db.sql` en Supabase SQL Editor.

#### B. Storage para Avatares

1. Crear bucket llamado `avatars` en Supabase Storage
2. Configurar como público
3. Establecer políticas de acceso:

```sql
-- Política para subir avatares (usuarios autenticados)
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Política para actualizar avatares (usuarios autenticados)
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Política para lectura pública de avatares
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');
```

#### C. Autenticación con Google OAuth

1. Ir a Authentication > Providers en Supabase
2. Habilitar Google provider
3. Configurar Client ID y Client Secret desde Google Cloud Console
4. Agregar URL de redirección autorizada

### 3. Instalar Dependencias

```bash
npm install
```

## 🚀 Uso

### Iniciar Desarrollo

```bash
npm run dev
```

### Ejemplo de Uso del Hook

```typescript
import { useSupabaseAuth } from './core/services/useSupabaseAuth';

function MiComponente() {
  const { session, profile, initializing, isExpert, isNovice } = useSupabaseAuth();

  if (initializing) return <Spinner />;
  if (!session) return <Navigate to="/login" />;

  return (
    <div>
      <h1>Hola {profile?.full_name}</h1>
      {isExpert && <p>Eres un experto</p>}
      {isNovice && <p>Eres principiante</p>}
    </div>
  );
}
```

### Ejemplo de Uso del Servicio

```typescript
import { authService } from "./features/security/services/authService";

// Registrar usuario
const result = await authService.register({
  email: "usuario@email.com",
  password: "password123",
  fullName: "Juan Pérez",
});

if (result.success) {
  console.log("Usuario registrado");
} else {
  console.error(result.error);
}
```

## 🧪 Testing Manual

### Flujo de Registro

1. Ir a `/register`
2. Completar formulario con datos válidos
3. Verificar mensaje de éxito
4. Redirección automática a `/login`

### Flujo de Login

1. Ir a `/login`
2. Ingresar credenciales
3. Verificar redirección a `/profile`

### Flujo de Perfil

1. Estando autenticado, ir a `/profile`
2. Ver información del usuario
3. Hacer clic en "Editar perfil"
4. Cambiar nombre
5. Guardar y verificar actualización

### Flujo de Avatar

1. En `/profile`, hacer clic en el avatar
2. Seleccionar una imagen
3. Verificar upload y actualización

### Flujo de Logout

1. En `/profile`, hacer clic en "Cerrar sesión"
2. Verificar redirección a `/login`
3. Intentar acceder a `/profile` (debe redirigir a login)

## 🐛 Solución de Problemas

### Error: "Cannot find module @supabase/supabase-js"

```bash
npm install @supabase/supabase-js
```

### Error: Variables de entorno no definidas

1. Verificar que existe archivo `.env`
2. Reiniciar el servidor de desarrollo
3. Las variables deben empezar con `VITE_`

### Error al subir avatar

1. Verificar que existe el bucket `avatars` en Supabase
2. Verificar políticas de Storage
3. Verificar que el usuario está autenticado

## 📚 Próximos Pasos

- [ ] Recuperación de contraseña
- [ ] Verificación de email
- [ ] Autenticación de dos factores
- [ ] Más proveedores OAuth (GitHub, Facebook)
- [ ] Historial de sesiones
- [ ] Tests unitarios
- [ ] Tests de integración

## 👥 Roles del Sistema

Según la base de datos, existen dos roles:

1. **novice** (Principiante)
   - Asignado automáticamente a nuevos usuarios
   - Puede consumir contenido
   - Puede participar en la comunidad

2. **expert** (Experto)
   - Puede crear cursos y tutoriales
   - Puede ofrecer servicios
   - Tiene perfil extendido en `expert_profiles`

## 📄 Licencia

Este proyecto es parte de EcoBeauty y sigue la licencia del proyecto principal.
