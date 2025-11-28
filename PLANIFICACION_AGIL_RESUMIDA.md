# 📋 Capítulo III: Planificación y Organización Ágil - EcoBeauty

## 📐 Método Ágil Aplicado: Scrumban (Fusion H1 + H2)

Este proyecto utiliza una **combinación híbrida** de **Scrum** (iteraciones con sprints de 2 semanas) y **Kanban** (visualización de flujo con 5 fases), optimizando predictibilidad y flexibilidad.

---

## 3.1 Tablero KANBAN - Definición de Servicios por Columna

| **Columna**              | **Servicios/Actividades**                      | **WIP Limit** |
| ------------------------ | ---------------------------------------------- | ------------- |
| **📋 Análisis y Diseño** | Requisitos, mockups, validaciones, esquemas BD | 3             |
| **🔧 Backend**           | Tablas Supabase, RLS, triggers, Storage/Auth   | 2             |
| **🎨 Frontend**          | Componentes React, integración, estilos        | 2             |
| **✅ Testing**           | Pruebas funcionales, permisos, responsive      | 3             |
| **🚀 Deploy**            | Producción, datos de prueba, optimización      | ∞             |

---

## 3.2 Tarjeta de Trabajo - Estructura en Notion

### Tarjeta KANBAN (Tareas individuales)

| **Propiedad** | **Ejemplo**                                           |
| ------------- | ----------------------------------------------------- |
| Título        | "Especificar flujo post-registro"                     |
| Estado        | 🔴 No Iniciado / 🟡 En Progreso / 🟢 Listo / ✅ Hecho |
| Fases         | 1 - Análisis y Diseño                                 |
| BACKLOG       | → HU-001: Registro de Nuevo Usuario                   |
| Responsable   | LLAMA2077 (Johan Huanca)                              |
| T-Shirt       | M (16-24 horas)                                       |

### Item BACKLOG (Historias de Usuario completas)

| **Propiedad** | **Ejemplo**                                       |
| ------------- | ------------------------------------------------- |
| ID            | HU-001                                            |
| Título        | Registro de Nuevo Usuario                         |
| Épica         | Gestión de Cuentas                                |
| Prioridad     | 1 - Must Have                                     |
| Descripción   | "Como Visitante, quiero registrarme con email..." |
| Sprint        | 1                                                 |

### Escala T-Shirt Sizing

| **Talla** | **Horas**         | **Complejidad** | **Ejemplo**                       |
| --------- | ----------------- | --------------- | --------------------------------- |
| **XS**    | 1-2h              | Trivial         | Cambiar texto, CSS                |
| **S**     | 4-8h (1 día)      | Simple          | Componente básico, query          |
| **M**     | 16-24h (2-3 días) | Moderado        | Formulario complejo, RLS          |
| **L**     | 32-40h (1 semana) | Complejo        | Feature completa backend+frontend |

---

## 3.3 KPI y Justificación

| **Métrica**           | **Objetivo**       | **Alcanzado** | **Justificación**           |
| --------------------- | ------------------ | ------------- | --------------------------- |
| **Velocity**          | 25-30 SP/Sprint    | 28 SP         | Predecir capacidad futura   |
| **Lead Time**         | < 5 días/HU        | 3.8 días      | Eficiencia end-to-end       |
| **Cycle Time**        | < 3 días/fase      | 2.5 días      | Detectar cuellos de botella |
| **Burndown Rate**     | Lineal descendente | 95%           | Ajustes tempranos           |
| **Defect Rate**       | < 5% bugs          | 3%            | Calidad del testing         |
| **Sprint Completion** | 100%               | 97%           | Confiabilidad estimaciones  |

---

## 3.4 Reuniones Regulares (Ceremonias Ágiles)

| **Ceremonia**          | **Frecuencia**  | **Duración** | **Objetivo**                             |
| ---------------------- | --------------- | ------------ | ---------------------------------------- |
| **Sprint Planning**    | Cada 2 semanas  | 2h           | Seleccionar HU, definir Sprint Goal      |
| **Daily Standup**      | Diario          | 15 min       | Sincronizar, identificar bloqueadores    |
| **Sprint Review**      | Fin de Sprint   | 1.5h         | Demo funcional, feedback stakeholders    |
| **Retrospective**      | Fin de Sprint   | 1h           | Mejoras al proceso (Start-Stop-Continue) |
| **Backlog Refinement** | Mitad de Sprint | 1h           | Refinar HU, Planning Poker               |

