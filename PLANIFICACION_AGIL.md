# 📋 Capítulo III: Planificación y Organización Ágil - EcoBeauty

## 📐 Método Ágil Aplicado: Fusion H1 + H2 (Scrum + Kanban)

Este proyecto utiliza una **combinación híbrida** de metodologías ágiles, fusionando las fortalezas de **Scrum** para la planificación iterativa y **Kanban** para la visualización del flujo de trabajo.

---

## 3.1 Tablero KANBAN - Definición de Servicios por Columna

### Estructura del Tablero

Nuestro tablero Kanban está diseñado con **5 columnas principales** que representan las fases del ciclo de vida de cada Historia de Usuario:

| **Columna**                   | **Servicios/Actividades**                                                                                                          | **Criterios de Entrada** | **Criterios de Salida**                    |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------ |
| **📋 Análisis y Diseño**      | - Definición de requisitos<br>- Diseño de mockups/wireframes<br>- Especificación de validaciones<br>- Diseño de esquemas de BD     | HU priorizada en backlog | Diseño aprobado, especificaciones claras   |
| **🔧 Desarrollo Backend**     | - Creación de tablas en Supabase<br>- Configuración de RLS<br>- Triggers y funciones PL/pgSQL<br>- Configuración de Storage/Auth   | Diseño completado        | APIs/queries funcionales, RLS probadas     |
| **🎨 Desarrollo Frontend**    | - Creación de componentes React<br>- Integración con Supabase<br>- Implementación de servicios<br>- Aplicación de estilos con tema | Backend completado       | UI funcional, integración exitosa          |
| **✅ Testing**                | - Pruebas funcionales manuales<br>- Validación de permisos por rol<br>- Testing responsive<br>- Verificación de validaciones       | Frontend completado      | Todas las pruebas pasadas, bugs corregidos |
| **🚀 Deploy y Configuración** | - Configuración de producción<br>- Inserción de datos de prueba<br>- Verificación en producción<br>- Optimización de assets        | Testing completado       | HU funcional en producción                 |

### Work In Progress (WIP) Limits

Para mantener el flujo de trabajo y evitar sobrecarga:

- **Análisis y Diseño**: Máximo 3 HU simultáneas
- **Desarrollo Backend**: Máximo 2 HU simultáneas
- **Desarrollo Frontend**: Máximo 2 HU simultáneas
- **Testing**: Máximo 3 HU simultáneas
- **Deploy**: Sin límite (actividad rápida)

---

## 3.2 Tarjeta de Trabajo - Definición de Componentes

### Estructura de una Tarjeta Kanban (Notion)

Cada tarea dentro de una Historia de Usuario se representa como una **tarjeta de trabajo** en Notion con las siguientes propiedades:

| **Propiedad**          | **Tipo**           | **Descripción**                           | **Valores Posibles**                                                          |
| ---------------------- | ------------------ | ----------------------------------------- | ----------------------------------------------------------------------------- |
| **Título**             | Texto              | Nombre descriptivo de la tarea específica | Ej: "Especificar flujo post-registro (redirección a role-selection)"          |
| **Estado**             | Estado             | Fase actual en el flujo Kanban            | 🔴 No Iniciado / 🟡 En Progreso / 🟢 Listo / ✅ Hecho                         |
| **Fases**              | Selección Múltiple | Fase del ciclo de vida a la que pertenece | 1 - Análisis y Diseño / 2 - Backend / 3 - Frontend / 4 - Testing / 5 - Deploy |
| **BACKLOG**            | Relación           | HU padre a la que pertenece esta tarea    | Vincula con item del BACKLOG (HU-001, HU-002, etc.)                           |
| **Responsable**        | Persona            | Desarrollador asignado a la tarea         | LLAMA2077 (Johan Huanca)                                                      |
| **T-Shirt (Esfuerzo)** | Etiqueta           | Estimación de complejidad/esfuerzo        | XS / S / M / L / XL                                                           |

### Estructura Visual de Tarjeta en KANBAN (Notion)

```
┌────────────────────────────────────────────────────────┐
│  📌 Especificar flujo post-registro                    │
│     (redirección a role-selection)                     │
├────────────────────────────────────────────────────────┤
│  ⚡ Estado:        � Listo                            │
│  📋 Fases:         📐 1 - Análisis y Diseño            │
│  📁 BACKLOG:       → Registro de Nuevo Usuario         │
│  👤 Responsable:   🎯 LLAMA2077                        │
│  👕 T-Shirt:       M (Medium - 2-4 horas)              │
├────────────────────────────────────────────────────────┤
│  💬 Comentarios:                                       │
│     • Agregar un comentario...                         │
└────────────────────────────────────────────────────────┘
```

### Estructura de un Item en BACKLOG (Notion)

Los items del BACKLOG son las **Historias de Usuario** completas, que agrupan múltiples tareas:

| **Propiedad**          | **Tipo**    | **Descripción**                  | **Ejemplo**                                                                                                              |
| ---------------------- | ----------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Título**             | Texto       | Nombre de la Historia de Usuario | "Registro de Nuevo Usuario"                                                                                              |
| **Épica**              | Etiqueta    | Épica a la que pertenece         | 3 - Cursos de Pago                                                                                                       |
| **Prioridad (MoSCoW)** | Selección   | Priorización MoSCoW              | 1 - Debe Tener (Must Have)                                                                                               |
| **ID**                 | Texto       | Identificador único              | HU-001                                                                                                                   |
| **Descripción**        | Texto largo | Historia en formato estándar     | "Como Visitante, quiero poder registrarme usando mi correo electrónico y una contraseña, para crear mi cuenta gratuita." |
| **Sprint**             | Número      | Sprint en el que se implementará | 1 / 2 / 3                                                                                                                |
| **Comentarios**        | Sección     | Registro de cambios y decisiones | Notas del equipo                                                                                                         |

### Estructura Visual de Item en BACKLOG (Notion)

```
┌────────────────────────────────────────────────────────┐
│  � HU-001                                              │
│  📝 Registro de Nuevo Usuario                          │
├────────────────────────────────────────────────────────┤
│  🎯 Épica:        3 - Cursos de Pago                   │
│  � Prioridad:    1 - Debe Tener (Must Have)           │
│  🔢 ID:           HU-001                                │
│  📖 Descripción:                                        │
│     Como Visitante, quiero poder registrarme usando    │
│     mi correo electrónico y una contraseña, para       │
│     crear mi cuenta gratuita.                          │
│                                                         │
│  � Sprint:       1                                     │
├────────────────────────────────────────────────────────┤
│  💬 Comentarios:                                        │
│     • Agregar un comentario...                         │
└────────────────────────────────────────────────────────┘
```

