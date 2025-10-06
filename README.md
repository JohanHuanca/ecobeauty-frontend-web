# 🌿 EcoBeauty - Plataforma de Cosmética Natural

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green.svg)](https://supabase.com/)

EcoBeauty es una plataforma web moderna para la comunidad de cosmética natural y ecológica. Permite a los usuarios aprender, compartir y crear contenido sobre productos de belleza naturales y sostenibles.

## ✨ Características Principales

- 👥 **Comunidad**: Publicaciones, comentarios y sistema de likes
- 📚 **Tutoriales**: Videos educativos gratuitos sobre cosmética natural
- 🎓 **Cursos**: Plataforma de cursos de pago con lecciones estructuradas
- 🌟 **Expertos**: Directorio de profesionales con perfiles especializados
- 🔐 **Autenticación**: Sistema completo con Supabase Auth
- 🎨 **Sistema de Temas**: Diseño personalizado con variables CSS

## 🎨 Sistema de Temas Personalizado

La aplicación cuenta con un **sistema de temas centralizado** implementado en `src/index.css` que garantiza consistencia visual en toda la aplicación.

### Paleta de Colores

#### 🟢 Primary (Verde Emerald)

Usado para: Botones principales, enlaces, badges de estado activo

```css
--color-primary-50: #ecfdf5;
--color-primary-100: #d1fae5;
--color-primary-200: #a7f3d0;
--color-primary-300: #6ee7b7;
--color-primary-400: #34d399;
--color-primary-500: #10b981;
--color-primary-600: #059669;
--color-primary-700: #047857;
--color-primary-800: #065f46;
--color-primary-900: #064e3b;
```

#### ⚪ Secondary (Gris Neutral)

Usado para: Botones secundarios, badges informativos, estados deshabilitados

```css
--color-secondary-50: #fafafa;
--color-secondary-100: #f5f5f5;
--color-secondary-200: #e5e5e5;
--color-secondary-300: #d4d4d4;
--color-secondary-400: #a3a3a3;
--color-secondary-500: #737373;
--color-secondary-600: #525252;
--color-secondary-700: #404040;
--color-secondary-800: #262626;
--color-secondary-900: #171717;
```

#### 💛 Accent (Amarillo-Verde)

Usado para: Badges de video, estados especiales, notificaciones

```css
--color-accent-50: #fefce8;
--color-accent-100: #fef9c3;
--color-accent-200: #fef08a;
--color-accent-300: #fde047;
--color-accent-400: #facc15;
--color-accent-500: #eab308;
--color-accent-600: #ca8a04;
--color-accent-700: #a16207;
--color-accent-800: #854d0e;
--color-accent-900: #713f12;
```

#### 🔴 Danger (Rojo)

Usado para: Errores, botones destructivos, validaciones, asteriscos requeridos

```css
--color-danger-50: #fef2f2;
--color-danger-100: #fee2e2;
--color-danger-200: #fecaca;
--color-danger-300: #fca5a5;
--color-danger-400: #f87171;
--color-danger-500: #ef4444;
--color-danger-600: #dc2626;
--color-danger-700: #b91c1c;
--color-danger-800: #991b1b;
--color-danger-900: #7f1d1d;
```

### Tipografía

```css
--font-sans: "Inter", ui-sans-serif, system-ui;
--font-serif: ui-serif, Georgia;
--font-mono: ui-monospace, "Cascadia Code";
```

### Patrones de Uso

#### Botones Principales

```tsx
// Botón de acción principal
<Button className="bg-primary-600 hover:bg-primary-700 text-white disabled:bg-secondary-400">
  Guardar
</Button>

// Botón secundario
<Button className="bg-secondary-600 hover:bg-secondary-700 text-white">
  Cancelar
</Button>

// Botón destructivo
<Button className="bg-danger-600 hover:bg-danger-700 text-white">
  Eliminar
</Button>
```

#### Badges

```tsx
// Badge de estado activo
<Badge className="bg-primary-100 text-primary-800">Publicado</Badge>

// Badge informativo
<Badge className="bg-secondary-100 text-secondary-800">Borrador</Badge>

// Badge especial
<Badge className="bg-accent-100 text-accent-800">Video</Badge>
```

#### Mensajes de Error

```tsx
<Alert className="bg-danger-50 border-danger-200">
  <span className="text-danger-800 font-medium">Error:</span>
  <span className="text-danger-700">{errorMessage}</span>
</Alert>
```

#### Campos Requeridos

```tsx
<Label htmlFor="field">
  Campo requerido <span className="text-danger-500">*</span>
</Label>
```

## 🏗️ Estructura del Proyecto

```
src/
├── core/
│   └── services/          # Servicios centrales (Supabase)
├── features/
│   ├── community/         # Módulo de comunidad
│   ├── courses/           # Módulo de cursos
│   ├── experts/           # Módulo de expertos
│   ├── security/          # Módulo de autenticación
│   └── tutorials/         # Módulo de tutoriales
├── shared/
│   └── components/        # Componentes compartidos (Header, etc.)
├── App.tsx
├── index.css             # ⭐ Sistema de temas centralizado
└── main.tsx
```

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta de Supabase

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JohanHuanca/ecobeauty-frontend-web.git

# Instalar dependencias
cd ecobeauty-frontend-web
npm install
```

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
npm run preview
```

## 📦 Tecnologías Utilizadas

- **Frontend Framework**: React 18.3 + TypeScript 5.6
- **Build Tool**: Vite 6.0
- **Styling**: Tailwind CSS 3.4 + Sistema de temas personalizado
- **UI Components**: Flowbite React
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Icons**: React Icons (HeroIcons, Game Icons)
- **Router**: React Router DOM 7
- **Date Handling**: date-fns

## 🎯 Módulos Implementados

### 1. Community (Comunidad)

- Publicaciones con imágenes
- Sistema de comentarios anidados
- Likes en publicaciones y comentarios
- Feed ordenable por popularidad/reciente

### 2. Tutorials (Tutoriales)

- Videos educativos gratuitos
- Integración con YouTube
- Sistema de likes y comentarios
- Respuestas a comentarios

### 3. Courses (Cursos)

- Cursos de pago con lecciones
- Gestión de inscripciones
- Videos por lección
- Progreso del estudiante
- Panel de gestión para expertos

### 4. Experts (Expertos)

- Directorio de profesionales
- Perfiles completos con avatar y banner
- Especialidades y tarifas
- Contacto vía WhatsApp
- Filtros de búsqueda

### 5. Security (Autenticación)

- Login con email/password
- Registro de usuarios
- Autenticación con Google
- Gestión de perfiles
- Sistema de roles (Novice/Expert)

## 🔐 Sistema de Roles

- **Novice (Principiante)**: Acceso a contenido, comunidad, compra de cursos
- **Expert (Experto)**: Todas las anteriores + creación de cursos y tutoriales

## 📝 Convenciones de Código

### Componentes

- Usar PascalCase: `MyComponent.tsx`
- Un componente por archivo
- Props interface explícita

### Estilos

- **NO usar** props `color` de Flowbite (`<Button color="success">`)
- **SÍ usar** clases de tema (`<Button className="bg-primary-600">`)
- Mantener consistencia con las variables CSS definidas

### Servicios

- Funciones async/await
- Manejo de errores con try/catch
- Tipado explícito con TypeScript

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Johan Huanca** - _Desarrollo Inicial_ - [JohanHuanca](https://github.com/JohanHuanca)

## 🙏 Agradecimientos

- Comunidad de React y TypeScript
- Equipo de Supabase
- Flowbite UI Components
- Tailwind CSS

---

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!**
