-- ##############################################################
-- ## 🧪 DATA DE PRUEBA PARA ECOBEAUTY
-- ##############################################################
-- IMPORTANTE: Este script asume que ya tienes usuarios creados en Supabase Auth.
-- Primero necesitas obtener los UUIDs de tus usuarios reales desde la tabla auth.users
-- y reemplazar los UUIDs de ejemplo aquí.

-- Para obtener tus UUIDs reales, ejecuta esto primero:
-- SELECT id, email FROM auth.users;

-- UUIDs reales configurados:
-- Usuario 1 (Experto): 0ece4fef-48d5-4dd2-b009-89b41083ddeb
-- Usuario 2 (Experto/Novice): 441a923b-01e5-4271-ab52-fee115c469b2


-- ##############################################################
-- ## 📜 TUTORIALES DE PRUEBA
-- ##############################################################

-- Tutorial 1: Jabón Natural de Lavanda
INSERT INTO public.tutorials (profile_id, title, description, video_url, created_at)
VALUES (
  '0ece4fef-48d5-4dd2-b009-89b41083ddeb',
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
  '0ece4fef-48d5-4dd2-b009-89b41083ddeb',
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
  '441a923b-01e5-4271-ab52-fee115c469b2',
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
  '441a923b-01e5-4271-ab52-fee115c469b2',
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
  '0ece4fef-48d5-4dd2-b009-89b41083ddeb',
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
  '441a923b-01e5-4271-ab52-fee115c469b2',
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
  '441a923b-01e5-4271-ab52-fee115c469b2',
  1,
  '¡Me encantó este tutorial! Hice mi primer jabón y quedó perfecto. Gracias por compartir 🌸',
  NOW() - INTERVAL '2 days'
),
(
  '441a923b-01e5-4271-ab52-fee115c469b2',
  1,
  'Excelente trabajo. Una sugerencia: también puedes agregar un poco de avena molida para efecto exfoliante.',
  NOW() - INTERVAL '1 day'
);

-- Respuesta al comentario anterior
INSERT INTO public.tutorial_comments (profile_id, tutorial_id, parent_comment_id, content, created_at)
VALUES 
(
  '0ece4fef-48d5-4dd2-b009-89b41083ddeb',
  1,
  2, -- ID del comentario al que responde
  '¡Gracias por el tip! Tienes razón, la avena es una excelente adición. Lo mencionaré en mi próximo video 👍',
  NOW() - INTERVAL '12 hours'
);