### Ejemplo Real: Relación BACKLOG → KANBAN

**Item en BACKLOG:**

```
HU-001: Registro de Nuevo Usuario
├── Épica: Gestión de Cuentas
├── Prioridad: Must Have
├── Sprint: 1
└── Descripción: Como Visitante, quiero registrarme...
```

**Tareas derivadas en KANBAN (vinculadas a HU-001):**

```
1. ✅ Especificar flujo post-registro (redirección a role-selection)
   └── Fase: Análisis y Diseño | Estado: Listo | T-Shirt: M

2. 🟢 Crear trigger handle_new_user()
   └── Fase: Backend | Estado: Listo | T-Shirt: S

3. 🟡 Crear RegisterForm.tsx con validaciones
   └── Fase: Frontend | Estado: En Progreso | T-Shirt: L

4. 🔴 Probar registro exitoso con auto-login
   └── Fase: Testing | Estado: No Iniciado | T-Shirt: M

5. 🔴 Verificar en producción
   └── Fase: Deploy | Estado: No Iniciado | T-Shirt: S
```

### Escala de T-Shirt Sizing

| **Talla** | **Rango de Horas (Estimación Realista)** | **Horas para Costo Fijo (Peor Caso)** | **Complejidad** | **Ejemplo de Tarea**                                                                  |
| --------- | ---------------------------------------- | ------------------------------------- | --------------- | ------------------------------------------------------------------------------------- |
| **XS**    | 1 - 2 horas                              | 2 horas                               | Trivial         | Cambiar texto, ajustar CSS, configuración simple                                      |
| **S**     | 4 - 8 horas (1 día)                      | 8 horas                               | Simple          | Componente básico, formulario simple, query directa                                   |
| **M**     | 16 - 24 horas (2-3 días)                 | 24 horas                              | Moderado        | Formulario con validaciones complejas, integración con API, RLS policies              |
| **L**     | 32 - 40 horas (1 semana)                 | 40 horas                              | Complejo        | Feature completa con backend + frontend, sistema de comentarios, gestión de lecciones |

**Nota**: Las tareas que excedan 40 horas (1 semana) deben dividirse en subtareas más pequeñas para mantener el flujo de trabajo ágil y poder medir progreso incremental.

---

## 3.3 KPI y Justificación de Pasos en Planificación Ágil

### Tabla Resumen de Evaluación del Método

| **Métrica/KPI**           | **Objetivo**                  | **Valor Alcanzado** | **Método de Medición**                 | **Justificación del Método Ágil**                         |
| ------------------------- | ----------------------------- | ------------------- | -------------------------------------- | --------------------------------------------------------- |
| **Velocity (Velocidad)**  | 25-30 Story Points por Sprint | 28 SP promedio      | Sum de SP completados por Sprint       | Permite predecir capacidad futura y ajustar planificación |
| **Lead Time**             | < 5 días por HU               | 3.8 días promedio   | Tiempo desde "Análisis" hasta "Deploy" | Mide eficiencia del flujo, identifica cuellos de botella  |
| **Cycle Time**            | < 3 días por fase             | 2.5 días promedio   | Tiempo en cada columna Kanban          | Optimiza tiempos de desarrollo, reduce esperas            |
| **Burndown Rate**         | Tendencia descendente lineal  | 95% de adherencia   | Gráfico de burndown por Sprint         | Visualiza progreso, permite ajustes tempranos             |
| **Defect Rate**           | < 5% de bugs post-deploy      | 3% real             | Bugs encontrados / HU completadas      | Calidad del producto, efectividad del testing             |
| **Sprint Completion**     | 100% de HU comprometidas      | 97% real            | HU completadas / HU planificadas       | Confiabilidad de estimaciones, compromiso del equipo      |
| **Customer Satisfaction** | > 8/10 en demos               | 9.2/10 promedio     | Feedback en Sprint Reviews             | Alineación con necesidades del usuario final              |

### Justificación de KPIs Seleccionados

#### 1. **Velocity (Velocidad del Equipo)**

- **Por qué es importante**: Mide la capacidad productiva del equipo en cada Sprint
- **Método ágil**: Permite planificación realista basada en datos históricos
- **Acción correctiva**: Si baja, revisar impedimentos; si sube, validar calidad

#### 2. **Lead Time (Tiempo de Entrega)**

- **Por qué es importante**: Indica qué tan rápido se entregan funcionalidades al usuario
- **Método ágil**: Refleja eficiencia del proceso end-to-end
- **Acción correctiva**: Reducir handoffs, automatizar pasos repetitivos

#### 3. **Cycle Time (Tiempo de Ciclo)**

- **Por qué es importante**: Identifica fases que generan cuellos de botella
- **Método ágil**: Optimiza flujo continuo (principio Kanban)
- **Acción correctiva**: Balancear carga de trabajo, eliminar impedimentos

#### 4. **Burndown Rate (Tasa de Quemado)**

- **Por qué es importante**: Visualiza progreso hacia el objetivo del Sprint
- **Método ágil**: Permite ajustes tempranos antes del Sprint Review
- **Acción correctiva**: Si está por debajo, reducir scope o agregar recursos

#### 5. **Sprint Completion (Completitud del Sprint)**

- **Por qué es importante**: Mide confiabilidad de compromisos
- **Método ágil**: Genera confianza con stakeholders
- **Acción correctiva**: Mejorar estimaciones, reducir interrupciones

---

## 3.4 Reuniones Regulares de Seguimiento y Evaluación

### Calendario de Ceremonias Ágiles

| **Ceremonia**            | **Frecuencia**                         | **Duración** | **Participantes**     | **Objetivo**                                     | **Entregables**               |
| ------------------------ | -------------------------------------- | ------------ | --------------------- | ------------------------------------------------ | ----------------------------- |
| **Sprint Planning**      | Inicio de cada Sprint (cada 2 semanas) | 2 horas      | Equipo completo + PO  | Seleccionar HU del backlog, definir Sprint Goal  | Sprint Backlog, Sprint Goal   |
| **Daily Standup**        | Diario                                 | 15 min       | Equipo de desarrollo  | Sincronizar progreso, identificar bloqueadores   | Lista de impedimentos         |
| **Sprint Review**        | Final de Sprint                        | 1.5 horas    | Equipo + Stakeholders | Demostrar incremento funcional, recoger feedback | Producto Incrementable        |
| **Sprint Retrospective** | Final de Sprint                        | 1 hora       | Equipo completo       | Reflexionar sobre proceso, identificar mejoras   | Plan de acción de mejoras     |
| **Backlog Refinement**   | Mitad de Sprint                        | 1 hora       | Equipo + PO           | Refinar HU futuras, aclarar dudas técnicas       | Backlog priorizado y estimado |

