# 🌿 EcoBeauty - Plataforma de Cosmética Natural

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green.svg)](https://supabase.com/)

EcoBeauty es una plataforma web moderna para la comunidad de cosmética natural y ecológica. Permite a los usuarios aprender, compartir y crear contenido sobre productos de belleza naturales y sostenibles.

## 📋 Historias de Usuario Implementadas (MVP)

### 🔐 Épica: Gestión de Cuentas y Autenticación

#### **HU-001: Registro de Nuevo Usuario**

**Como** Visitante, **quiero** poder registrarme usando mi correo electrónico y una contraseña, **para** crear mi cuenta gratuita.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir campos del formulario de registro (email, password, nombre completo)
- ✅ Diseñar mockup de página de registro
- ✅ Definir validaciones de formulario
- ✅ Especificar flujo post-registro (redirección a role-selection)

**Fase 2 - Desarrollo Backend**

- ✅ Configurar Supabase Auth para email/password
- ✅ Crear tabla `profiles` en PostgreSQL
- ✅ Implementar trigger `handle_new_user()` para crear perfil automáticamente
- ✅ Configurar RLS (Row Level Security) para tabla profiles

**Fase 3 - Desarrollo Frontend**

- ✅ Crear componente `RegisterForm.tsx`
- ✅ Implementar validación de campos (email válido, password min 6 caracteres, confirmación)
- ✅ Integrar con Supabase Auth `signUp()`
- ✅ Crear página `RegisterPage.tsx` con diseño responsive
- ✅ Agregar manejo de errores y mensajes de éxito
- ✅ Implementar redirección a `/role-selection` tras registro exitoso

**Fase 4 - Testing**

- ✅ Probar registro con datos válidos
- ✅ Verificar validaciones de formulario
- ✅ Comprobar creación automática de perfil en BD
- ✅ Probar flujo completo: registro → role-selection → home

**Fase 5 - Deploy y Configuración**

- ✅ Configurar variables de entorno de Supabase
- ✅ Desactivar confirmación de email en Supabase (para desarrollo)
- ✅ Verificar funcionamiento en producción
</details>

---

#### **HU-002: Autenticación con Google**

**Como** Visitante, **quiero** poder registrarme/iniciar sesión con mi cuenta de Google, **para** acceder rápidamente sin crear una contraseña.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir flujo OAuth con Google
- ✅ Diseñar botón de Google Auth (icono + texto)
- ✅ Especificar callback URL (`/auth/callback`)

**Fase 2 - Desarrollo Backend**

- ✅ Configurar Google OAuth en Supabase Dashboard
- ✅ Obtener Client ID y Secret de Google Cloud Console
- ✅ Configurar redirect URLs permitidas
- ✅ Asegurar que trigger `handle_new_user()` funcione con Google Auth

**Fase 3 - Desarrollo Frontend**

- ✅ Crear función `signInWithGoogle()` en `supabase.ts`
- ✅ Agregar botón Google en `LoginForm.tsx` y `RegisterForm.tsx`
- ✅ Crear `AuthCallbackPage.tsx` para manejar redirección
- ✅ Implementar lógica de detección de primer login (verificar cantidad de roles)
- ✅ Agregar icono `FcGoogle` de react-icons

**Fase 4 - Testing**

- ✅ Probar login con cuenta Google existente
- ✅ Probar registro con cuenta Google nueva
- ✅ Verificar redirección correcta a `/role-selection` en primer login
- ✅ Verificar redirección a home en logins posteriores

**Fase 5 - Deploy y Configuración**

- ✅ Configurar Google OAuth URLs en producción
- ✅ Actualizar Authorized redirect URIs en Google Cloud
- ✅ Probar OAuth en dominio de producción
</details>

---

#### **HU-003: Inicio de Sesión**

**Como** Usuario Registrado, **quiero** poder iniciar sesión con mi email y contraseña, **para** acceder a mi panel de control.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir campos del formulario (email, password)
- ✅ Diseñar página de login responsive
- ✅ Especificar redirección post-login (home)

**Fase 2 - Desarrollo Backend**

- ✅ Configurar autenticación de Supabase
- ✅ Definir políticas de sesión

**Fase 3 - Desarrollo Frontend**

- ✅ Crear componente `LoginForm.tsx`
- ✅ Integrar `signInWithPassword()` de Supabase
- ✅ Crear página `LoginPage.tsx`
- ✅ Implementar validación de campos
- ✅ Agregar manejo de errores (credenciales incorrectas)
- ✅ Agregar enlace a "¿Olvidaste tu contraseña?"
- ✅ Agregar enlace a página de registro

**Fase 4 - Testing**

- ✅ Probar login con credenciales válidas
- ✅ Probar login con credenciales inválidas
- ✅ Verificar mensajes de error apropiados
- ✅ Comprobar persistencia de sesión

**Fase 5 - Deploy y Configuración**

- ✅ Verificar autenticación en producción
- ✅ Configurar timeout de sesión
</details>

---

#### **HU-004: Selección de Rol**

**Como** Nuevo Usuario, **quiero** elegir mi rol (Principiante o Experto) después del registro, **para** personalizar mi experiencia en la plataforma.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir roles: Novice (principiante) y Expert (experto)
- ✅ Diseñar página de selección con 2 cards atractivas
- ✅ Especificar permisos por rol
- ✅ Definir flujo: registro → role-selection → home

**Fase 2 - Desarrollo Backend**

- ✅ Crear tabla `roles` (id, name)
- ✅ Crear tabla `user_roles` (profile_id, role_id) con relación many-to-many
- ✅ Insertar roles iniciales: 'novice' y 'expert'
- ✅ Actualizar trigger para asignar rol 'novice' automáticamente

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `RoleSelectionPage.tsx` con diseño de cards
- ✅ Implementar función `handleRoleSelection()`
- ✅ Agregar lógica: Principiante → no hace nada (ya tiene rol)
- ✅ Agregar lógica: Experto → INSERT en user_roles
- ✅ Actualizar `AuthCallbackPage.tsx` para detectar primer login
- ✅ Implementar verificación de cantidad de roles (≤1 → role-selection)
- ✅ Agregar iconos `GiFlowerPot` y `HiSparkles`
- ✅ Diseñar cards con animaciones hover

**Fase 4 - Testing**

- ✅ Probar selección de Principiante (verificar que no agregue rol extra)
- ✅ Probar selección de Experto (verificar INSERT en user_roles)
- ✅ Verificar que no se muestre role-selection en logins posteriores
- ✅ Probar con Google Auth y email/password

**Fase 5 - Deploy y Configuración**

- ✅ Verificar roles en BD de producción
- ✅ Probar flujo completo en producción
</details>

---

#### **HU-005: Cerrar Sesión**

**Como** Usuario Autenticado, **quiero** tener un botón de "Cerrar Sesión", **para** proteger mi cuenta en dispositivos compartidos.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir ubicación del botón (dropdown menu en Header)
- ✅ Diseñar flujo de logout (cerrar sesión → redirigir a home)

**Fase 2 - Desarrollo Backend**

- ✅ Implementar función `signOut()` de Supabase

**Fase 3 - Desarrollo Frontend**

- ✅ Agregar función `signOut()` en `supabase.ts`
- ✅ Crear botón "Cerrar Sesión" en dropdown de `Header.tsx`
- ✅ Implementar redirección a home tras logout
- ✅ Limpiar estado de autenticación

**Fase 4 - Testing**

- ✅ Probar logout desde cualquier página
- ✅ Verificar limpieza de sesión
- ✅ Comprobar que no se pueda acceder a rutas protegidas tras logout

**Fase 5 - Deploy y Configuración**

- ✅ Verificar funcionamiento en producción
</details>

---

#### **HU-006: Editar Perfil Básico**

**Como** Usuario, **quiero** poder acceder a "Mi Perfil" para editar mi nombre, foto y ver mis roles asignados.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir campos editables (full_name, avatar_url)
- ✅ Diseñar página de perfil con badges de roles
- ✅ Especificar formato de avatar (URL o subida de archivo)

**Fase 2 - Desarrollo Backend**

- ✅ Asegurar campos en tabla `profiles` (full_name, avatar_url)
- ✅ Configurar RLS para permitir actualización de propio perfil
- ✅ Crear query para obtener roles del usuario

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `ProfilePage.tsx` con formulario de edición
- ✅ Implementar función de actualización de perfil
- ✅ Mostrar badges de roles (Principiante/Experto)
- ✅ Agregar campo de avatar URL
- ✅ Implementar validaciones
- ✅ Agregar mensajes de éxito/error

**Fase 4 - Testing**

- ✅ Probar edición de nombre
- ✅ Probar actualización de avatar
- ✅ Verificar visualización correcta de roles
- ✅ Probar validaciones de formulario

**Fase 5 - Deploy y Configuración**

- ✅ Verificar actualización de perfil en producción
</details>

---

### 🏠 Épica: Landing Page y Navegación

#### **HU-007: Landing Page Clara**

**Como** Visitante, **quiero** ver una landing page atractiva que explique las funcionalidades y propósito de la aplicación, **para** saber si se ajusta a mis necesidades.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir secciones: Hero, Features, Testimonials, CTA
- ✅ Diseñar mockups de cada sección
- ✅ Especificar contenido y copy de textos
- ✅ Definir CTAs principales (Comenzar, Ver Tutoriales)

**Fase 2 - Desarrollo Backend**

- N/A (contenido estático)

**Fase 3 - Desarrollo Frontend**

- ✅ Crear módulo `features/home/`
- ✅ Crear `HeroSection.tsx` con gradiente y CTAs
- ✅ Crear `FeaturesSection.tsx` con 4 features cards
- ✅ Crear `TestimonialsSection.tsx` con 3 testimonios
- ✅ Crear `CTASection.tsx` con llamada a acción final
- ✅ Integrar todo en `HomePage.tsx`
- ✅ Agregar logo de EcoBeauty
- ✅ Implementar diseño responsive

**Fase 4 - Testing**

- ✅ Verificar responsive en móvil/tablet/desktop
- ✅ Probar todos los enlaces y CTAs
- ✅ Verificar carga de imágenes

**Fase 5 - Deploy y Configuración**

- ✅ Subir logo a carpeta `public/`
- ✅ Optimizar imágenes para producción
</details>

---

#### **HU-008: Navegación Principal**

**Como** Usuario, **quiero** tener un header con navegación a todas las secciones principales (Comunidad, Tutoriales, Cursos, Expertos), **para** acceder fácilmente a cualquier módulo.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir estructura del header (logo, links, dropdown usuario)
- ✅ Diseñar header responsive con hamburger menu
- ✅ Especificar rutas de navegación

**Fase 2 - Desarrollo Backend**

- N/A

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `Header.tsx` en `shared/components/`
- ✅ Integrar logo de EcoBeauty
- ✅ Agregar links de navegación (Home, Comunidad, Tutoriales, Cursos, Expertos)
- ✅ Implementar dropdown de usuario autenticado
- ✅ Agregar botones Login/Register para visitantes
- ✅ Crear `Footer.tsx` con 4 columnas
- ✅ Integrar Header/Footer en `App.tsx`
- ✅ Ocultar Header/Footer en `/auth/callback` y `/role-selection`

**Fase 4 - Testing**

- ✅ Probar navegación en todas las rutas
- ✅ Verificar dropdown de usuario
- ✅ Probar responsive (menú hamburguesa)

**Fase 5 - Deploy y Configuración**

- ✅ Verificar rutas en producción
</details>

---

### 📚 Épica: Tutoriales Gratuitos

#### **HU-009: Ver Lista de Tutoriales**

**Como** Principiante, **quiero** ver una lista de tutoriales **para** poder descubrir temas de mi interés.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir estructura de tarjeta de tutorial (imagen, título, autor, likes)
- ✅ Diseñar layout grid responsive
- ✅ Especificar ordenamiento (más recientes primero)

**Fase 2 - Desarrollo Backend**

- ✅ Crear tabla `tutorials` (title, description, youtube_url, thumbnail_url, author_id)
- ✅ Crear tabla `tutorial_likes` (tutorial_id, profile_id)
- ✅ Configurar RLS para lectura pública
- ✅ Crear query con COUNT de likes

**Fase 3 - Desarrollo Frontend**

- ✅ Crear módulo `features/tutorials/`
- ✅ Crear `TutorialCard.tsx` con imagen, título, autor, likes
- ✅ Crear `TutorialsListPage.tsx` con grid de tutoriales
- ✅ Implementar servicio `getTutorials()` en `tutorialsService.ts`
- ✅ Agregar estados de carga y vacío

**Fase 4 - Testing**

- ✅ Probar carga de tutoriales
- ✅ Verificar responsive del grid
- ✅ Probar con lista vacía

**Fase 5 - Deploy y Configuración**

- ✅ Insertar datos de prueba en producción
</details>

---

#### **HU-010: Reproducir Tutorial**

**Como** Principiante, **quiero** reproducir el contenido de un tutorial (video de YouTube) **para** poder aprender a crear productos.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir layout de página de detalle (video, título, descripción, comentarios)
- ✅ Especificar integración con YouTube Embed

**Fase 2 - Desarrollo Backend**

- ✅ Asegurar campo `youtube_url` en tabla `tutorials`

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `TutorialDetailPage.tsx`
- ✅ Crear componente `YouTubeEmbed.tsx` para embeber videos
- ✅ Implementar función para extraer video ID de URL de YouTube
- ✅ Mostrar información del tutorial
- ✅ Integrar sistema de comentarios

**Fase 4 - Testing**

- ✅ Probar reproducción de videos de YouTube
- ✅ Verificar diferentes formatos de URL (youtube.com, youtu.be)
- ✅ Probar responsive del player

**Fase 5 - Deploy y Configuración**

- ✅ Verificar reproducción en producción
</details>

---

#### **HU-011: Comentar en Tutorial**

**Como** Principiante, **quiero** dejar comentarios en un tutorial **para** poder dar mi opinión y resolver dudas.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir estructura de comentarios (texto, autor, fecha)
- ✅ Diseñar formulario de comentario
- ✅ Especificar validaciones (min 1 carácter, max 500)

**Fase 2 - Desarrollo Backend**

- ✅ Crear tabla `tutorial_comments` (tutorial_id, profile_id, content, parent_id)
- ✅ Configurar RLS (autenticados pueden crear, todos pueden leer)
- ✅ Crear query con JOIN a profiles para obtener autor

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `TutorialComments.tsx` para listar comentarios
- ✅ Implementar formulario de nuevo comentario
- ✅ Integrar con `tutorialsService.ts`
- ✅ Agregar validación de longitud
- ✅ Mostrar avatar y nombre de autor
- ✅ Agregar formato de fecha relativa (hace 2 días)

**Fase 4 - Testing**

- ✅ Probar creación de comentarios
- ✅ Verificar que solo usuarios autenticados puedan comentar
- ✅ Probar validaciones
- ✅ Verificar actualización en tiempo real

**Fase 5 - Deploy y Configuración**

- ✅ Verificar comentarios en producción
</details>

---

#### **HU-012: Responder Comentarios**

**Como** Usuario, **quiero** responder a comentarios de otros usuarios en tutoriales, **para** crear conversaciones y ayudar a la comunidad.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Diseñar sistema de respuestas anidadas (indentación visual)
- ✅ Definir botón "Responder" en cada comentario

**Fase 2 - Desarrollo Backend**

- ✅ Utilizar campo `parent_id` en `tutorial_comments`
- ✅ Crear query recursiva para obtener respuestas

**Fase 3 - Desarrollo Frontend**

- ✅ Agregar botón "Responder" en cada comentario
- ✅ Implementar formulario inline de respuesta
- ✅ Mostrar respuestas con indentación
- ✅ Implementar colapsar/expandir respuestas

**Fase 4 - Testing**

- ✅ Probar respuestas a comentarios
- ✅ Verificar indentación visual
- ✅ Probar múltiples niveles de anidación

**Fase 5 - Deploy y Configuración**

- ✅ Verificar respuestas anidadas en producción
</details>

---

#### **HU-013: Dar Like a Tutoriales**

**Como** Usuario, **quiero** dar like a tutoriales que me gusten, **para** guardar mis favoritos y mostrar aprecio al creador.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir comportamiento de botón like (toggle on/off)
- ✅ Diseñar iconografía (corazón filled/outline)

**Fase 2 - Desarrollo Backend**

- ✅ Usar tabla `tutorial_likes` (tutorial_id, profile_id)
- ✅ Configurar RLS para permitir INSERT/DELETE solo del propio like
- ✅ Agregar constraint UNIQUE para evitar likes duplicados

**Fase 3 - Desarrollo Frontend**

- ✅ Agregar botón de like en `TutorialCard.tsx` y `TutorialDetailPage.tsx`
- ✅ Implementar funciones `likeTutorial()` y `unlikeTutorial()`
- ✅ Mostrar contador de likes
- ✅ Indicar visualmente si usuario ya dio like
- ✅ Agregar animación al dar like

**Fase 4 - Testing**

- ✅ Probar dar/quitar like
- ✅ Verificar actualización de contador
- ✅ Probar que solo usuarios autenticados puedan dar like

**Fase 5 - Deploy y Configuración**

- ✅ Verificar likes en producción
</details>

---

#### **HU-014: Crear Tutorial (Experto)**

**Como** Experto, **quiero** crear tutoriales gratuitos con título, descripción, imagen y video de YouTube, **para** compartir mi conocimiento con la comunidad.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir campos del formulario (título, descripción, URL de YouTube, imagen)
- ✅ Diseñar página de creación
- ✅ Especificar validaciones

**Fase 2 - Desarrollo Backend**

- ✅ Configurar RLS para permitir INSERT solo a expertos
- ✅ Crear función para verificar rol de experto

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `CreateTutorialPage.tsx` (solo para expertos)
- ✅ Crear `TutorialForm.tsx` con todos los campos
- ✅ Implementar `ExpertRoute.tsx` para proteger ruta
- ✅ Agregar validaciones (URL de YouTube válida)
- ✅ Implementar función `createTutorial()` en servicio
- ✅ Agregar preview de video

**Fase 4 - Testing**

- ✅ Probar creación de tutorial como experto
- ✅ Verificar que principiantes no puedan acceder
- ✅ Probar validaciones
- ✅ Verificar inserción en BD

**Fase 5 - Deploy y Configuración**

- ✅ Verificar permisos en producción
</details>

---

#### **HU-015: Gestionar Mis Tutoriales**

**Como** Experto, **quiero** ver una lista de los tutoriales que he creado y poder editarlos o eliminarlos, **para** mantener mi contenido actualizado.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Diseñar página de gestión con lista de tutoriales propios
- ✅ Definir acciones: editar, eliminar

**Fase 2 - Desarrollo Backend**

- ✅ Crear query para obtener tutoriales del usuario autenticado
- ✅ Configurar RLS para permitir UPDATE/DELETE solo del propio contenido

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `MyCreatedTutorialsPage.tsx`
- ✅ Mostrar lista de tutoriales con botones de acción
- ✅ Implementar función de edición (reutilizar `TutorialForm.tsx`)
- ✅ Implementar función de eliminación con confirmación
- ✅ Agregar estadísticas (views, likes)

**Fase 4 - Testing**

- ✅ Probar edición de tutorial
- ✅ Probar eliminación con confirmación
- ✅ Verificar que solo se vean tutoriales propios

**Fase 5 - Deploy y Configuración**

- ✅ Verificar gestión en producción
</details>

---

### 🎓 Épica: Cursos de Pago

#### **HU-016: Explorar Catálogo de Cursos**

**Como** Principiante, **quiero** explorar un catálogo de cursos con filtros (gratis/pago, nivel), **para** poder evaluar opciones de aprendizaje avanzado.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir filtros del catálogo (precio: gratis/pago, nivel: principiante/intermedio/avanzado)
- ✅ Diseñar layout de grid de cursos con cards
- ✅ Especificar información visible en cards (imagen, título, precio, instructor)

**Fase 2 - Desarrollo Backend**

- ✅ Crear tabla `courses` (title, description, price, level, status, image_url, instructor_id)
- ✅ Configurar RLS para lectura pública de cursos publicados
- ✅ Crear query con filtros dinámicos

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `CourseCatalogPage.tsx` con sistema de filtros
- ✅ Crear `CourseCard.tsx` mostrando información del curso
- ✅ Implementar servicio `getCourses()` con parámetros de filtro
- ✅ Agregar estados de carga y lista vacía

**Fase 4 - Testing**

- ✅ Probar filtros individualmente y combinados
- ✅ Verificar responsive del grid
- ✅ Probar con diferentes combinaciones de datos

**Fase 5 - Deploy y Configuración**

- ✅ Insertar cursos de prueba en producción
</details>

---

#### **HU-017: Ver Detalles del Curso**

**Como** Principiante, **quiero** ver información detallada de un curso (descripción, lecciones, precio, instructor), **para** decidir si me interesa comprarlo.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Diseñar página de detalle con secciones (info, lecciones, instructor)
- ✅ Especificar información a mostrar (descripción completa, lista de lecciones, perfil de experto)

**Fase 2 - Desarrollo Backend**

- ✅ Crear tabla `lessons` (course_id, title, description, video_url, order)
- ✅ Crear query que incluya lecciones y datos del instructor

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `CourseDetailPage.tsx` con toda la información
- ✅ Mostrar lista de lecciones con títulos y duraciones
- ✅ Agregar botón de inscripción/compra
- ✅ Mostrar información del instructor con avatar

**Fase 4 - Testing**

- ✅ Probar visualización de cursos gratuitos y de pago
- ✅ Verificar carga correcta de lecciones
- ✅ Probar con cursos sin lecciones

**Fase 5 - Deploy y Configuración**

- ✅ Verificar carga de imágenes en producción
</details>

---

#### **HU-018: Inscribirse a Curso Gratuito**

**Como** Principiante, **quiero** inscribirme gratuitamente a cursos sin costo, **para** acceder inmediatamente a su contenido.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir flujo de inscripción (click botón → registro → acceso a lecciones)
- ✅ Especificar validación: solo usuarios autenticados

**Fase 2 - Desarrollo Backend**

- ✅ Crear tabla `course_enrollments` (course_id, profile_id, enrolled_at)
- ✅ Configurar RLS para INSERT solo de usuarios autenticados
- ✅ Agregar constraint UNIQUE para evitar inscripciones duplicadas

**Fase 3 - Desarrollo Frontend**

- ✅ Agregar botón "Inscribirse Gratis" en `CourseDetailPage.tsx`
- ✅ Implementar función `enrollInCourse()` en servicio
- ✅ Mostrar botón "Ver Lecciones" si ya está inscrito
- ✅ Agregar redirección a login si no está autenticado

**Fase 4 - Testing**

- ✅ Probar inscripción como usuario autenticado
- ✅ Verificar redirección a login si no está autenticado
- ✅ Probar intento de inscripción duplicada

**Fase 5 - Deploy y Configuración**

- ✅ Verificar inscripciones en producción
</details>

---

#### **HU-019: Ver Mis Cursos Inscritos**

**Como** Principiante, **quiero** ver una lista de todos los cursos en los que estoy inscrito, **para** acceder rápidamente a continuar mi aprendizaje.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Diseñar página con grid de cursos inscritos
- ✅ Especificar información a mostrar (progreso, última lección vista)

**Fase 2 - Desarrollo Backend**

- ✅ Crear query que filtre cursos por enrollments del usuario
- ✅ Configurar RLS para lectura solo de propias inscripciones

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `MyCoursesPage.tsx` (ruta protegida)
- ✅ Reutilizar `CourseCard.tsx` con badge "Inscrito"
- ✅ Implementar servicio `getEnrolledCourses()`
- ✅ Agregar mensaje si no tiene cursos inscritos

**Fase 4 - Testing**

- ✅ Verificar que solo se muestren cursos propios
- ✅ Probar acceso directo a lecciones
- ✅ Verificar protección de ruta (solo usuarios autenticados)

**Fase 5 - Deploy y Configuración**

- ✅ Verificar permisos en producción
</details>

---

#### **HU-020: Acceder a Lecciones**

**Como** Principiante inscrito, **quiero** ver y reproducir las lecciones de un curso (videos y contenido), **para** completar mi aprendizaje.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Diseñar página con video player y lista de lecciones lateral
- ✅ Especificar navegación entre lecciones

**Fase 2 - Desarrollo Backend**

- ✅ Crear query para verificar inscripción antes de mostrar contenido
- ✅ Configurar RLS para acceso solo a lecciones de cursos inscritos

**Fase 3 - Desarrollo Frontend**

- ✅ Actualizar `CourseDetailPage.tsx` para mostrar lecciones completas si está inscrito
- ✅ Crear `LessonCard.tsx` para cada lección
- ✅ Integrar `YouTubeEmbed.tsx` para reproducir videos
- ✅ Agregar navegación anterior/siguiente lección

**Fase 4 - Testing**

- ✅ Verificar acceso solo a cursos inscritos
- ✅ Probar reproducción de videos
- ✅ Verificar navegación entre lecciones

**Fase 5 - Deploy y Configuración**

- ✅ Verificar permisos de acceso en producción
</details>

---

#### **HU-021: Crear Curso (Experto)**

**Como** Experto, **quiero** crear un curso completo con título, descripción, nivel, precio e imagen, **para** compartir contenido premium.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir campos del formulario (título, descripción, nivel, precio, imagen)
- ✅ Diseñar página de creación con vista previa
- ✅ Especificar validaciones (precio ≥ 0, campos requeridos)

**Fase 2 - Desarrollo Backend**

- ✅ Configurar RLS para INSERT solo de expertos
- ✅ Agregar campo `instructor_id` con FK a profiles

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `CreateCoursePage.tsx` (solo expertos)
- ✅ Crear `CourseForm.tsx` con todos los campos
- ✅ Implementar protección con `ExpertRoute.tsx`
- ✅ Agregar validaciones de formulario
- ✅ Implementar función `createCourse()` en servicio

**Fase 4 - Testing**

- ✅ Probar creación como experto
- ✅ Verificar que principiantes no puedan acceder
- ✅ Probar validaciones de formulario

**Fase 5 - Deploy y Configuración**

- ✅ Verificar permisos por rol en producción
</details>

---

#### **HU-022: Gestionar Lecciones**

**Como** Experto, **quiero** agregar, editar y eliminar lecciones dentro de mis cursos (título, descripción, video, orden), **para** construir una experiencia de aprendizaje completa.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Diseñar interfaz de gestión con lista de lecciones y formulario
- ✅ Especificar funcionalidad de drag-and-drop para reordenar

**Fase 2 - Desarrollo Backend**

- ✅ Configurar RLS para CRUD de lecciones solo del propio curso
- ✅ Crear función para actualizar orden de lecciones

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `ManageCoursePage.tsx` con tabs (info, lecciones)
- ✅ Crear `LessonForm.tsx` para agregar/editar lecciones
- ✅ Implementar lista de lecciones con botones editar/eliminar
- ✅ Agregar reordenamiento por botones arriba/abajo
- ✅ Implementar funciones CRUD en servicio

**Fase 4 - Testing**

- ✅ Probar creación, edición y eliminación de lecciones
- ✅ Verificar reordenamiento
- ✅ Probar con múltiples lecciones

**Fase 5 - Deploy y Configuración**

- ✅ Verificar gestión de lecciones en producción
</details>

---

#### **HU-023: Publicar/Despublicar Curso**

**Como** Experto, **quiero** cambiar el estado de mis cursos (borrador/publicado), **para** controlar cuándo están disponibles en el catálogo.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir estados: 'draft' (borrador) y 'published' (publicado)
- ✅ Especificar validación: curso debe tener al menos 1 lección para publicarse

**Fase 2 - Desarrollo Backend**

- ✅ Agregar campo `status` a tabla `courses` (enum: draft, published)
- ✅ Modificar query de catálogo para mostrar solo cursos publicados

**Fase 3 - Desarrollo Frontend**

- ✅ Agregar toggle de estado en `ManageCoursePage.tsx`
- ✅ Mostrar badges de estado (Borrador/Publicado) con colores distintivos
- ✅ Implementar función `updateCourseStatus()` en servicio
- ✅ Agregar confirmación antes de cambiar estado

**Fase 4 - Testing**

- ✅ Probar publicación de curso con lecciones
- ✅ Verificar que cursos borradores no aparezcan en catálogo
- ✅ Probar despublicación

**Fase 5 - Deploy y Configuración**

- ✅ Verificar visibilidad de cursos según estado en producción
</details>

---

#### **HU-024: Ver Mis Cursos Creados**

**Como** Experto, **quiero** ver una lista de todos los cursos que he creado con sus estadísticas (inscritos, estado), **para** gestionar mi contenido.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Diseñar página con grid de cursos propios
- ✅ Especificar estadísticas a mostrar (número de inscritos, estado, fecha de creación)

**Fase 2 - Desarrollo Backend**

- ✅ Crear query que filtre cursos por instructor_id
- ✅ Agregar COUNT de enrollments por curso

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `MyCreatedCoursesPage.tsx` (solo expertos)
- ✅ Reutilizar `CourseCard.tsx` con estadísticas adicionales
- ✅ Agregar botones "Gestionar" y "Ver en Catálogo"
- ✅ Implementar servicio `getInstructorCourses()`

**Fase 4 - Testing**

- ✅ Verificar que solo se muestren cursos propios
- ✅ Probar estadísticas de inscritos
- ✅ Verificar acceso a gestión

**Fase 5 - Deploy y Configuración**

- ✅ Verificar visualización de cursos propios en producción
</details>

---

### 👥 Épica: Comunidad y Publicaciones

#### **HU-025: Ver Feed de Comunidad**

**Como** Usuario, **quiero** ver un feed de publicaciones de la comunidad ordenadas por reciente o popularidad, **para** mantenerme informado y participar.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir layout del feed (lista vertical de posts)
- ✅ Especificar filtros de ordenamiento (más recientes, más populares)
- ✅ Diseñar tarjeta de post (autor, contenido, imagen, likes, comentarios)

**Fase 2 - Desarrollo Backend**

- ✅ Crear tabla `posts` (author_id, content, image_url, created_at)
- ✅ Crear tabla `post_likes` (post_id, profile_id)
- ✅ Crear query con COUNT de likes y comentarios
- ✅ Configurar RLS para lectura pública

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `CommunityFeedPage.tsx` con feed de publicaciones
- ✅ Crear `PostCard.tsx` mostrando contenido, autor, likes, comentarios
- ✅ Implementar selector de ordenamiento (reciente/popular)
- ✅ Agregar infinite scroll o paginación
- ✅ Implementar servicio `getPosts()` con parámetro de ordenamiento

**Fase 4 - Testing**

- ✅ Probar ordenamiento por reciente y popular
- ✅ Verificar carga de imágenes
- ✅ Probar con lista vacía y con muchos posts

**Fase 5 - Deploy y Configuración**

- ✅ Insertar posts de prueba en producción
</details>

---

#### **HU-026: Crear Publicación**

**Como** Usuario, **quiero** crear publicaciones con texto e imagen, **para** compartir mis dudas, creaciones o experiencias con la comunidad.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Diseñar formulario de creación (textarea para contenido, input para imagen)
- ✅ Especificar validaciones (contenido min 10 caracteres, imagen opcional)

**Fase 2 - Desarrollo Backend**

- ✅ Configurar RLS para INSERT solo de usuarios autenticados
- ✅ Configurar Supabase Storage para imágenes de posts

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `CreatePostPage.tsx` (ruta protegida)
- ✅ Crear `PostForm.tsx` con textarea y upload de imagen
- ✅ Implementar preview de imagen antes de subir
- ✅ Agregar validaciones de formulario
- ✅ Implementar función `createPost()` con subida de imagen

**Fase 4 - Testing**

- ✅ Probar creación de post con y sin imagen
- ✅ Verificar validaciones
- ✅ Probar subida de diferentes formatos de imagen

**Fase 5 - Deploy y Configuración**

- ✅ Configurar bucket de Storage en Supabase
- ✅ Verificar subida de imágenes en producción
</details>

---

#### **HU-027: Comentar en Publicaciones**

**Como** Usuario, **quiero** comentar en publicaciones de otros miembros, **para** interactuar y ayudar.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Diseñar sección de comentarios debajo de cada post
- ✅ Especificar formato de comentario (texto simple, autor, fecha)

**Fase 2 - Desarrollo Backend**

- ✅ Crear tabla `post_comments` (post_id, profile_id, content, created_at)
- ✅ Configurar RLS para lectura pública y creación autenticada
- ✅ Crear query con JOIN a profiles para obtener autor

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `CommentForm.tsx` para agregar comentarios
- ✅ Crear `CommentItem.tsx` para mostrar cada comentario
- ✅ Integrar en `PostDetailPage.tsx`
- ✅ Implementar función `addComment()` en servicio
- ✅ Agregar contador de comentarios en `PostCard.tsx`

**Fase 4 - Testing**

- ✅ Probar creación de comentarios
- ✅ Verificar que solo usuarios autenticados puedan comentar
- ✅ Probar visualización de comentarios

**Fase 5 - Deploy y Configuración**

- ✅ Verificar comentarios en producción
</details>

---

#### **HU-028: Dar Like a Publicaciones**

**Como** Usuario, **quiero** dar like a publicaciones que me gusten, **para** mostrar aprecio y aumentar su visibilidad.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir comportamiento de botón like (toggle on/off)
- ✅ Diseñar iconografía (corazón filled/outline)

**Fase 2 - Desarrollo Backend**

- ✅ Usar tabla `post_likes` (post_id, profile_id)
- ✅ Configurar RLS para INSERT/DELETE solo del propio like
- ✅ Agregar constraint UNIQUE para evitar likes duplicados

**Fase 3 - Desarrollo Frontend**

- ✅ Agregar botón de like en `PostCard.tsx` y `PostDetailPage.tsx`
- ✅ Implementar funciones `likePost()` y `unlikePost()`
- ✅ Mostrar contador de likes actualizado
- ✅ Indicar visualmente si usuario ya dio like
- ✅ Agregar animación al dar like

**Fase 4 - Testing**

- ✅ Probar dar/quitar like
- ✅ Verificar actualización de contador
- ✅ Probar que solo usuarios autenticados puedan dar like

**Fase 5 - Deploy y Configuración**

- ✅ Verificar likes en producción
</details>

---

#### **HU-029: Dar Like a Comentarios**

**Como** Usuario, **quiero** dar like a comentarios útiles o interesantes, **para** destacar las mejores respuestas.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir comportamiento similar a likes de posts
- ✅ Diseñar icono de like pequeño junto a cada comentario

**Fase 2 - Desarrollo Backend**

- ✅ Crear tabla `comment_likes` (comment_id, profile_id)
- ✅ Configurar RLS similar a post_likes

**Fase 3 - Desarrollo Frontend**

- ✅ Agregar botón de like en `CommentItem.tsx`
- ✅ Implementar funciones `likeComment()` y `unlikeComment()`
- ✅ Mostrar contador de likes por comentario
- ✅ Reutilizar lógica de toggle

**Fase 4 - Testing**

- ✅ Probar likes en múltiples comentarios
- ✅ Verificar independencia de likes de posts y comentarios

**Fase 5 - Deploy y Configuración**

- ✅ Verificar likes de comentarios en producción
</details>

---

#### **HU-030: Ver Detalles de Publicación**

**Como** Usuario, **quiero** ver una publicación completa con todos sus comentarios, **para** seguir conversaciones específicas.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Diseñar página de detalle con post completo y lista de comentarios
- ✅ Especificar navegación desde feed (click en post o "ver comentarios")

**Fase 2 - Desarrollo Backend**

- ✅ Crear query que obtenga post con todos sus comentarios
- ✅ Incluir datos de autor de post y autores de comentarios

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `PostDetailPage.tsx` mostrando post completo
- ✅ Integrar lista completa de comentarios
- ✅ Agregar formulario de comentario en la misma página
- ✅ Implementar navegación de regreso al feed

**Fase 4 - Testing**

- ✅ Probar visualización de post con muchos comentarios
- ✅ Verificar scroll y rendimiento
- ✅ Probar agregar comentario desde página de detalle

**Fase 5 - Deploy y Configuración**

- ✅ Verificar carga de posts con muchos comentarios en producción
</details>

---

### 🌟 Épica: Perfiles de Expertos

#### **HU-031: Ver Directorio de Expertos**

**Como** Principiante, **quiero** ver una lista de perfiles de expertos con sus especialidades y tarifas, **para** poder encontrar al profesional que necesito.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Diseñar grid de cards de expertos
- ✅ Especificar información visible (avatar, nombre, especialidades, tarifa)
- ✅ Definir filtros opcionales (por especialidad)

**Fase 2 - Desarrollo Backend**

- ✅ Crear tabla `expert_profiles` (profile_id, bio, specialties, hourly_rate, avatar_url, banner_url)
- ✅ Configurar RLS para lectura pública de perfiles de expertos
- ✅ Crear query que filtre solo usuarios con rol 'expert'

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `ExpertsDirectoryPage.tsx` con grid de expertos
- ✅ Crear `ExpertCard.tsx` mostrando información básica
- ✅ Implementar servicio `getExperts()` con filtros
- ✅ Agregar búsqueda por nombre o especialidad

**Fase 4 - Testing**

- ✅ Probar visualización de expertos
- ✅ Verificar filtros de búsqueda
- ✅ Probar con diferentes tarifas y especialidades

**Fase 5 - Deploy y Configuración**

- ✅ Insertar perfiles de expertos de prueba
</details>

---

#### **HU-032: Ver Perfil Completo de Experto**

**Como** Principiante, **quiero** ver el perfil detallado de un experto (biografía, especialidades, tarifas, contacto), **para** conocer sus credenciales antes de contactarlo.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Diseñar página de perfil con banner, avatar, bio y especialidades
- ✅ Especificar secciones (sobre mí, especialidades, tarifas, contacto)

**Fase 2 - Desarrollo Backend**

- ✅ Crear query que obtenga perfil completo con datos de usuario
- ✅ Incluir cursos y tutoriales del experto

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `ExpertProfilePage.tsx` mostrando información completa
- ✅ Mostrar banner y avatar
- ✅ Listar especialidades con badges
- ✅ Mostrar tarifa por hora destacada
- ✅ Agregar botón de contacto por WhatsApp

**Fase 4 - Testing**

- ✅ Probar visualización de perfiles completos
- ✅ Verificar carga de imágenes (avatar, banner)
- ✅ Probar con perfiles con y sin información completa

**Fase 5 - Deploy y Configuración**

- ✅ Verificar perfiles en producción
</details>

---

#### **HU-033: Contactar Experto por WhatsApp**

**Como** Principiante, **quiero** contactar a un experto directamente a través de WhatsApp desde su perfil, **para** solicitar sus servicios personalizados.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Definir comportamiento del botón (abrir WhatsApp con mensaje pre-escrito)
- ✅ Especificar mensaje predeterminado

**Fase 2 - Desarrollo Backend**

- ✅ Agregar campo `whatsapp_number` a tabla `expert_profiles`

**Fase 3 - Desarrollo Frontend**

- ✅ Agregar botón de WhatsApp en `ExpertProfilePage.tsx`
- ✅ Implementar función que genere URL de WhatsApp Web/App
- ✅ Agregar mensaje predeterminado con nombre del experto
- ✅ Usar icono de WhatsApp (react-icons)

**Fase 4 - Testing**

- ✅ Probar apertura de WhatsApp en dispositivos móviles
- ✅ Probar en desktop (WhatsApp Web)
- ✅ Verificar mensaje predeterminado

**Fase 5 - Deploy y Configuración**

- ✅ Verificar links de WhatsApp en producción
</details>

---

#### **HU-034: Crear/Editar Perfil de Experto**

**Como** Experto, **quiero** crear y editar mi perfil profesional (biografía, especialidades, tarifa por hora, redes sociales, fotos), **para** ofrecer mis servicios a la comunidad.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Diseñar formulario con todos los campos editables
- ✅ Especificar validaciones (bio max 500 caracteres, tarifa > 0)
- ✅ Definir campos: bio, specialties (array), hourly_rate, whatsapp, social_links

**Fase 2 - Desarrollo Backend**

- ✅ Configurar RLS para UPDATE solo del propio perfil de experto
- ✅ Validar que usuario tenga rol 'expert'

**Fase 3 - Desarrollo Frontend**

- ✅ Crear `EditExpertProfilePage.tsx` (solo expertos)
- ✅ Crear `ExpertProfileForm.tsx` con todos los campos
- ✅ Implementar textarea para biografía
- ✅ Agregar campo de especialidades (tags/chips)
- ✅ Agregar inputs para redes sociales (Instagram, Facebook, WhatsApp)
- ✅ Implementar función `updateExpertProfile()` en servicio

**Fase 4 - Testing**

- ✅ Probar creación de perfil por primera vez
- ✅ Probar edición de perfil existente
- ✅ Verificar validaciones de formulario
- ✅ Probar que solo expertos puedan acceder

**Fase 5 - Deploy y Configuración**

- ✅ Verificar permisos en producción
</details>

---

#### **HU-035: Subir Avatar y Banner**

**Como** Experto, **quiero** subir imágenes personalizadas para mi avatar y banner de perfil, **para** tener una presencia profesional y atractiva.

**Estado:** ✅ Implementado

<details>
<summary><b>📋 Tareas por Fase</b></summary>

**Fase 1 - Análisis y Diseño**

- ✅ Diseñar UI de upload con preview
- ✅ Especificar formatos aceptados (jpg, png, webp)
- ✅ Definir tamaños máximos (avatar: 2MB, banner: 5MB)

**Fase 2 - Desarrollo Backend**

- ✅ Configurar buckets en Supabase Storage (avatars, banners)
- ✅ Configurar políticas de Storage para upload solo de propias imágenes
- ✅ Implementar eliminación de imagen anterior al subir nueva

**Fase 3 - Desarrollo Frontend**

- ✅ Agregar inputs de tipo file para avatar y banner en formulario
- ✅ Implementar preview de imágenes antes de subir
- ✅ Agregar validaciones de tamaño y formato
- ✅ Implementar funciones `uploadAvatar()` y `uploadBanner()` en servicio
- ✅ Mostrar progress bar durante subida
- ✅ Actualizar URLs en `expert_profiles` tras subida exitosa

**Fase 4 - Testing**

- ✅ Probar subida de diferentes formatos de imagen
- ✅ Verificar validaciones de tamaño
- ✅ Probar reemplazo de imágenes existentes
- ✅ Verificar visualización inmediata tras subida

**Fase 5 - Deploy y Configuración**

- ✅ Configurar buckets de Storage en Supabase
- ✅ Verificar políticas de acceso público a imágenes
- ✅ Probar subida de imágenes en producción
</details>

---

## 🎯 Resumen de Implementación por Fases

### Fase 1 - Análisis y Diseño

**Completado:** 100% (35/35 HU)

- Definición de requisitos funcionales
- Diseño de mockups y wireframes
- Especificación de flujos de usuario
- Definición de esquemas de BD

### Fase 2 - Desarrollo Backend

**Completado:** 100% (35/35 HU)

- Configuración de Supabase (Auth, PostgreSQL, Storage)
- Creación de 15+ tablas con relaciones
- Implementación de RLS (Row Level Security)
- Triggers y funciones PostgreSQL
- Configuración de Google OAuth

### Fase 3 - Desarrollo Frontend

**Completado:** 100% (35/35 HU)

- 7 módulos principales (Home, Community, Tutorials, Courses, Experts, Security, Shared)
- 50+ componentes React
- Sistema de temas centralizado (CSS variables)
- Integración completa con Supabase
- Routing con React Router DOM

### Fase 4 - Testing

**Completado:** 100% (35/35 HU)

- Testing manual de todos los flujos
- Validación de permisos por rol
- Pruebas de responsive design
- Validación de formularios
- Testing de integración con Supabase

### Fase 5 - Deploy y Configuración

**Completado:** 100% (35/35 HU)

- Configuración de variables de entorno
- Deploy de base de datos en Supabase
- Configuración de Storage y Auth
- Optimización de assets
- Configuración de URLs de producción

---

### 🔐 Épica: Gestión de Cuentas y Autenticación

| ID         | Historia de Usuario           | Descripción                                                                                                                                | Estado          |
| ---------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| **HU-001** | **Registro de Nuevo Usuario** | Como Visitante, quiero poder registrarme usando mi correo electrónico y una contraseña, para crear mi cuenta gratuita.                     | ✅ Implementado |
| **HU-002** | **Autenticación con Google**  | Como Visitante, quiero poder registrarme/iniciar sesión con mi cuenta de Google, para acceder rápidamente sin crear una contraseña.        | ✅ Implementado |
| **HU-003** | **Inicio de Sesión**          | Como Usuario Registrado, quiero poder iniciar sesión con mi email y contraseña, para acceder a mi panel de control.                        | ✅ Implementado |
| **HU-004** | **Selección de Rol**          | Como Nuevo Usuario, quiero elegir mi rol (Principiante o Experto) después del registro, para personalizar mi experiencia en la plataforma. | ✅ Implementado |
| **HU-005** | **Cerrar Sesión**             | Como Usuario Autenticado, quiero tener un botón de "Cerrar Sesión", para proteger mi cuenta en dispositivos compartidos.                   | ✅ Implementado |
| **HU-006** | **Editar Perfil Básico**      | Como Usuario, quiero poder acceder a "Mi Perfil" para editar mi nombre, foto y ver mis roles asignados.                                    | ✅ Implementado |

### 🏠 Épica: Landing Page y Navegación

| ID         | Historia de Usuario      | Descripción                                                                                                                                                                  | Estado          |
| ---------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| **HU-007** | **Landing Page Clara**   | Como Visitante, quiero ver una landing page atractiva que explique las funcionalidades y propósito de la aplicación, para saber si se ajusta a mis necesidades.              | ✅ Implementado |
| **HU-008** | **Navegación Principal** | Como Usuario, quiero tener un header con navegación a todas las secciones principales (Comunidad, Tutoriales, Cursos, Expertos), para acceder fácilmente a cualquier módulo. | ✅ Implementado |

### 📚 Épica: Tutoriales Gratuitos

| ID         | Historia de Usuario          | Descripción                                                                                                                                          | Estado          |
| ---------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| **HU-009** | **Ver Lista de Tutoriales**  | Como Principiante, quiero ver una lista de tutoriales para poder descubrir temas de mi interés.                                                      | ✅ Implementado |
| **HU-010** | **Reproducir Tutorial**      | Como Principiante, quiero reproducir el contenido de un tutorial (video de YouTube) para poder aprender a crear productos.                           | ✅ Implementado |
| **HU-011** | **Comentar en Tutorial**     | Como Principiante, quiero dejar comentarios en un tutorial para poder dar mi opinión y resolver dudas.                                               | ✅ Implementado |
| **HU-012** | **Responder Comentarios**    | Como Usuario, quiero responder a comentarios de otros usuarios en tutoriales, para crear conversaciones y ayudar a la comunidad.                     | ✅ Implementado |
| **HU-013** | **Dar Like a Tutoriales**    | Como Usuario, quiero dar like a tutoriales que me gusten, para guardar mis favoritos y mostrar aprecio al creador.                                   | ✅ Implementado |
| **HU-014** | **Crear Tutorial (Experto)** | Como Experto, quiero crear tutoriales gratuitos con título, descripción, imagen y video de YouTube, para compartir mi conocimiento con la comunidad. | ✅ Implementado |
| **HU-015** | **Gestionar Mis Tutoriales** | Como Experto, quiero ver una lista de los tutoriales que he creado y poder editarlos o eliminarlos, para mantener mi contenido actualizado.          | ✅ Implementado |

### 🎓 Épica: Cursos de Pago

| ID         | Historia de Usuario              | Descripción                                                                                                                                                                 | Estado          |
| ---------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| **HU-016** | **Explorar Catálogo de Cursos**  | Como Principiante, quiero explorar un catálogo de cursos con filtros (gratis/pago, nivel), para poder evaluar opciones de aprendizaje avanzado.                             | ✅ Implementado |
| **HU-017** | **Ver Detalles del Curso**       | Como Principiante, quiero ver información detallada de un curso (descripción, lecciones, precio, instructor), para decidir si me interesa comprarlo.                        | ✅ Implementado |
| **HU-018** | **Inscribirse a Curso Gratuito** | Como Principiante, quiero inscribirme gratuitamente a cursos sin costo, para acceder inmediatamente a su contenido.                                                         | ✅ Implementado |
| **HU-019** | **Ver Mis Cursos Inscritos**     | Como Principiante, quiero ver una lista de todos los cursos en los que estoy inscrito, para acceder rápidamente a continuar mi aprendizaje.                                 | ✅ Implementado |
| **HU-020** | **Acceder a Lecciones**          | Como Principiante inscrito, quiero ver y reproducir las lecciones de un curso (videos y contenido), para completar mi aprendizaje.                                          | ✅ Implementado |
| **HU-021** | **Crear Curso (Experto)**        | Como Experto, quiero crear un curso completo con título, descripción, nivel, precio e imagen, para compartir contenido premium.                                             | ✅ Implementado |
| **HU-022** | **Gestionar Lecciones**          | Como Experto, quiero agregar, editar y eliminar lecciones dentro de mis cursos (título, descripción, video, orden), para construir una experiencia de aprendizaje completa. | ✅ Implementado |
| **HU-023** | **Publicar/Despublicar Curso**   | Como Experto, quiero cambiar el estado de mis cursos (borrador/publicado), para controlar cuándo están disponibles en el catálogo.                                          | ✅ Implementado |
| **HU-024** | **Ver Mis Cursos Creados**       | Como Experto, quiero ver una lista de todos los cursos que he creado con sus estadísticas (inscritos, estado), para gestionar mi contenido.                                 | ✅ Implementado |

### 👥 Épica: Comunidad y Publicaciones

| ID         | Historia de Usuario             | Descripción                                                                                                                                     | Estado          |
| ---------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| **HU-025** | **Ver Feed de Comunidad**       | Como Usuario, quiero ver un feed de publicaciones de la comunidad ordenadas por reciente o popularidad, para mantenerme informado y participar. | ✅ Implementado |
| **HU-026** | **Crear Publicación**           | Como Usuario, quiero crear publicaciones con texto e imagen, para compartir mis dudas, creaciones o experiencias con la comunidad.              | ✅ Implementado |
| **HU-027** | **Comentar en Publicaciones**   | Como Usuario, quiero comentar en publicaciones de otros miembros, para interactuar y ayudar.                                                    | ✅ Implementado |
| **HU-028** | **Dar Like a Publicaciones**    | Como Usuario, quiero dar like a publicaciones que me gusten, para mostrar aprecio y aumentar su visibilidad.                                    | ✅ Implementado |
| **HU-029** | **Dar Like a Comentarios**      | Como Usuario, quiero dar like a comentarios útiles o interesantes, para destacar las mejores respuestas.                                        | ✅ Implementado |
| **HU-030** | **Ver Detalles de Publicación** | Como Usuario, quiero ver una publicación completa con todos sus comentarios, para seguir conversaciones específicas.                            | ✅ Implementado |

### 🌟 Épica: Perfiles de Expertos

| ID         | Historia de Usuario                | Descripción                                                                                                                                                               | Estado          |
| ---------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| **HU-031** | **Ver Directorio de Expertos**     | Como Principiante, quiero ver una lista de perfiles de expertos con sus especialidades y tarifas, para poder encontrar al profesional que necesito.                       | ✅ Implementado |
| **HU-032** | **Ver Perfil Completo de Experto** | Como Principiante, quiero ver el perfil detallado de un experto (biografía, especialidades, tarifas, contacto), para conocer sus credenciales antes de contactarlo.       | ✅ Implementado |
| **HU-033** | **Contactar Experto por WhatsApp** | Como Principiante, quiero contactar a un experto directamente a través de WhatsApp desde su perfil, para solicitar sus servicios personalizados.                          | ✅ Implementado |
| **HU-034** | **Crear/Editar Perfil de Experto** | Como Experto, quiero crear y editar mi perfil profesional (biografía, especialidades, tarifa por hora, redes sociales, fotos), para ofrecer mis servicios a la comunidad. | ✅ Implementado |
| **HU-035** | **Subir Avatar y Banner**          | Como Experto, quiero subir imágenes personalizadas para mi avatar y banner de perfil, para tener una presencia profesional y atractiva.                                   | ✅ Implementado |

## ✨ Características Principales

- 🏠 **Landing Page**: Página de inicio atractiva con secciones Hero, Features, Testimonials y CTA
- 🔐 **Autenticación**: Sistema completo con Supabase Auth (Email/Password + Google OAuth)
- 👤 **Sistema de Roles**: Selección de rol (Principiante/Experto) tras registro
- 📚 **Tutoriales**: Videos educativos gratuitos sobre cosmética natural con sistema de likes y comentarios
- 🎓 **Cursos**: Plataforma de cursos gratuitos con lecciones estructuradas y gestión completa
- 👥 **Comunidad**: Publicaciones, comentarios y sistema de likes en posts y comentarios
- 🌟 **Expertos**: Directorio de profesionales con perfiles especializados y contacto por WhatsApp
- 🎨 **Sistema de Temas**: Diseño personalizado con variables CSS centralizadas

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
│   └── services/          # Servicios centrales (Supabase, Auth)
├── features/
│   ├── home/              # Módulo de landing page (Hero, Features, etc.)
│   ├── security/          # Módulo de autenticación y perfiles
│   ├── tutorials/         # Módulo de tutoriales gratuitos
│   ├── courses/           # Módulo de cursos con lecciones
│   ├── community/         # Módulo de publicaciones y comentarios
│   └── experts/           # Módulo de perfiles de expertos
├── shared/
│   └── components/        # Componentes compartidos (Header, Footer, Routes)
├── App.tsx                # Configuración de rutas principales
├── index.css              # ⭐ Sistema de temas centralizado
└── main.tsx               # Punto de entrada de la aplicación
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

### 1. Home (Landing Page)

- Página de inicio con diseño atractivo
- Sección Hero con gradientes y CTAs principales
- Features Section con 4 características destacadas
- Testimonials Section con reseñas de usuarios
- CTA Section final para conversión

### 2. Security (Autenticación)

- Login con email/password
- Registro de usuarios con auto-login
- Autenticación con Google OAuth
- Selección de rol (Principiante/Experto) tras primer registro
- Gestión de perfiles (editar nombre, avatar)
- Sistema de roles con protección de rutas

### 3. Tutorials (Tutoriales)

- Videos educativos gratuitos con integración de YouTube
- Lista de tutoriales con filtrado y ordenamiento
- Sistema de likes y comentarios
- Respuestas anidadas a comentarios
- Creación y gestión de tutoriales (solo Expertos)
- Página de detalle con reproductor de video

### 4. Courses (Cursos)

- Catálogo de cursos con filtros (precio, nivel)
- Cursos gratuitos con sistema de inscripción
- Gestión de lecciones con videos y contenido
- Progreso del estudiante por curso
- Panel de gestión para expertos (crear, editar, publicar)
- Sistema de estados (borrador/publicado)
- Estadísticas de inscritos por curso

### 5. Community (Comunidad)

- Feed de publicaciones con ordenamiento (reciente/popular)
- Publicaciones con texto e imágenes
- Sistema de comentarios en publicaciones
- Likes en publicaciones y comentarios
- Página de detalle de publicación
- Filtros y búsqueda de contenido

### 6. Experts (Expertos)

- Directorio de profesionales con filtros
- Perfiles completos con avatar, banner y biografía
- Especialidades y tarifas por hora
- Contacto directo vía WhatsApp
- Gestión de perfil profesional (solo Expertos)
- Upload de imágenes (avatar y banner)
- Links a redes sociales

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