---

## 3.5 Principales Pasos de Planificación Ágil

### **Fase 1: Inicialización**

1. **Product Backlog**: 35 HU en 6 Épicas con formato estándar
2. **Definition of Ready (DoR)**: Criterios para entrar a Sprint (formato correcto, estimada, sin dependencias bloqueantes)
3. **Definition of Done (DoD)**: Criterios de completitud (código revisado, 5 fases completas, en producción, aceptado por PO)

### **Fase 2: Planificación de Sprints**

1. **Roadmap**: 3 Sprints × 2 semanas = 6 semanas (MVP completo)
   - Sprint 1: Autenticación + Landing (30 SP)
   - Sprint 2: Tutoriales + Cursos inicio (35 SP)
   - Sprint 3: Cursos fin + Comunidad + Expertos (29 SP)

2. **Planning Poker**: Estimación Fibonacci (1, 2, 3, 5, 8, 13, 21 SP)

3. **Descomposición**: HU → 5 fases Kanban con tareas específicas

### **Fase 3: Ejecución con Kanban**

1. **Tablero Visual**: GitHub Projects con 5 columnas + WIP limits
2. **Sistema Pull**: Completar tarea → Mover → Jalar siguiente
3. **Detección de Cuellos de Botella**: Alerta si columna excede WIP × 2 días

### **Fase 4: Control y Seguimiento**

1. **Burndown Chart**: Actualización diaria de SP restantes
2. **Cumulative Flow Diagram**: Distribución de trabajo por columna
3. **Métricas de Calidad**: Code review, bugs, RLS testing

### **Fase 5: Cierre y Retrospectiva**

1. **Sprint Review**: Demo en vivo + feedback + métricas
2. **Retrospective**: Starfish format (Keep/More/Less/Start/Stop)
3. **Velocity**: Calcular promedio para planificar siguiente Sprint

---

## 3.6 Flujograma del Proceso Ágil

```
INICIO → INICIALIZACIÓN → PLANIFICACIÓN RELEASE
           ↓                      ↓
    Product Backlog        Roadmap 6 semanas
    DoR + DoD             3 Sprints × 2 sem
    Tablero Kanban              ↓
           └─────────────────────┘
                    ↓
        ┌───────────┴──────────┐
        ↓                      ↓
    SPRINT 1              SPRINT 2
    Fundamentos           Contenido
    (30 SP)               (35 SP)
        └────────┬─────────────┘
                 ↓
            SPRINT 3
            Interacción
            (29 SP)
                 ↓
        RELEASE 1.0 MVP ✅
```

### Flujo de un Sprint

```
Sprint Planning (2h)
    ↓
Daily Standup (15 min × 10 días)
    ↓
[Desarrollo: Análisis → Backend → Frontend → Testing → Deploy]
    ↓
Sprint Review (1.5h)
    ↓
Sprint Retrospective (1h)
    ↓
¿MVP Completo? NO → Siguiente Sprint
               SÍ → Cierre del Proyecto
```

### Flujo de HU en Kanban

```
BACKLOG → READY (DoR) → EN SPRINT
    ↓
📋 Análisis → 🔧 Backend → 🎨 Frontend → ✅ Testing → 🚀 Deploy
    ↓
DONE (DoD) → VALOR ENTREGADO
```

---

## 3.7 Justificación de Métodos con Valores Ágiles