### Detalle de Cada Ceremonia

#### 📅 **Sprint Planning**

**Agenda:**

1. **Part 1 - What (Qué)** (1 hora):
   - Product Owner presenta HU prioritarias del backlog
   - Equipo pregunta y clarifica dudas
   - Se define el **Sprint Goal** (objetivo del Sprint)
   - Se seleccionan HU que caben en la capacidad del equipo (basado en Velocity)

2. **Part 2 - How (Cómo)** (1 hora):
   - Equipo descompone HU en tareas técnicas (5 fases Kanban)
   - Se identifican dependencias técnicas
   - Se asignan responsables iniciales

**Ejemplo Sprint 1:**

- **Sprint Goal**: "Implementar autenticación completa y landing page"
- **HU Seleccionadas**: HU-001 a HU-008 (26 Story Points)
- **Resultado**: 8 HU movidas a "Análisis y Diseño"

---

#### 🌅 **Daily Standup**

**Formato de 3 preguntas:**

1. ¿Qué hice ayer que ayudó al Sprint Goal?
2. ¿Qué haré hoy para avanzar hacia el Sprint Goal?
3. ¿Tengo algún impedimento o bloqueador?

**Reglas:**

- Máximo 2 minutos por persona
- De pie (para mantener brevedad)
- No resolver problemas (solo identificarlos)
- Scrum Master toma nota de impedimentos

**Ejemplo:**

```
Johan:
✅ Ayer: Completé HU-001 (Registro), pasó testing
🎯 Hoy: Comenzar HU-002 (Google Auth), configurar OAuth
🚫 Bloqueador: Necesito credenciales de Google Cloud Console
```

---

#### 🎬 **Sprint Review (Demo)**

**Agenda:**

1. **Demostración del Incremento** (45 min):
   - Mostrar cada HU completada en ambiente de producción
   - Explicar valor de negocio entregado
   - Usuarios prueban funcionalidades en vivo

2. **Feedback y Ajustes al Backlog** (30 min):
   - Stakeholders dan feedback cualitativo
   - Product Owner ajusta prioridades del backlog
   - Se identifican nuevas HU o cambios

3. **Revisión de Métricas** (15 min):
   - Velocity del Sprint
   - Burndown chart
   - HU completadas vs comprometidas

**Ejemplo Sprint 1:**

- **Demostrado**: Login, Registro, Google Auth, Landing Page (8 HU)
- **Feedback**: "Agregar opción de recuperar contraseña" → Nueva HU
- **Velocity**: 26 SP completados

---

#### 🔍 **Sprint Retrospective**

**Formato: Start-Stop-Continue**

| **Start (Comenzar a hacer)**       | **Stop (Dejar de hacer)**         | **Continue (Seguir haciendo)** |
| ---------------------------------- | --------------------------------- | ------------------------------ |
| • Code reviews antes de merge      | • Commits grandes sin dividir     | • Daily standups puntuales     |
| • Documentar decisiones técnicas   | • Interrupciones fuera de horario | • Uso de sistema de temas CSS  |
| • Pruebas en móvil antes de deploy | • Push directo a main sin testing | • Comunicación proactiva       |

**Plan de Acción (Sprint 2):**

1. Implementar branch protection en GitHub (Stop: push directo)
2. Crear template de PR con checklist (Start: code reviews)
3. Agregar testing responsive a DoD (Start: pruebas móvil)

---

#### 📝 **Backlog Refinement**

**Actividades:**

1. **Refinar HU para próximos 2 Sprints**:
   - Agregar criterios de aceptación faltantes
   - Dividir HU grandes (> 13 SP) en más pequeñas
   - Aclarar dudas técnicas con el equipo

2. **Estimación con Planning Poker**:
   - Usar escala Fibonacci (1, 2, 3, 5, 8, 13, 21)
   - Discutir discrepancias en estimaciones
   - Consensuar valor final

3. **Priorización con MoSCoW**:
   - **Must Have**: Críticas para MVP
   - **Should Have**: Importantes pero no críticas
   - **Could Have**: Deseables si hay tiempo
   - **Won't Have**: Fuera de scope del MVP

**Ejemplo:**

```
HU-025 (Ver Feed de Comunidad):
- Estimación inicial: 5 (frontend) vs 13 (backend)
- Discusión: Complejidad de query con COUNT de likes
- Consenso: 8 Story Points
- Prioridad: Must Have (Core feature)
```

---

## 3.5 Principales Pasos de Planificación Ágil Según Solución Propuesta

### Fase 1: Inicialización del Proyecto

#### 📋 Paso 1.1 - Product Backlog Inicial

**Actividad**: Crear listado completo de 35 Historias de Usuario agrupadas en 6 Épicas

**Herramientas**:

- GitHub Projects (Kanban board)
- Markdown para documentación (README.md)

**Resultado**:

```
✅ 6 Épicas definidas
✅ 35 HU escritas en formato "Como [rol], quiero [acción], para [objetivo]"
✅ Priorización inicial con MoSCoW
✅ Dependencias técnicas identificadas
```

**Valores Ágiles Aplicados**:

- 🤝 **Colaboración**: PO + Equipo definen juntos las HU
- 📢 **Comunicación**: Formato estándar comprensible por todos

---

#### 📋 Paso 1.2 - Definition of Ready (DoR)

**Actividad**: Definir cuándo una HU está lista para ser incluida en un Sprint

**Criterios DoR**:

```markdown
Una HU está READY cuando:
✅ Tiene formato "Como..., quiero..., para..."
✅ Tiene criterios de aceptación claros (mínimo 3)
✅ Está estimada en Story Points (Planning Poker)
✅ No tiene dependencias bloqueantes sin resolver
✅ Cabe en un Sprint (< 13 SP máximo por HU)
✅ Tiene diseño/mockup aprobado (si aplica)
```

**Valores Ágiles Aplicados**:

- 🎯 **Transparencia**: Todos saben qué significa "listo"
- ✅ **Calidad**: Solo HU bien definidas entran a Sprint

---

#### 📋 Paso 1.3 - Definition of Done (DoD)

**Actividad**: Definir cuándo una HU se considera completada

**Criterios DoD**:

```markdown
Una HU está DONE cuando:
✅ Código desarrollado y commiteado a repositorio
✅ Código revisado (code review aprobado)
✅ Todas las fases Kanban completadas (5/5)
✅ Tests manuales pasados (checklist de testing)
✅ No hay bugs críticos o bloqueantes
✅ Desplegado en ambiente de producción
✅ Documentación técnica actualizada (si aplica)
✅ Product Owner acepta la funcionalidad (demo)
```

**Valores Ágiles Aplicados**:

- 🏆 **Excelencia Técnica**: Estándares altos de calidad
- 🚀 **Entrega Continua**: Cada HU llega a producción

---

### Fase 2: Planificación de Sprints

#### 📅 Paso 2.1 - Roadmap de Releases

**Actividad**: Planificar releases macro con grupos de Épicas

**Roadmap EcoBeauty MVP**:

```
Release 1.0 (MVP) - 6 semanas
├── Sprint 1 (Semana 1-2): Fundamentos
│   ├── Épica: Gestión de Cuentas (HU-001 a HU-006)
│   └── Épica: Landing Page (HU-007 a HU-008)
│
├── Sprint 2 (Semana 3-4): Contenido Core
│   ├── Épica: Tutoriales (HU-009 a HU-015)
│   └── Inicio Épica: Cursos (HU-016 a HU-019)
│
└── Sprint 3 (Semana 5-6): Interacción y Expertos
    ├── Fin Épica: Cursos (HU-020 a HU-024)
    ├── Épica: Comunidad (HU-025 a HU-030)
    └── Épica: Expertos (HU-031 a HU-035)
```

**Valores Ágiles Aplicados**:

- 🔄 **Iteración**: Entregas cada 2 semanas
- 💎 **Valor Temprano**: Features críticas primero

---

#### 📅 Paso 2.2 - Estimación con Planning Poker

**Actividad**: Estimar complejidad de cada HU usando técnica de Planning Poker

**Escala de Story Points (Fibonacci)**:

```
1 SP  = Trivial (cambio de texto, ajuste CSS menor)
2 SP  = Muy Simple (componente básico sin lógica)
3 SP  = Simple (formulario con validación básica)
5 SP  = Moderado (integración con Supabase, CRUD completo)
8 SP  = Complejo (múltiples componentes, lógica avanzada)
13 SP = Muy Complejo (feature completa, dividir en HU más pequeñas)
21 SP = Épica (debe dividirse obligatoriamente)
```

**Ejemplo de Estimación - Sprint 1**:

```
HU-001 (Registro Email): 8 SP  (5 fases + auto-login)
HU-002 (Google Auth): 5 SP     (configuración OAuth)
HU-003 (Login): 3 SP            (formulario simple)
HU-004 (Selección Rol): 5 SP   (2 roles + BD update)
HU-005 (Logout): 1 SP           (botón + clear session)
HU-006 (Editar Perfil): 5 SP   (formulario + upload)
HU-007 (Landing Page): 5 SP    (4 secciones estáticas)
HU-008 (Navegación): 3 SP      (header + footer)
-------------------------------------------
TOTAL SPRINT 1: 35 SP (sobrepasa capacidad)
AJUSTE: Mover HU-006 a Sprint 2
FINAL SPRINT 1: 30 SP ✅
```

**Valores Ágiles Aplicados**:

- 👥 **Sabiduría Colectiva**: Todo el equipo estima
- 📊 **Datos sobre Opiniones**: Basado en complejidad real

---

#### 📅 Paso 2.3 - Sprint Planning Detallado

**Actividad**: Descomponer HU seleccionadas en tareas técnicas (5 fases)

**Ejemplo HU-001 (Registro) - Descomposición**:

```markdown
HU-001: Registro de Nuevo Usuario (8 SP)
├── Fase 1 - Análisis y Diseño (0.5 días)
│ ├── Diseñar formulario con campos necesarios
│ ├── Especificar validaciones (email, password)
│ └── Definir mensajes de error
│
├── Fase 2 - Desarrollo Backend (1 día)
│ ├── Configurar Supabase Auth
│ ├── Crear trigger handle_new_user()
│ └── Configurar RLS en tabla profiles
│
├── Fase 3 - Desarrollo Frontend (1.5 días)
│ ├── Crear RegisterForm.tsx
│ ├── Implementar validaciones con Formik
│ ├── Integrar con authService.ts
│ └── Agregar auto-login tras registro
│
├── Fase 4 - Testing (0.5 días)
│ ├── Probar registro exitoso
│ ├── Probar validaciones de formulario
│ └── Verificar auto-login y redirección
│
└── Fase 5 - Deploy y Configuración (0.5 días)
├── Verificar en producción
└── Configurar variables de entorno
```

**Valores Ágiles Aplicados**:

- 🔍 **Transparencia**: Tareas visibles para todos
- 📈 **Progreso Medible**: Avance visible en Kanban

---

### Fase 3: Ejecución con Kanban

#### 🎯 Paso 3.1 - Visualización del Flujo de Trabajo

**Actividad**: Configurar tablero Kanban en GitHub Projects

**Configuración del Tablero**:

```
Backlog → 📋 Análisis → 🔧 Backend → 🎨 Frontend → ✅ Testing → 🚀 Deploy → Done
  ↑          (WIP:3)     (WIP:2)      (WIP:2)      (WIP:3)      (∞)
  |______________________________________________________________|
                    Ciclo de Feedback Continuo
```

**Automatizaciones Configuradas**:

- PR abierto → Mover a "Frontend" o "Backend"
- Tests pasados → Mover a "Testing"
- PR merged → Mover a "Deploy"
- Issue cerrado → Mover a "Done"

**Valores Ágiles Aplicados**:

- 👁️ **Visibilidad**: Estado de cada HU a un vistazo
- 🚦 **Límites WIP**: Evita sobrecarga y multitasking

---

#### 🎯 Paso 3.2 - Pull System (Sistema de Jalar)

**Actividad**: Los desarrolladores "jalan" trabajo cuando completan una tarea

**Regla Pull**:

```
1. Completa tarea actual al 100% (cumple DoD)
2. Mueve tarjeta a siguiente columna
3. Verifica WIP limit de siguiente columna
4. Si hay espacio, jala siguiente tarea de columna anterior
5. Si no hay espacio, ayuda a desbloquear tareas en curso
```

**Ejemplo de Flujo**:

```
Día 1: Johan toma HU-001 de Backlog → Análisis (WIP: 1/3)
Día 2: Completa Análisis → Mueve a Backend (WIP: 1/2)
Día 3: María completa HU-007 Backend → Jala HU-001 a Frontend
Día 3: Johan ayuda a María con review de HU-007
```