-- Comentarios en Tutorial 3 (Champú Sólido)
INSERT INTO public.tutorial_comments (profile_id, tutorial_id, content, created_at)
VALUES 
(
  '441a923b-01e5-4271-ab52-fee115c469b2',
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


-- ##############################################################
-- ## 💬 ÉPICA 2: COMUNIDAD - DATA DE PRUEBA
-- ##############################################################

-- Publicación 1: Pregunta sobre ingredientes
INSERT INTO public.posts (profile_id, content, created_at)
VALUES (
  '441a923b-01e5-4271-ab52-fee115c469b2',
  '¡Hola comunidad! 👋 Estoy empezando en el mundo de la cosmética natural y tengo una duda: ¿puedo sustituir el aceite de jojoba por aceite de almendras en la receta de crema facial? ¿Alguien lo ha probado?',
  NOW() - INTERVAL '6 hours'
);

-- Publicación 2: Compartir éxito con imagen
INSERT INTO public.posts (profile_id, content, image_url, created_at)
VALUES (
  '0ece4fef-48d5-4dd2-b009-89b41083ddeb',
  '¡Mi primer lote de jabones de lavanda quedó perfecto! 💜✨

Después de varios intentos fallidos, finalmente logré la textura y el aroma que buscaba. La clave estuvo en respetar los tiempos de saponificación y no apurarme.

Tips que aprendí:
- Temperatura ideal: 40-45°C
- No exceder con el aceite esencial (30ml por kilo)
- Dejar curar mínimo 4 semanas

¿Alguien más hace jabones artesanales? Me encantaría intercambiar recetas 🧼',
  'https://images.unsplash.com/photo-1600428568596-47eb5b89f0cb?w=800&h=600&fit=crop',
  NOW() - INTERVAL '3 days'
);

-- Publicación 3: Consejo de experto
INSERT INTO public.posts (profile_id, content, created_at)
VALUES (
  '441a923b-01e5-4271-ab52-fee115c469b2',
  '🌿 CONSEJO DEL DÍA: Almacenamiento de productos naturales

Muchos me preguntan por qué sus cremas caseras se ponen rancias rápidamente. Aquí van algunos tips esenciales:

1. SIEMPRE usa recipientes esterilizados
2. Agrega vitamina E como antioxidante natural
3. Guarda en el refrigerador los productos con agua
4. Usa espátulas limpias, nunca los dedos
5. Etiqueta con fecha de elaboración

Los productos naturales duran menos que los comerciales porque no tienen conservantes sintéticos. ¡Esto es algo bueno! Significa que son más seguros para tu piel 💚

¿Qué otros tips agregarían?',
  NOW() - INTERVAL '1 day'
);

-- Publicación 4: Compartir tutorial externo
INSERT INTO public.posts (profile_id, content, created_at)
VALUES (
  '441a923b-01e5-4271-ab52-fee115c469b2',
  '¿Alguien más vio el tutorial de champú sólido? Lo hice este fin de semana y funcionó increíble! Mi cabello nunca había estado tan suave y con tanto volumen.

Lo mejor es que ahora no uso botellas plásticas 🌍♻️

Próximamente voy a intentar hacer el desodorante natural. ¿Alguien lo ha probado? ¿Realmente funciona?',
  NOW() - INTERVAL '5 hours'
);

-- Publicación 5: Problema y solicitud de ayuda
INSERT INTO public.posts (profile_id, content, image_url, created_at)
VALUES (
  '0ece4fef-48d5-4dd2-b009-89b41083ddeb',
  'AYUDA: Mi crema se separó 😭

Hice una crema facial siguiendo una receta pero después de unos días se separó en dos fases. ¿Qué pudo haber salido mal?

Ingredientes que usé:
- Agua de rosas
- Aceite de coco
- Cera emulsionante
- Vitamina E

¿Alguien sabe qué paso me salté o hice mal? Adjunto foto del resultado.',
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop',
  NOW() - INTERVAL '2 hours'
);


-- ##############################################################
-- ## 💬 COMENTARIOS EN PUBLICACIONES
-- ##############################################################

-- Comentarios en Publicación 1 (pregunta sobre jojoba)
INSERT INTO public.post_comments (profile_id, post_id, content, created_at)
VALUES 
(
  '441a923b-01e5-4271-ab52-fee115c469b2',
  1,
  'Sí puedes sustituirlo! Ambos son aceites ligeros y no comedogénicos. El de almendras es un poco más nutritivo pero la textura será muy similar 😊',
  NOW() - INTERVAL '5 hours'
),
(
  '0ece4fef-48d5-4dd2-b009-89b41083ddeb',
  1,
  'Yo siempre uso aceite de almendras y me funciona perfecto. Solo ten en cuenta que tiene un aroma más suave que el jojoba.',
  NOW() - INTERVAL '4 hours'
);

-- Respuesta agradeciendo
INSERT INTO public.post_comments (profile_id, post_id, content, created_at)
VALUES 
(
  '441a923b-01e5-4271-ab52-fee115c469b2',
  1,
  '¡Muchas gracias a ambos! Me voy a animar a probar entonces. Les cuento cómo me va 💚',
  NOW() - INTERVAL '3 hours'
);

-- Comentarios en Publicación 2 (jabones exitosos)
INSERT INTO public.post_comments (profile_id, post_id, content, created_at)
VALUES 
(
  '441a923b-01e5-4271-ab52-fee115c469b2',
  2,
  '¡Qué hermosos quedaron! Me encantan los colores. Yo recién empiezo y todavía me da miedo trabajar con soda cáustica 😅',
  NOW() - INTERVAL '2 days'
),
(
  '441a923b-01e5-4271-ab52-fee115c469b2',
  2,
  'Excelente trabajo! Los tonos están muy parejos. ¿Usaste colorante natural o mica?',
  NOW() - INTERVAL '2 days'
);

-- Comentarios en Publicación 3 (consejo de almacenamiento)
INSERT INTO public.post_comments (profile_id, post_id, content, created_at)
VALUES 
(
  '441a923b-01e5-4271-ab52-fee115c469b2',
  3,
  'Súper útil! No sabía lo de la vitamina E como antioxidante. ¿Qué porcentaje recomiendas agregar?',
  NOW() - INTERVAL '20 hours'
);

-- Comentarios en Publicación 5 (crema separada)
INSERT INTO public.post_comments (profile_id, post_id, content, created_at)
VALUES 
(
  '441a923b-01e5-4271-ab52-fee115c469b2',
  5,
  'Probablemente no emulsionaste lo suficiente o las temperaturas no estaban parejas. Tienes que mezclar la fase acuosa y oleosa cuando ambas estén a 70-75°C y batir con minipimer por al menos 2 minutos.',
  NOW() - INTERVAL '1 hour'
),
(
  '441a923b-01e5-4271-ab52-fee115c469b2',
  5,
  'A mí me pasó lo mismo la primera vez. Usa un termómetro de cocina para controlar bien las temperaturas, hace toda la diferencia!',
  NOW() - INTERVAL '30 minutes'
);


-- ##############################################################
-- ## 🔧 NOTA SOBRE STORAGE BUCKET
-- ##############################################################

/*
IMPORTANTE: Para que las imágenes funcionen, necesitas crear el bucket en Supabase:

1. Ve a Storage en tu dashboard de Supabase
2. Crea un nuevo bucket llamado "posts"
3. Configúralo como público
4. Las imágenes se subirán automáticamente desde el frontend

Las URLs de ejemplo en este script usan Unsplash solo para demostración.
*/