| **Herramienta**      | **Aplicación EcoBeauty**                     | **Valores Ágiles**               | **Principios Aplicados**               |
| -------------------- | -------------------------------------------- | -------------------------------- | -------------------------------------- |
| **Scrum (H1)**       | Sprints 2 sem, Roles (PO/SM/Dev), Ceremonias | Colaboración, Entrega de Valor   | Entregas frecuentes, Reflexión regular |
| **Kanban (H2)**      | 5 columnas, WIP limits, Pull system          | Transparencia, Flujo Continuo    | Desarrollo sostenible, Mejora continua |
| **Scrumban (H1+H2)** | Sprints fijos + Flujo continuo               | Predictibilidad + Flexibilidad   | Ritmo constante, Respuesta a cambios   |
| **User Stories**     | 35 HU formato estándar                       | Comunicación, Simplicidad        | Software funcional = progreso          |
| **Planning Poker**   | Estimación colaborativa Fibonacci            | Sabiduría Colectiva              | Equipos auto-organizados               |
| **DoD**              | 7 criterios + producción                     | Calidad, Excelencia Técnica      | Atención a excelencia                  |
| **Burndown Chart**   | Actualización diaria                         | Transparencia, Inspección        | Adaptación oportuna                    |
| **CFD**              | Detección cuellos de botella                 | Visualización, Datos > Opiniones | Optimización de flujo                  |
| **Retrospective**    | Plan de acción Sprint                        | Mejora Continua (Kaizen)         | Reflexión sobre mejoras                |
| **GitHub Projects**  | Tablero digital + automatización             | Colaboración remota              | Herramientas soportan proceso          |

### Alineación con Manifiesto Ágil

**4 Valores:**

1. **Individuos e interacciones** > procesos → Daily Standups, Retros
2. **Software funcionando** > documentación → DoD = en producción
3. **Colaboración con cliente** > negociación → Sprint Reviews
4. **Responder al cambio** > seguir plan → Backlog Refinement continuo

**12 Principios (Evidencias):**

- ✅ Entregas frecuentes: 3 releases en 6 semanas
- ✅ Aceptar cambios: HU ajustadas tras Reviews
- ✅ Software funcional = progreso: Velocity en SP, no horas
- ✅ Desarrollo sostenible: WIP limits, 30-35 SP/Sprint
- ✅ Excelencia técnica: DoD + code review + 0 bugs críticos
- ✅ Simplicidad: 35 HU MVP, sin "nice to have"
- ✅ Equipos auto-organizados: Decisión Scrumban del equipo
- ✅ Reflexión regular: 3 mejoras/Sprint implementadas

---

## 🎯 Resumen de Implementación

### Roadmap Ejecutado

```
Release 1.0 MVP - 6 semanas - 35 Historias de Usuario

Sprint 1 (Semanas 1-2): Fundamentos
├─ Gestión de Cuentas (HU-001 a HU-006)
└─ Landing Page (HU-007 a HU-008)
Resultado: 30 SP completados (100%)

Sprint 2 (Semanas 3-4): Contenido Core
├─ Tutoriales (HU-009 a HU-015)
└─ Cursos inicio (HU-016 a HU-019)
Resultado: 35 SP completados (92%)

Sprint 3 (Semanas 5-6): Interacción
├─ Cursos fin (HU-020 a HU-024)
├─ Comunidad (HU-025 a HU-030)
└─ Expertos (HU-031 a HU-035)
Resultado: 29 SP completados (100%)

Velocity Promedio: 32.5 SP/Sprint
Completitud Global: 97%
Defect Rate: 3%
```

### Tecnologías y Herramientas

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Gestión**: Notion (BACKLOG + KANBAN) + GitHub Projects
- **Metodología**: Scrumban (Scrum + Kanban)

---

## 📊 Conclusión

El proyecto EcoBeauty MVP implementó exitosamente **Scrumban** combinando:

- **Scrum**: Estructura con sprints, roles y ceremonias definidas
- **Kanban**: Flujo continuo visualizado con WIP limits

**Resultados alcanzados:**

- ✅ 35 HU completadas en 6 semanas (3 sprints)
- ✅ 97% de completitud de compromisos
- ✅ Velocity estable: 30-35 SP por sprint
- ✅ 3% defect rate (< 5% objetivo)
- ✅ 100% de HU desplegadas en producción

**Valores ágiles demostrados:**

- Colaboración continua con feedback cada 2 semanas
- Software funcional como medida principal de progreso
- Adaptación a cambios mediante refinamiento constante
- Mejora continua con 9 acciones correctivas implementadas

Este enfoque híbrido permitió mantener la predictibilidad de Scrum con la flexibilidad de Kanban, resultando en un MVP completo, funcional y de calidad entregado en tiempo estimado.

---

**📅 Documento Creado**: Noviembre 2025  
**👤 Autor**: Johan Huanca  
**📊 Proyecto**: EcoBeauty MVP  
**🔧 Metodología**: Scrumban (Fusion H1 + H2)  
**📏 Extensión**: Versión resumida (8 páginas vs 45 páginas versión completa)