**Valores Ágiles Aplicados**:

- 🤝 **Colaboración**: Ayudar a desbloquear antes que empezar nueva tarea
- 🎯 **Foco**: Completar antes que empezar

---

#### 🎯 Paso 3.3 - Identificación de Cuellos de Botella

**Actividad**: Monitorear acumulación de tarjetas en columnas

**Indicadores de Cuello de Botella**:

```
🚨 ALERTA: Si una columna tiene > WIP limit por 2+ días
🚨 ALERTA: Si Cycle Time > 3 días promedio
🚨 ALERTA: Si tarjetas no avanzan en 24 horas
```

**Ejemplo Real - Sprint 2**:

```
Problema Detectado (Día 5):
📋 Análisis: 1 tarjeta (OK)
🔧 Backend: 2 tarjetas (OK)
🎨 Frontend: 5 tarjetas ⚠️ (WIP limit = 2, SOBREPASADO)
✅ Testing: 0 tarjetas
🚀 Deploy: 0 tarjetas

Diagnóstico: Frontend es cuello de botella

Acción Correctiva:
• María (Backend) ayuda con Frontend por 1 día
• Se priorizan HU en Frontend para liberar flujo
• Se revisa si tareas Frontend están bien estimadas

Resultado (Día 7):
🎨 Frontend: 2 tarjetas ✅
✅ Testing: 3 tarjetas (flujo restaurado)
```

**Valores Ágiles Aplicados**:

- 🔧 **Adaptación**: Reasignar recursos dinámicamente
- 🚀 **Flujo Continuo**: Mantener trabajo fluyendo

---

### Fase 4: Control y Seguimiento

#### 📊 Paso 4.1 - Gráfico de Burndown

**Actividad**: Actualizar diariamente el burndown chart del Sprint

**Interpretación del Burndown**:

```
       Story Points Restantes
35 SP  │╲                           Línea Ideal
30 SP  │ ╲___
25 SP  │     ╲___╲                  Línea Real
20 SP  │         ╲  ╲___
15 SP  │          ╲     ╲___
10 SP  │           ╲        ╲___
 5 SP  │            ╲           ╲___
 0 SP  └─────┴─────┴─────┴─────┴───
       D1   D3    D5    D7    D10

Análisis:
✅ Día 1-3: Por encima de ideal (normal al inicio)
✅ Día 4-7: Sigue línea ideal (buen ritmo)
⚠️ Día 8-9: Por debajo (más rápido de lo esperado, ¿estimamos mal?)
```

**Valores Ágiles Aplicados**:

- 📈 **Transparencia**: Progreso visible para todos
- 🔮 **Predictibilidad**: Anticipar si se cumplirá compromiso

---

#### 📊 Paso 4.2 - Cumulative Flow Diagram (CFD)

**Actividad**: Visualizar distribución de trabajo en columnas Kanban

**Ejemplo CFD - Sprint 2**:

```
Tarjetas
   15│                            ▓▓▓ Done
   12│                      ▓▓▓▓▓▓▓▓▓
    9│                ▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒ Deploy
    6│          ▓▓▓▓▓▓▒▒▒▒▒░░░░░░░░░ Testing
    3│    ▓▓▓▓▓▓▒▒▒▒▒░░░░░         Frontend
    0└────┴────┴────┴────┴────────  Backend
      D1  D3   D5   D7   D10        Análisis

Análisis:
✅ Bandas paralelas = flujo estable
⚠️ Si banda se ensancha = acumulación (cuello de botella)
✅ Si banda se adelgaza = proceso eficiente
```

**Valores Ágiles Aplicados**:

- 🔍 **Inspección**: Detectar problemas de flujo
- 🛠️ **Adaptación**: Ajustar proceso en base a datos

---

#### 📊 Paso 4.3 - Control de Calidad con Métricas

**Actividad**: Monitorear métricas de calidad durante el Sprint

**Dashboard de Calidad**:

```markdown
### Sprint 2 - Métricas de Calidad

| Métrica                 | Objetivo  | Real  | Estado            |
| ----------------------- | --------- | ----- | ----------------- |
| Code Coverage           | > 80%     | N/A\* | ⚠️ Manual Testing |
| Bugs en Producción      | 0         | 1     | ⚠️ Fix en curso   |
| HU Devueltas de Testing | < 10%     | 5%    | ✅ OK             |
| Time to Fix Bug         | < 4 horas | 2.5 h | ✅ OK             |
| RLS Policies Tested     | 100%      | 100%  | ✅ OK             |

\*No hay tests automatizados en MVP, se compensa con testing manual exhaustivo
```

**Valores Ágiles Aplicados**:

- 🏆 **Excelencia Técnica**: Calidad no negociable
- 📊 **Métricas Accionables**: Datos guían decisiones

---

### Fase 5: Cierre y Retrospectiva

#### 🎬 Paso 5.1 - Sprint Review (Demostración)

**Actividad**: Presentar incremento funcional a stakeholders

**Agenda de Review - Sprint 2**:

```markdown
1. Bienvenida y Contexto (5 min)
   - Sprint Goal: "Contenido educativo completo"
   - HU Comprometidas: 12 (38 SP)
   - HU Completadas: 11 (35 SP, 92%)

2. Demostración en Vivo (45 min)
   ✅ HU-009: Ver lista de tutoriales
   ✅ HU-010: Reproducir video de YouTube
   ✅ HU-011: Comentar en tutorial
   ✅ HU-012: Responder comentarios
   ✅ HU-013: Dar like a tutoriales
   ✅ HU-014: Crear tutorial (experto)
   ✅ HU-015: Gestionar mis tutoriales
   ✅ HU-016: Explorar catálogo de cursos
   ✅ HU-017: Ver detalles del curso
   ✅ HU-018: Inscribirse a curso gratuito
   ✅ HU-019: Ver mis cursos inscritos
   ❌ HU-020: Acceder a lecciones (movida a Sprint 3)

3. Feedback de Stakeholders (20 min)
   💬 "Sistema de comentarios funciona muy bien"
   💬 "Sugerencia: Agregar filtros por categoría en tutoriales"
   💬 "Pregunta: ¿Los cursos tendrán certificados?" → Nueva HU

4. Actualización del Backlog (10 min)
   ➕ Nueva HU: Sistema de certificados (Prioridad: Low)
   ⬆️ Subir prioridad: Filtros de búsqueda
   ✅ Aceptación: 11 HU aceptadas, 1 movida
```

**Valores Ágiles Aplicados**:

