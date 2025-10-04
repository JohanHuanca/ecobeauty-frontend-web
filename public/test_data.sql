-- ##############################################################
-- ## 🧪 DATA DE PRUEBA PARA ECOBEAUTY
-- ##############################################################
-- IMPORTANTE: Este script asume que ya tienes usuarios creados en Supabase Auth.
-- Primero necesitas obtener los UUIDs de tus usuarios reales desde la tabla auth.users
-- y reemplazar los UUIDs de ejemplo aquí.

-- Para obtener tus UUIDs reales, ejecuta esto primero:
-- SELECT id, email FROM auth.users;

-- Luego reemplaza estos UUIDs de ejemplo con los reales:
-- Usuario 1 (Experto): Reemplaza 'uuid-experto-1' con un UUID real
-- Usuario 2 (Experto): Reemplaza 'uuid-experto-2' con un UUID real  
-- Usuario 3 (Principiante): Reemplaza 'uuid-novice-1' con un UUID real


-- ##############################################################
-- ## 📜 TUTORIALES DE PRUEBA
-- ##############################################################

-- Tutorial 1: Jabón Natural de Lavanda
INSERT INTO public.tutorials (profile_id, title, description, video_url, created_at)
VALUES (
  'uuid-experto-1', -- REEMPLAZA CON UUID REAL
  'Cómo hacer jabón natural de lavanda',
  'En este tutorial aprenderás a crear tu propio jabón natural de lavanda desde cero. Utilizaremos ingredientes 100% naturales y aceites esenciales puros. Es un proceso sencillo que te tomará aproximadamente 1 hora, y el resultado es un jabón suave y aromático perfecto para piel sensible.

Ingredientes necesarios:
- 500g de aceite de oliva
- 200g de aceite de coco
- 100g de manteca de karité
- 110g de soda cáustica
- 250ml de agua destilada
- 30ml de aceite esencial de lavanda
- 2 cucharadas de flores de lavanda secas

El proceso incluye la preparación de la lejía, mezcla de aceites, saponificación y curado.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  NOW() - INTERVAL '5 days'
);

-- Tutorial 2: Crema Facial Hidratante
INSERT INTO public.tutorials (profile_id, title, description, video_url, created_at)
VALUES (
  'uuid-experto-1', -- REEMPLAZA CON UUID REAL
  'Crema facial hidratante con aloe vera',
  'Aprende a preparar una crema facial hidratante natural con aloe vera, ideal para todo tipo de piel. Esta receta es perfecta para principiantes y usa ingredientes fáciles de conseguir.

Ingredientes:
- 50ml de gel de aloe vera puro
- 30ml de aceite de jojoba
- 10ml de vitamina E
- 5 gotas de aceite esencial de rosa mosqueta
- 1 cucharadita de cera emulsionante

Esta crema se absorbe rápidamente, no deja sensación grasosa y es perfecta para usar día y noche. Tiene una duración aproximada de 2 meses si se mantiene refrigerada.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  NOW() - INTERVAL '3 days'
);

-- Tutorial 3: Champú Sólido
INSERT INTO public.tutorials (profile_id, title, description, video_url, created_at)
VALUES (
  'uuid-experto-2', -- REEMPLAZA CON UUID REAL
  'Champú sólido ecológico para cabello graso',
  'Descubre cómo hacer tu propio champú sólido sin plásticos ni químicos agresivos. Esta receta es especialmente efectiva para cabellos grasos y da volumen natural.

¿Por qué usar champú sólido?
- Libre de plásticos
- Dura 3 veces más que un champú líquido
- Perfecto para viajar
- No contiene sulfatos ni parabenos

Ingredientes principales:
- Tensioactivo SCI (Sodium Cocoyl Isethionate)
- Arcilla verde
- Aceite esencial de árbol de té
- Aceite esencial de romero
- Proteína de trigo

El resultado es un champú que limpia profundamente sin resecar el cuero cabelludo.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  NOW() - INTERVAL '1 day'
);

-- Tutorial 4: Desodorante Natural
INSERT INTO public.tutorials (profile_id, title, description, video_url, created_at)
VALUES (
  'uuid-experto-2', -- REEMPLAZA CON UUID REAL
  'Desodorante natural en crema sin aluminio',
  'Tutorial paso a paso para crear un desodorante natural efectivo que realmente funciona. Sin aluminio, sin alcohol, sin irritantes.

Esta receta ha sido probada y perfeccionada durante años. Es efectiva incluso para personas con sudoración intensa y no mancha la ropa.

Ingredientes:
- 3 cucharadas de aceite de coco
- 2 cucharadas de manteca de karité
- 2 cucharadas de bicarbonato de sodio
- 2 cucharadas de almidón de maíz
- 10 gotas de aceite esencial de lavanda
- 5 gotas de aceite esencial de árbol de té

Tiempo de preparación: 15 minutos
Duración: 6-8 meses si se mantiene en lugar fresco',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  NOW() - INTERVAL '7 hours'
);

