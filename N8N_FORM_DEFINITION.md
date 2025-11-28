# Definición del Formulario N8N para Recolección de Métricas y KPIs

Este formulario se utilizará en N8N para recolectar métricas y KPIs de mejora de la aplicación EcoBeauty, además de permitir la selección de rol del usuario. El formulario asignará el rol seleccionado al usuario en la base de datos.

## Campos del Formulario

### 1. Email de la Cuenta

- **Tipo**: Email input
- **Requerido**: Sí
- **Descripción**: Ingresa el email con el que te registraste en EcoBeauty. (Esto nos permite asignarte el rol correcto)

### 2. Nivel de Experiencia en Belleza/Cosmética

- **Tipo**: Select dropdown
- **Opciones**:
  - Principiante (asigna rol: novice)
  - Intermedio (asigna rol: expert)
  - Avanzado (asigna rol: expert)
- **Requerido**: Sí
- **Descripción**: Selecciona tu nivel de experiencia. Esto determinará tu rol en la comunidad.

### 3. Edad

- **Tipo**: Number input
- **Rango**: 18 - 100
- **Requerido**: Sí
- **Descripción**: Tu edad en años.

### 4. Género

- **Tipo**: Select dropdown
- **Opciones**:
  - Masculino
  - Femenino
  - Otro
  - Prefiero no decir
- **Requerido**: Sí
- **Descripción**: Información demográfica.

### 5. Objetivos Principales

- **Tipo**: Text input
- **Máximo**: 200 caracteres
- **Requerido**: Sí
- **Descripción**: ¿Qué esperas lograr con EcoBeauty? (Describe brevemente tus objetivos)

### 6. Desafíos Actuales

- **Tipo**: Text input
- **Máximo**: 200 caracteres
- **Requerido**: Sí
- **Descripción**: ¿Cuáles son tus mayores desafíos o problemas en cosmética natural y belleza ecológica?

### 7. Hábitos de Información

- **Tipo**: Checkbox múltiple
- **Opciones**:
  - Redes sociales (Instagram, TikTok, Facebook)
  - Blogs y websites especializados
  - YouTube y videos tutoriales
  - Amigos y familia
  - Tiendas físicas de cosmética natural
  - Revistas y libros
  - Foros y comunidades online
  - Otros
- **Requerido**: Sí
- **Descripción**: ¿Dónde sueles informarte sobre cosmética natural y belleza ecológica? Puedes seleccionar varias opciones.

## Flujo en N8N

1. El formulario recolecta los datos incluyendo el email del usuario.
2. N8N busca al usuario en Supabase usando el email proporcionado.
3. Basado en el nivel de experiencia seleccionado:
   - Principiante → asigna rol 'novice'
   - Intermedio/Avanzado → asigna rol 'expert'
4. Invoca la función RPC `rpc_assign_role_by_email` de Supabase para asignar el rol correspondiente al usuario identificado. Esta RPC insertará en `user_roles` y también aplicará la asignación jerárquica (p.ej. `expert` → `novice`).
5. Almacena las métricas en una tabla de métricas (si se crea) o en un servicio externo.
6. Redirige al usuario de vuelta a la aplicación con el rol asignado.

## Estilos Personalizados para N8N Form

```css
:root {
  --font-family: "Inter", "Open Sans", sans-serif;
  --font-weight-normal: 400;
  --font-weight-bold: 600;
  --font-size-body: 14px;
  --font-size-label: 14px;
  --font-size-test-notice: 12px;
  --font-size-input: 16px;
  --font-size-header: 24px;
  --font-size-paragraph: 16px;
  --font-size-link: 14px;
  --font-size-error: 12px;
  --font-size-html-h1: 32px;
  --font-size-html-h2: 24px;
  --font-size-html-h3: 18px;
  --font-size-html-h4: 16px;
  --font-size-html-h5: 14px;
  --font-size-html-h6: 12px;
  --font-size-subheader: 16px;

  /* EcoBeauty Color Palette */
  --color-background: #f8fafc;
  --color-test-notice-text: #d97706;
  --color-test-notice-bg: #fefce8;
  --color-test-notice-border: #fde68a;
  --color-card-bg: #ffffff;
  --color-card-border: #e2e8f0;
  --color-card-shadow: rgba(16, 185, 129, 0.08);
  --color-link: #10b981;
  --color-header: #10b981;
  --color-label: #374151;
  --color-input-border: #d1d5db;
  --color-input-text: #374151;
  --color-focus-border: #10b981;
  --color-submit-btn-bg: #059669;
  --color-submit-btn-text: #ffffff;
  --color-error: #dc2626;
  --color-required: #ef4444;
  --color-clear-button-bg: #6b7280;
  --color-html-text: #374151;
  --color-html-link: #10b981;
  --color-header-subtext: #64748b;

  /* Border Radii */
  --border-radius-card: 12px;
  --border-radius-input: 8px;
  --border-radius-clear-btn: 50%;
  --card-border-radius: 12px;

  /* Spacing */
  --padding-container-top: 32px;
  --padding-card: 32px;
  --padding-test-notice-vertical: 16px;
  --padding-test-notice-horizontal: 24px;
  --margin-bottom-card: 24px;
  --padding-form-input: 16px;
  --card-padding: 32px;
  --card-margin-bottom: 24px;

  /* Dimensions */
  --container-width: 480px;
  --submit-btn-height: 52px;
  --checkbox-size: 20px;

  /* Others */
  --box-shadow-card: 0px 8px 32px 0px var(--color-card-shadow);
  --opacity-placeholder: 0.6;
}
```

## Notas

- El formulario debe estar accesible vía URL pública para embeber en la aplicación.
- Asegurar que el usuario esté autenticado antes de acceder al formulario (usar token de Supabase si es necesario).
- Después de completar el formulario, el usuario debe ser redirigido a la página principal con el rol asignado.
- **Configuración N8N**: El workflow debe usar el email para buscar el usuario en la tabla `profiles` de Supabase y luego insertar el rol en `user_roles`.
- **Seguridad**: Considerar validar que el email proporcionado corresponda al usuario autenticado (opcional pero recomendado).

### Llamada a la RPC en Supabase

Al completar el formulario, el workflow de N8N deberá invocar la función RPC `rpc_assign_role_by_email` para asignar el rol usando el email del formulario. Ejemplo de invocación HTTP REST de Supabase:

```bash
curl -X POST 'https://<PROJECT>.supabase.co/rest/v1/rpc/rpc_assign_role_by_email' \
  -H "apikey: <SERVICE_ROLE_KEY>" \
  -H "Authorization: Bearer <SERVICE_ROLE_KEY>" \
  -H "Content-Type: application/json" \
  -d '{ "p_user_email":"user@example.com", "p_role_name":"expert" }'
```

La respuesta será JSON con un campo `assigned_roles` que contiene la lista de roles que fueron añadidos a ese usuario, por ejemplo: `{"success": true, "assigned_roles": ["expert","novice"]}`.

> Nota: Si se usa la API REST, siempre preferir usar una clave de servicio con permisos controlados y **no** exponerla en el frontend. En N8N, usa credenciales seguras o un servidor intermedio para invocar la RPC.

```

```