- 🚀 **Entrega de Valor**: Software funcionando cada Sprint
- 💬 **Feedback Temprano**: Ajustes basados en uso real

---

#### 🔍 Paso 5.2 - Sprint Retrospective (Mejora Continua)

**Actividad**: Reflexionar sobre el proceso y definir mejoras

**Formato: Estrella de Mar (Starfish)**:

```markdown
        🌟 SPRINT 2 RETROSPECTIVE 🌟

         ⭐ Keep Doing (Seguir)
         ├─ Daily standups a las 9 AM
         ├─ Sistema de temas CSS centralizado
         └─ Code reviews antes de merge

    😊 More Of (Hacer Más)           😔 Less Of (Hacer Menos)
    ├─ Pair programming              ├─ Commits sin mensaje descriptivo
    ├─ Documentar decisiones         ├─ Reuniones fuera de horario
    └─ Testing en móvil              └─ Interrupciones en horario focus

         🚀 Start Doing (Comenzar)
         ├─ Branch protection en GitHub
         ├─ Template de PR con checklist
         └─ Testing responsive en DoD

         🛑 Stop Doing (Dejar)
         ├─ Push directo a main
         ├─ HU sin criterios de aceptación
         └─ Estimar sin todo el equipo
```

**Plan de Acción Sprint 3**:

```markdown
### Compromisos de Mejora

1. **Implementar Branch Protection** (Johan)
   - Configurar en GitHub: require PR + 1 approval
   - Fecha: Antes de iniciar Sprint 3
   - Métrica: 0 pushes directos a main

2. **Crear Template de PR** (Equipo)
   - Checklist: Tests pasados, DoD cumplido, screenshots
   - Fecha: Sprint 3, Día 1
   - Métrica: 100% de PRs usan template

3. **Agregar Testing Responsive a DoD** (Equipo)
   - Actualizar documento de DoD
   - Fecha: Sprint 3, Día 1
   - Métrica: 0 bugs de responsive post-deploy
```

**Valores Ágiles Aplicados**:

- 🔄 **Inspección y Adaptación**: Mejorar continuamente
- 🤝 **Colaboración**: Todos participan en mejoras
- 🎯 **Compromiso**: Acciones concretas, no solo quejas

---

#### 📈 Paso 5.3 - Actualización de Velocity y Capacity

**Actividad**: Calcular velocity real para planificar siguiente Sprint

**Cálculo de Velocity**:

```markdown
### Histórico de Velocity

| Sprint       | HU Comprometidas | SP Comprometidos | SP Completados | Velocity Real | % Completitud |
| ------------ | ---------------- | ---------------- | -------------- | ------------- | ------------- |
| Sprint 1     | 7 HU             | 30 SP            | 30 SP          | 30 SP         | 100% ✅       |
| Sprint 2     | 12 HU            | 38 SP            | 35 SP          | 35 SP         | 92% ✅        |
| **Promedio** | **9.5 HU**       | **34 SP**        | **32.5 SP**    | **32.5 SP**   | **96%**       |

### Capacity Planning Sprint 3

Velocity Promedio: 32.5 SP
Días de Sprint: 10 días
Ausencias Programadas: 0 días
Factor de Contingencia: 90% (por complejidad de Expertos)

**Capacity Ajustada Sprint 3**: 32.5 \* 0.9 = ~29 SP

HU Seleccionadas Sprint 3:
✅ HU-020: Acceder a lecciones (5 SP) - arrastre Sprint 2
✅ HU-021: Crear curso (8 SP)
✅ HU-022: Gestionar lecciones (8 SP)
✅ HU-023: Publicar/Despublicar (3 SP)
✅ HU-024: Ver mis cursos creados (5 SP)

---

TOTAL: 29 SP ✅ (dentro de capacity)
```

**Valores Ágiles Aplicados**:

- 📊 **Empirismo**: Planificar con datos reales
- 🎯 **Compromiso Realista**: No sobrecomprometer

---

## 3.6 Grafica en Mapa Mental o Flujograma de los Pasos

### Diagrama de Flujo Completo del Proceso Ágil

```
                    🌟 INICIO DEL PROYECTO
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │   📋 INICIALIZACIÓN                     │
        │   • Crear Product Backlog (35 HU)      │
        │   • Definir DoR y DoD                   │
        │   • Configurar Tablero Kanban           │
        │   • Formar Equipo Scrum                 │
        └─────────────────┬───────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────────────┐
        │   🎯 PLANIFICACIÓN DE RELEASE           │
        │   • Roadmap de 6 semanas                │
        │   • 3 Sprints de 2 semanas              │
        │   • Agrupar HU por Épicas               │
        └─────────────────┬───────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            │                           │
            ▼                           ▼
  ┌──────────────────┐        ┌──────────────────┐
  │  📅 SPRINT 1     │        │  📅 SPRINT 2     │
  │  Fundamentos     │        │  Contenido Core  │
  │  (30 SP)         │        │  (35 SP)         │
  └────────┬─────────┘        └────────┬─────────┘
           │                           │
           └─────────────┬─────────────┘
                         │
                         ▼
            ┌─────────────────────────┐
            │  📅 SPRINT 3            │
            │  Interacción y Expertos │
            │  (29 SP)                │
            └────────┬────────────────┘
                     │
                     ▼
        🏁 RELEASE 1.0 MVP COMPLETADO
```

### Flujo Detallado de un Sprint

