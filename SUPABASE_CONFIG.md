# Configuración de Supabase para Registro Sin Verificación de Email

## Problema Actual

El flujo de registro está configurado pero Supabase requiere verificación de email por defecto, lo que impide que los usuarios accedan inmediatamente después de registrarse.

## Solución: Desactivar Confirmación de Email

### Paso 1: Ir al Dashboard de Supabase

1. Ve a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto

### Paso 2: Configurar Authentication

1. En el menú lateral, ve a **Authentication** → **Providers**
2. Busca la sección **Email**
3. Desactiva la opción **"Confirm email"** o **"Enable email confirmations"**
4. Guarda los cambios

### Paso 3: (Opcional) Configurar URL de Confirmación

Si decides mantener la confirmación de email activada:

1. Ve a **Authentication** → **URL Configuration**
2. Configura el **Site URL**: `http://localhost:5173` (para desarrollo)
3. Configura el **Redirect URLs**:
   - `http://localhost:5173/auth/callback`
   - Tu URL de producción cuando deploys

## Alternativa: Usar SMTP para Emails

Si quieres mantener la verificación pero en desarrollo no tienes SMTP configurado:

1. Ve a **Settings** → **Auth** → **SMTP Settings**
2. Desactiva **"Enable Custom SMTP"**
3. Supabase usará su servidor de emails (solo en producción)

## Flujo Actual Implementado

El código ya está preparado para ambos escenarios:

### Escenario 1: Confirmación Desactivada (Recomendado para desarrollo)

```
Usuario → Registro → Session creada → Role Selection → Home
```

### Escenario 2: Confirmación Activada

```
Usuario → Registro → Intento de auto-login → Mensaje de verificación
```

## Verificar Configuración

Para verificar si la confirmación está desactivada:

1. Registra un nuevo usuario
2. Revisa en **Authentication** → **Users**
3. Si el campo `email_confirmed_at` tiene una fecha inmediatamente, está desactivada
4. Si está en `null`, está activada y requiere verificación

## Producción

Para producción, se recomienda:

- ✅ Mantener la confirmación de email activada
- ✅ Configurar SMTP personalizado
- ✅ Actualizar las URLs de redirección
- ✅ Implementar resend de confirmación si el usuario no recibe el email