-- Tutorial 5: Bálsamo Labial
INSERT INTO public.tutorials (profile_id, title, description, video_url, created_at)
VALUES (
  'uuid-experto-1', -- REEMPLAZA CON UUID REAL
  'Bálsamo labial nutritivo con miel y cacao',
  'Aprende a hacer bálsamos labiales caseros 100% naturales. Perfectos para regalar o para tu uso personal. Esta receta rinde para aproximadamente 10 tubos pequeños.

Beneficios:
- Hidratación profunda
- Protección contra el frío y el viento
- Ingredientes comestibles (seguro si lo lames)
- Sin petrolatos ni químicos

Ingredientes:
- 2 cucharadas de cera de abeja
- 2 cucharadas de manteca de cacao
- 2 cucharadas de aceite de coco
- 1 cucharadita de miel
- 5 gotas de aceite esencial de menta (opcional)

También te enseñaré diferentes variaciones: con color natural, con sabores, con vitamina E extra.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  NOW() - INTERVAL '2 hours'
);

-- Tutorial 6: Exfoliante Corporal
INSERT INTO public.tutorials (profile_id, title, description, video_url, created_at)
VALUES (
  'uuid-experto-2', -- REEMPLAZA CON UUID REAL
  'Exfoliante corporal de café y azúcar',
  'Un exfoliante casero súper efectivo que deja tu piel suave como la seda. Además, ayuda a mejorar la circulación y reduce la apariencia de celulitis.

Este exfoliante es perfecto para usar 2-3 veces por semana y los resultados se notan desde la primera aplicación.

Receta base:
- 1 taza de café molido usado (reciclado!)
- 1/2 taza de azúcar morena
- 1/2 taza de aceite de coco derretido
- 1 cucharadita de extracto de vainilla

Variaciones que enseñaré:
- Con aceite de almendras para piel seca
- Con sal marina para exfoliación intensa
- Con aceites esenciales energizantes

Duración: 1 mes en recipiente hermético',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  NOW()
);


-- ##############################################################
-- ## 💬 COMENTARIOS EN TUTORIALES
-- ##############################################################

-- Comentarios en Tutorial 1 (Jabón de Lavanda)
INSERT INTO public.tutorial_comments (profile_id, tutorial_id, content, created_at)
VALUES 
(
  'uuid-novice-1', -- REEMPLAZA CON UUID REAL
  1,
  '¡Me encantó este tutorial! Hice mi primer jabón y quedó perfecto. Gracias por compartir 🌸',
  NOW() - INTERVAL '2 days'
),
(
  'uuid-experto-2', -- REEMPLAZA CON UUID REAL
  1,
  'Excelente trabajo. Una sugerencia: también puedes agregar un poco de avena molida para efecto exfoliante.',
  NOW() - INTERVAL '1 day'
);

-- Respuesta al comentario anterior
INSERT INTO public.tutorial_comments (profile_id, tutorial_id, parent_comment_id, content, created_at)
VALUES 
(
  'uuid-experto-1', -- REEMPLAZA CON UUID REAL (autor del tutorial)
  1,
  2, -- ID del comentario al que responde
  '¡Gracias por el tip! Tienes razón, la avena es una excelente adición. Lo mencionaré en mi próximo video 👍',
  NOW() - INTERVAL '12 hours'
);

-- Comentarios en Tutorial 3 (Champú Sólido)
INSERT INTO public.tutorial_comments (profile_id, tutorial_id, content, created_at)
VALUES 
(
  'uuid-novice-1', -- REEMPLAZA CON UUID REAL
  3,
  '¿Dónde puedo conseguir el tensioactivo SCI? No lo encuentro en tiendas locales 😕',
  NOW() - INTERVAL '5 hours'
);


-- ##############################################################
-- ## 📝 NOTAS IMPORTANTES
-- ##############################################################

/*
PASOS PARA USAR ESTE SCRIPT:

1. Primero, ejecuta esto en tu SQL Editor de Supabase para ver tus usuarios:
   SELECT id, email FROM auth.users;

2. Copia los UUIDs reales de tus usuarios.

3. Reemplaza en este archivo:
   - 'uuid-experto-1' con el UUID de un usuario que tenga rol 'expert'
   - 'uuid-experto-2' con el UUID de otro usuario expert
   - 'uuid-novice-1' con el UUID de un usuario con rol 'novice'

4. Ejecuta este script completo en el SQL Editor de Supabase.

5. ¡Listo! Ahora tendrás 6 tutoriales y algunos comentarios de prueba.

ALTERNATIVA RÁPIDA:
Si quieres usar tus propios UUIDs directamente en el INSERT, 
puedes hacer algo como esto:

INSERT INTO public.tutorials (profile_id, title, description, video_url)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'tu-email@example.com' LIMIT 1),
  'Título del tutorial',
  'Descripción...',
  'https://www.youtube.com/embed/...'
);
*/