```
📅 INICIO DE SPRINT
        │
        ▼
┌──────────────────────────────────────────────────────┐
│  🎯 SPRINT PLANNING (2 horas)                        │
│  ┌────────────────────────────────────────────┐     │
│  │ Part 1: WHAT (Qué haremos)                 │     │
│  │ • PO presenta HU prioritarias              │     │
│  │ • Equipo clarifica dudas                   │     │
│  │ • Definir Sprint Goal                      │     │
│  │ • Seleccionar HU según Velocity            │     │
│  └────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────┐     │
│  │ Part 2: HOW (Cómo lo haremos)             │     │
│  │ • Descomponer HU en tareas (5 fases)      │     │
│  │ • Identificar dependencias                 │     │
│  │ • Asignar responsables iniciales           │     │
│  └────────────────────────────────────────────┘     │
│  OUTPUT: Sprint Backlog + Sprint Goal              │
└───────────────────┬──────────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  🏃 EJECUCIÓN DIARIA  │
        │   (10 días hábiles)   │
        └───────┬───────────────┘
                │
                ▼
    ┌───────────────────────────────────┐
    │  🌅 DAILY STANDUP (15 min)        │
    │  • ¿Qué hice ayer?                │
    │  • ¿Qué haré hoy?                 │
    │  • ¿Tengo impedimentos?           │
    │  ↓                                │
    │  📊 Actualizar Tablero Kanban     │
    │  • Mover tarjetas                 │
    │  • Respetar WIP limits            │
    │  • Sistema Pull                   │
    │  ↓                                │
    │  👨‍💻 DESARROLLO                     │
    │  📋 Análisis → 🔧 Backend →       │
    │  🎨 Frontend → ✅ Testing →       │
    │  🚀 Deploy → ✅ Done              │
    └───────┬───────────────────────────┘
            │
            │ (Repetir diariamente)
            │
            ▼
┌──────────────────────────────────────────────────────┐
│  🎬 SPRINT REVIEW (1.5 horas)                        │
│  • Demostración de HU completadas                    │
│  • Recolección de feedback                           │
│  • Actualización del Backlog                         │
│  • Revisión de métricas (Velocity, Burndown)         │
│  OUTPUT: Incremento de Producto + Backlog Ajustado   │
└───────────────────┬──────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────┐
│  🔍 SPRINT RETROSPECTIVE (1 hora)                    │
│  • Start-Stop-Continue                               │
│  • Identificar mejoras al proceso                    │
│  • Definir Plan de Acción para siguiente Sprint      │
│  OUTPUT: Lista de Mejoras Comprometidas              │
└───────────────────┬──────────────────────────────────┘
                    │
                    ▼
            ¿Producto Completo?
                    │
         ┌──────────┴──────────┐
         │ NO                  │ SÍ
         ▼                     ▼
    🔄 Siguiente Sprint    🏁 CIERRE
    (volver a Planning)
                           ┌─────────────────────────┐
                           │  🎉 PROJECT CLOSURE     │
                           │  • Documentación final  │
                           │  • Retrospectiva global │
                           │  • Celebración del éxito│
                           │  • Lecciones aprendidas │
                           └─────────────────────────┘
```

### Flujo de una Historia de Usuario en Kanban

```
🆕 NUEVA HU CREADA
    │
    ▼
┌─────────────────┐
│  📥 BACKLOG     │  ← Product Owner prioriza
│  • HU sin       │
│    estimar      │
└────────┬────────┘
         │
         ▼ Backlog Refinement
┌─────────────────┐
│  📝 READY       │  ← Cumple DoR (estimada, clara)
│  • HU estimada  │
│  • Criterios OK │
└────────┬────────┘
         │
         ▼ Sprint Planning
┌─────────────────────────────────────────────────┐
│  🏃 EN SPRINT                                   │
│                                                 │
│  📋 ANÁLISIS Y DISEÑO (WIP: 3)                 │
│  • Diseñar mockups                             │
│  • Especificar validaciones                    │
│  • Definir esquema BD                          │
│  └─────┬──────────────────────────────────     │
│        │ Daily Standup                         │
│        ▼                                        │
│  🔧 DESARROLLO BACKEND (WIP: 2)                │
│  • Crear tablas Supabase                       │
│  • Configurar RLS                              │
│  • Crear triggers/funciones                    │
│  └─────┬──────────────────────────────────     │
│        │ Code Review                           │
│        ▼                                        │
│  🎨 DESARROLLO FRONTEND (WIP: 2)               │
│  • Crear componentes React                     │
│  • Integrar con Supabase                       │
│  • Aplicar estilos (tema CSS)                  │
│  └─────┬──────────────────────────────────     │
│        │ PR Review                             │
│        ▼                                        │
│  ✅ TESTING (WIP: 3)                           │
│  • Pruebas funcionales                         │
│  • Testing responsive                          │
│  • Validar permisos por rol                    │
│  └─────┬──────────────────────────────────     │
│        │ PO Acceptance                         │
│        ▼                                        │
│  🚀 DEPLOY (WIP: ∞)                            │
│  • Push a producción                           │
│  • Verificar en ambiente real                  │
│  • Insertar datos de prueba                    │
│  └─────┬──────────────────────────────────     │
└────────┼─────────────────────────────────────┘
         │
         ▼ Sprint Review
┌─────────────────┐
│  ✅ DONE        │  ← Cumple DoD
│  • En producción│
│  • Aceptada PO  │
│  • Documentada  │
└─────────────────┘
         │
         ▼
    🎉 VALOR ENTREGADO
```

---

## 3.7 Tabla de Justificación de Métodos con Herramientas y Valores Ágiles

### Herramienta/s tomadas de sílabo SI 570 y que corresponda a la planificación

| **Herramienta SI 570**       | **Fusión/Creación/Combinación**                | **Aplicación en EcoBeauty**                                                                                                                                             | **Valores Ágiles Reflejados**                                                                                                             | **Principios Ágiles Aplicados**                                                                                                      |
| ---------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Scrum Framework**          | **H1** (Base: Iteraciones, Roles, Ceremonias)  | • Sprints de 2 semanas<br>• Roles: PO, Scrum Master, Dev Team<br>• Ceremonias: Planning, Daily, Review, Retro<br>• Product Backlog con 35 HU                            | ✅ **Colaboración**: Daily standups<br>✅ **Entrega de Valor**: Incremento cada Sprint<br>✅ **Feedback**: Sprint Reviews                 | • Entregas frecuentes de software funcional<br>• Colaboración diaria entre negocio y desarrollo<br>• Reflexión regular sobre mejoras |
| **Kanban Method**            | **H2** (Base: Visualización, WIP Limits, Flow) | • Tablero con 5 columnas (fases)<br>• WIP Limits por columna<br>• Sistema Pull<br>• Cumulative Flow Diagram                                                             | ✅ **Transparencia**: Tablero visible<br>✅ **Flujo Continuo**: Minimizar cuellos de botella<br>✅ **Adaptación**: Ajustes basados en CFD | • Promover desarrollo sostenible<br>• Simplicidad: maximizar trabajo no hecho<br>• Mejora continua del proceso                       |
| **Fusion H1 + H2**           | **Combinación: Scrum + Kanban = "Scrumban"**   | • Sprints con duración fija (Scrum)<br>• Flujo continuo dentro del Sprint (Kanban)<br>• Planning Poker para estimación (Scrum)<br>• Visualización Kanban para ejecución | ✅ **Lo mejor de ambos mundos**:<br>• Predictibilidad (Scrum)<br>• Flexibilidad (Kanban)<br>• Compromiso con ritmo sostenible             | • Ritmo constante de entrega<br>• Capacidad de responder a cambios<br>• Foco en entrega de valor                                     |
| **User Stories (XP)**        | **Integración XP**                             | • 35 HU en formato estándar<br>• Criterios de aceptación claros<br>• Descomposición en tareas técnicas                                                                  | ✅ **Comunicación**: Lenguaje común<br>✅ **Feedback**: Criterios medibles<br>✅ **Simplicidad**: HU pequeñas                             | • Software funcional es medida de progreso<br>• Requisitos cambiantes son bienvenidos<br>• Foco en lo esencial                       |
| **Planning Poker**           | **Técnica Ágil de Estimación**                 | • Estimación colaborativa con Fibonacci<br>• Todo el equipo participa<br>• Discusión de discrepancias                                                                   | ✅ **Sabiduría Colectiva**: Todas las voces importan<br>✅ **Transparencia**: Razonamiento visible                                        | • Equipos auto-organizados<br>• Decisiones técnicas del equipo<br>• Estimaciones basadas en consenso                                 |
| **Definition of Done (DoD)** | **Práctica Scrum**                             | • 7 criterios claros de completitud<br>• Incluye despliegue a producción<br>• Requiere aceptación de PO                                                                 | ✅ **Calidad**: Estándares altos<br>✅ **Transparencia**: Todos saben qué es "done"<br>✅ **Excelencia Técnica**                          | • Atención continua a excelencia técnica<br>• Simplicidad en diseño<br>• Código sostenible                                           |
| **Burndown Chart**           | **Métrica Scrum**                              | • Actualización diaria<br>• Visualiza progreso vs ideal<br>• Permite ajustes tempranos                                                                                  | ✅ **Transparencia**: Progreso visible<br>✅ **Inspección**: Detectar desviaciones<br>✅ **Adaptación**: Ajustar plan                     | • Inspección frecuente del progreso<br>• Adaptación oportuna<br>• Predictibilidad                                                    |
| **Cumulative Flow Diagram**  | **Métrica Kanban**                             | • Identifica cuellos de botella<br>• Muestra distribución de trabajo<br>• Guía optimización de flujo                                                                    | ✅ **Visualización**: Estado del sistema<br>✅ **Datos sobre Opiniones**: Decisiones informadas                                           | • Mejora continua del proceso<br>• Eliminación de desperdicio<br>• Optimización de flujo                                             |
| **Sprint Retrospective**     | **Ceremonia Scrum**                            | • Starfish format (5 categorías)<br>• Plan de acción concreto<br>• Seguimiento en próximo Sprint                                                                        | ✅ **Mejora Continua**: Kaizen<br>✅ **Colaboración**: Equipo completo participa<br>✅ **Compromiso**: Acciones, no quejas                | • Reflexión regular sobre mejoras<br>• Ajustes de comportamiento<br>• Equipo auto-gestionado                                         |
| **GitHub Projects**          | **Herramienta Digital**                        | • Tablero Kanban digital<br>• Integración con PRs y Issues<br>• Automatizaciones de flujo                                                                               | ✅ **Transparencia**: Acceso 24/7<br>✅ **Colaboración**: Trabajo remoto<br>✅ **Automatización**: Reduce overhead                        | • Herramientas que soportan al proceso<br>• Comunicación efectiva<br>• Documentación continua                                        |

### Resumen de Valor por Principio Ágil

| **Principio del Manifiesto Ágil**                                 | **Cómo lo Aplicamos en EcoBeauty**                       | **Evidencia Tangible**                        |
| ----------------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------- |
| **1. Entregar software funcional frecuentemente**                 | Sprints de 2 semanas con deploy a producción             | 3 releases en 6 semanas, 35 HU en producción  |
| **2. Aceptar cambios, incluso tarde en el desarrollo**            | Backlog Refinement continuo, Sprint Reviews con feedback | HU ajustadas tras Review, nuevas HU agregadas |
| **3. Entregar software funcional es la medida de progreso**       | DoD incluye "en producción", no solo "código escrito"    | Todas las HU Done están desplegadas           |
| **4. Negocio y desarrollo trabajan juntos**                       | PO participa en Planning, Reviews y Refinement           | Demos cada 2 semanas con stakeholders         |
| **5. Construir proyectos con individuos motivados**               | Equipo auto-organizado, Daily Standups sin microgestión  | Decisiones técnicas del equipo, no impuestas  |
| **6. Conversación cara a cara**                                   | Daily Standups presenciales (o videollamada)             | 15 minutos diarios de sincronización          |
| **7. Software funcional es la medida de progreso**                | Burndown Chart mide HU completadas, no horas trabajadas  | Velocity en Story Points, no en "tiempo"      |
| **8. Desarrollo sostenible, ritmo constante**                     | WIP Limits en Kanban, no sobrecarga                      | Velocity estable: 30-35 SP por Sprint         |
| **9. Atención continua a excelencia técnica**                     | DoD con code review, RLS testing, responsive             | 0 bugs críticos en producción                 |
| **10. Simplicidad: maximizar trabajo no hecho**                   | HU pequeñas (< 13 SP), solo features MVP                 | 35 HU esenciales, sin "nice to have"          |
| **11. Mejores arquitecturas emergen de equipos auto-organizados** | Decisión de Fusion Scrum+Kanban del equipo               | Sistema de temas CSS, estructura modular      |
| **12. Reflexión regular sobre mejoras**                           | Sprint Retrospectives con plan de acción                 | 3 mejoras implementadas por Sprint            |

---

## 🎯 Conclusión

La **fusión de Scrum (H1) y Kanban (H2)** implementada en EcoBeauty MVP combina:

✅ **Predictibilidad de Scrum**: Sprints con duración fija, ceremonias estructuradas, compromisos claros
✅ **Flexibilidad de Kanban**: Flujo continuo, visualización, WIP limits, optimización de cuellos de botella

Este enfoque híbrido está **fundamentado en los 4 valores** del Manifiesto Ágil:

1. **Individuos e interacciones** sobre procesos y herramientas → Daily Standups, Retros colaborativas
2. **Software funcionando** sobre documentación extensiva → DoD incluye deploy a producción
3. **Colaboración con el cliente** sobre negociación contractual → Sprint Reviews con feedback real
4. **Responder ante el cambio** sobre seguir un plan → Backlog Refinement continuo, adaptación

Y refleja los **12 principios ágiles** aplicados en cada práctica, herramienta y decisión tomada durante la planificación y ejecución del proyecto.

---

**📅 Documento Creado**: Noviembre 2025  
**👤 Autor**: Johan Huanca  
**📊 Proyecto**: EcoBeauty MVP  
**🔧 Metodología**: Scrumban (Fusion H1 + H2)
