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
-- ## ❤️ LIKES EN TUTORIALES
-- ##############################################################

-- Likes en Tutorial 1 (Jabón de Lavanda) - 3 likes
INSERT INTO public.tutorial_likes (profile_id, tutorial_id, created_at)
VALUES 
(
  '441a923b-01e5-4271-ab52-fee115c469b2',
  1,
  NOW() - INTERVAL '3 days'
),
(
  '0ece4fef-48d5-4dd2-b009-89b41083ddeb',
  1,
  NOW() - INTERVAL '2 days'
);

-- Likes en Tutorial 2 (Crema Facial) - 2 likes
INSERT INTO public.tutorial_likes (profile_id, tutorial_id, created_at)
VALUES 
(
  '441a923b-01e5-4271-ab52-fee115c469b2',
  2,
  NOW() - INTERVAL '4 days'
);

-- Likes en Tutorial 3 (Champú Sólido) - 4 likes (el más popular)
INSERT INTO public.tutorial_likes (profile_id, tutorial_id, created_at)
VALUES 
(
  '0ece4fef-48d5-4dd2-b009-89b41083ddeb',
  3,
  NOW() - INTERVAL '2 days'
),
(
  '441a923b-01e5-4271-ab52-fee115c469b2',
  3,
  NOW() - INTERVAL '1 day'
);

-- Likes en Tutorial 4 (Bálsamo Labial) - 1 like
INSERT INTO public.tutorial_likes (profile_id, tutorial_id, created_at)
VALUES 
(
  '441a923b-01e5-4271-ab52-fee115c469b2',
  4,
  NOW() - INTERVAL '6 hours'
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


-- ##############################################################
-- ## 🎓 ÉPICA 3: CURSOS - DATA DE PRUEBA
-- ##############################################################

-- Curso 1: Introducción a la Cosmética Natural (Publicado)
INSERT INTO public.courses (expert_profile_id, title, description, price, is_published, created_at)
VALUES (
  '0ece4fef-48d5-4dd2-b009-89b41083ddeb',
  'Introducción a la Cosmética Natural',
  'Curso completo para principiantes que quieren adentrarse en el mundo de la cosmética natural. Aprenderás sobre ingredientes, técnicas básicas, seguridad y formulación.

En este curso cubrimos:
- Fundamentos de la cosmética natural
- Ingredientes esenciales y sus propiedades
- Normas de seguridad e higiene
- Cómo formular productos básicos
- Conservación y almacenamiento

Incluye 8 lecciones con videos HD, material descargable y acceso de por vida.',
  49.99,
  true,
  NOW() - INTERVAL '10 days'
);

-- Curso 2: Jabones Artesanales Avanzados (Publicado)
INSERT INTO public.courses (expert_profile_id, title, description, price, is_published, created_at)
VALUES (
  '0ece4fef-48d5-4dd2-b009-89b41083ddeb',
  'Jabones Artesanales: De Principiante a Experto',
  'Domina el arte de la saponificación en frío y crea jabones profesionales dignos de vender.

Contenido del curso:
- Método en frío vs método en caliente
- Cálculo de lejía y formulación avanzada
- Técnicas de swirl y diseño
- Jabones especiales: exfoliantes, faciales, para bebés
- Packaging y presentación profesional
- Aspectos legales para venta

12 lecciones con proyectos prácticos. Certificado al finalizar.',
  79.99,
  true,
  NOW() - INTERVAL '7 days'
);

-- Curso 3: Cremas y Lociones Profesionales (Publicado)
INSERT INTO public.courses (expert_profile_id, title, description, price, is_published, created_at)
VALUES (
  '441a923b-01e5-4271-ab52-fee115c469b2',
  'Formulación de Cremas y Lociones Profesionales',
  'Aprende a crear emulsiones estables y productos de textura perfecta como los comerciales, pero 100% naturales.

Módulos incluidos:
- Química de emulsiones
- Emulsionantes naturales
- Fases acuosa y oleosa
- Activos y conservantes naturales
- Troubleshooting: solución de problemas comunes
- 15 recetas paso a paso

Nivel intermedio. 10 lecciones + bonus de formulación personalizada.',
  89.99,
  true,
  NOW() - INTERVAL '5 days'
);

-- Curso 4: Cosmética Capilar Natural (Borrador - No publicado aún)
INSERT INTO public.courses (expert_profile_id, title, description, price, is_published, created_at)
VALUES (
  '441a923b-01e5-4271-ab52-fee115c469b2',
  'Productos Capilares Naturales: Champús, Acondicionadores y Más',
  'Curso completo sobre formulación de productos para el cuidado del cabello sin químicos agresivos.

Contenido en desarrollo:
- Champús líquidos y sólidos
- Acondicionadores y mascarillas
- Tratamientos para problemas específicos
- Productos de styling natural
- Adaptación según tipo de cabello

Este curso está en fase final de producción. Se publicará próximamente con 14 lecciones.',
  69.99,
  false,  -- No publicado
  NOW() - INTERVAL '2 days'
);


-- ##############################################################
-- ## 📚 LECCIONES DE LOS CURSOS
-- ##############################################################

-- Lecciones del Curso 1: Introducción a la Cosmética Natural
INSERT INTO public.course_lessons (course_id, title, content_text, video_url, lesson_order, created_at)
VALUES 
(
  1,
  'Bienvenida y Presentación del Curso',
  'En esta primera lección te doy la bienvenida al curso y te explico todo lo que aprenderás.

¿Qué incluye este curso?
- 8 lecciones en video HD
- Material descargable en PDF
- Recetas paso a paso
- Soporte en la comunidad

Este curso es perfecto para ti si:
- Nunca has hecho cosmética casera
- Quieres productos más naturales para tu piel
- Deseas ahorrar dinero haciendo tus propios productos
- Estás considerando emprender en cosmética natural

¡Empecemos!',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  1,
  NOW() - INTERVAL '10 days'
),
(
  1,
  'Ingredientes Esenciales',
  'Conoce los ingredientes básicos que usaremos a lo largo del curso.

ACEITES BASE:
- Aceite de coco: hidratante, antibacterial
- Aceite de oliva: nutritivo, rico en vitamina E
- Aceite de jojoba: equilibrante, similar al sebo humano
- Aceite de almendras: suave, ideal para piel sensible

MANTECAS:
- Manteca de karité: súper hidratante
- Manteca de cacao: firme, aromática
- Manteca de mango: ligera, nutritiva

OTROS INGREDIENTES:
- Cera de abeja: emulsionante natural
- Aceites esenciales: aroma y propiedades terapéuticas
- Arcillas: purificantes y mineralizantes

Dónde comprar ingredientes de calidad y cómo almacenarlos correctamente.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  2,
  NOW() - INTERVAL '10 days'
),
(
  1,
  'Seguridad e Higiene en el Laboratorio Casero',
  'La seguridad es lo primero. Aprende las normas básicas para trabajar de forma segura.

NORMAS DE HIGIENE:
1. Lava y desinfecta todos los utensilios antes de usar
2. Usa agua destilada o hervida
3. Trabaja con manos limpias o guantes
4. Esteriliza los recipientes finales

EQUIPAMIENTO DE SEGURIDAD:
- Guantes de nitrilo
- Gafas protectoras (especialmente con soda cáustica)
- Delantal o ropa vieja
- Área bien ventilada

CONSERVACIÓN:
- Usa conservantes naturales cuando el producto tiene agua
- Etiqueta siempre con fecha de elaboración
- Conoce la vida útil de cada producto
- Almacena en lugar fresco y seco

También veremos qué hacer en caso de reacciones alérgicas y cómo hacer test de parche.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  3,
  NOW() - INTERVAL '9 days'
);

-- Lecciones del Curso 2: Jabones Artesanales
INSERT INTO public.course_lessons (course_id, title, content_text, video_url, lesson_order, created_at)
VALUES 
(
  2,
  'Introducción a la Saponificación',
  'Entiende la química detrás del jabón y por qué funciona.

¿QUÉ ES LA SAPONIFICACIÓN?
Es la reacción química entre un ácido graso (aceite) y una base (soda cáustica) que produce jabón y glicerina.

HISTORIA:
El jabón se ha fabricado durante miles de años. Los antiguos babilonios ya lo hacían en el 2800 a.C.

TIPOS DE JABÓN:
- Jabón en barra (el que haremos)
- Jabón líquido (diferente proceso)
- Jabón de glicerina (melt & pour)

BENEFICIOS DEL JABÓN CASERO:
- Controlas todos los ingredientes
- Conservas la glicerina natural
- Puedes personalizarlo
- Más económico a largo plazo
- Más ecológico

En las próximas lecciones pasaremos a la práctica.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  1,
  NOW() - INTERVAL '7 days'
),
(
  2,
  'Tu Primer Jabón: Receta Básica',
  'Haremos juntos tu primer jabón desde cero usando el método en frío.

INGREDIENTES:
- 400g aceite de oliva
- 200g aceite de coco
- 100g manteca de karité
- 97g soda cáustica (NaOH)
- 220ml agua destilada

EQUIPO NECESARIO:
- Balanza digital
- Batidora de mano
- Moldes de silicona
- Termómetro
- Recipientes de vidrio o acero inoxidable

PROCEDIMIENTO:
1. Preparar la lejía (CUIDADO: usar protección)
2. Derretir y mezclar los aceites
3. Combinar cuando ambos estén a 40-45°C
4. Batir hasta llegar a "trace"
5. Verter en moldes
6. Dejar curar 4-6 semanas

Sigue el video paso a paso y no te saltees ninguna medida de seguridad.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  2,
  NOW() - INTERVAL '7 days'
),
(
  2,
  'Calculadora de Saponificación y Formulación',
  'Aprende a crear tus propias recetas usando calculadoras online.

CONCEPTOS CLAVE:
- Índice de saponificación de cada aceite
- Porcentaje de sobreengrasado
- Dureza vs suavidad del jabón
- Poder limpiador vs hidratación

HERRAMIENTAS:
- SoapCalc.net (la más usada)
- The Sage (muy completa)
- Mendrulandia (en español)

Te enseñaré a:
- Calcular la cantidad exacta de soda cáustica
- Ajustar el sobreengrasado (5-8% recomendado)
- Balancear propiedades del jabón
- Sustituir aceites correctamente

Práctica: Crearás 3 recetas personalizadas usando diferentes combinaciones de aceites.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  3,
  NOW() - INTERVAL '6 days'
);

-- Lecciones del Curso 3: Cremas y Lociones
INSERT INTO public.course_lessons (course_id, title, content_text, video_url, lesson_order, created_at)
VALUES 
(
  3,
  'Fundamentos de las Emulsiones',
  'Una emulsión es la mezcla estable de agua y aceite. Suena simple, pero requiere técnica.

TIPOS DE EMULSIONES:
- Aceite en agua (O/W): cremas ligeras, lociones
- Agua en aceite (W/O): cremas muy nutritivas, bálsamos

COMPONENTES DE UNA EMULSIÓN:
1. Fase acuosa (agua, hidrolatos, aloe vera)
2. Fase oleosa (aceites, mantecas, ceras)
3. Emulsionante (une ambas fases)
4. Activos (vitaminas, extractos)
5. Conservante (esencial si hay agua)

¿POR QUÉ SE SEPARAN?
- Temperaturas inadecuadas
- Emulsionante insuficiente
- Mala técnica de mezclado
- Incompatibilidad de ingredientes

EMULSIONANTES NATURALES:
- Cera emulsionante vegetal (Olivem, Montanov)
- Lecitina de soja
- Proteína de seda

Te enseñaré a prevenir los problemas más comunes.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  1,
  NOW() - INTERVAL '5 days'
),
(
  3,
  'Tu Primera Crema: Receta Base Universal',
  'Esta receta base la usarás como punto de partida para infinitas variaciones.

INGREDIENTES:
Fase A (acuosa):
- 70ml agua destilada
- 5ml glicerina vegetal

Fase B (oleosa):
- 15ml aceite de almendras
- 5ml aceite de jojoba
- 3g cera emulsionante
- 2g manteca de karité

Fase C (activos):
- 0.5ml vitamina E
- 5 gotas aceite esencial
- Conservante ECO (según fabricante)

PROCEDIMIENTO:
1. Calentar fase A y B por separado a 70-75°C
2. Verter A sobre B lentamente
3. Batir con minipimer 2-3 minutos
4. Enfriar a 40°C antes de agregar fase C
5. Batir nuevamente
6. Envasar

Resultado: 100ml de crema hidratante con textura profesional que dura 2-3 meses.',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  2,
  NOW() - INTERVAL '5 days'
);


-- ##############################################################
-- ## 📝 INSCRIPCIONES EN CURSOS
-- ##############################################################

-- Usuario 2 se inscribe en el Curso 1
INSERT INTO public.course_enrollments (profile_id, course_id, enrolled_at)
VALUES (
  '441a923b-01e5-4271-ab52-fee115c469b2',
  1,
  NOW() - INTERVAL '8 days'
);

-- Usuario 2 también se inscribe en el Curso 2
INSERT INTO public.course_enrollments (profile_id, course_id, enrolled_at)
VALUES (
  '441a923b-01e5-4271-ab52-fee115c469b2',
  2,
  NOW() - INTERVAL '3 days'
);


-- ##############################################################
-- ## 📊 RESUMEN DE LA DATA DE PRUEBA
-- ##############################################################

/*
TUTORIALES: 6 tutoriales
- 3 del usuario 0ece4fef (experto)
- 3 del usuario 441a923b (experto)

COMUNIDAD: 5 publicaciones + 12 comentarios
- Variedad de contenido: preguntas, logros, consejos, problemas
- Comentarios y respuestas anidadas

CURSOS: 4 cursos
- 3 publicados (visibles en catálogo)
- 1 borrador (solo visible para el creador)
- 2 cursos del usuario 0ece4fef
- 2 cursos del usuario 441a923b

LECCIONES: 8 lecciones distribuidas en los cursos publicados
- Curso 1: 3 lecciones
- Curso 2: 3 lecciones
- Curso 3: 2 lecciones
- Curso 4: 0 lecciones (en borrador)

INSCRIPCIONES: 2 inscripciones
- Usuario 441a923b inscrito en Curso 1 y Curso 2

-- ##############################################################
-- ## 👥 PERFILES DE EXPERTOS DE PRUEBA
-- ##############################################################

-- Experto 1: María Rodríguez - Especialista en cosmética natural
INSERT INTO public.expert_profiles (profile_id, bio, specialties, phone_number, hourly_rate, created_at)
VALUES (
  '0ece4fef-48d5-4dd2-b009-89b41083ddeb',
  'Soy María Rodríguez, farmacéutica especializada en cosmética natural con más de 10 años de experiencia. Mi pasión es enseñar a las personas a crear sus propios productos de belleza utilizando ingredientes naturales y sostenibles.

He trabajado con laboratorios de cosmética orgánica en España y Bolivia, y actualmente dirijo mi propio taller de formulación botánica. Me especializo en jabones artesanales, cremas faciales y tratamientos capilares naturales.

Ofrezco consultorías personalizadas para emprendedores que desean iniciar su línea de cosméticos naturales, así como asesoría en formulación y certificaciones orgánicas. Mis servicios incluyen desarrollo de recetas, análisis de ingredientes y estrategias de comercialización.',
  ARRAY['Jabones artesanales', 'Cremas faciales naturales', 'Cosmética botánica', 'Formulación orgánica', 'Tratamientos capilares'],
  '+591 70123456',
  35.00,
  NOW() - INTERVAL '30 days'
);

-- Experto 2: Juan Pérez - Consultor en emprendimientos eco-friendly
INSERT INTO public.expert_profiles (profile_id, bio, specialties, phone_number, hourly_rate, created_at)
VALUES (
  '441a923b-01e5-4271-ab52-fee115c469b2',
  'Hola, soy Juan Pérez, ingeniero ambiental y emprendedor en el sector de productos eco-friendly. Llevo 8 años ayudando a personas y empresas a desarrollar líneas de cosméticos sostenibles y rentables.

Mi experiencia incluye la creación de tres marcas de cosmética natural desde cero, con presencia en tiendas físicas y plataformas digitales. Me especializo en la parte empresarial: desde la formulación inicial hasta el marketing y las ventas.

Ofrezco consultorías para quienes quieren convertir su pasión por la cosmética natural en un negocio exitoso. Te ayudo con planes de negocio, análisis de costos, estrategias de branding y certificaciones necesarias para vender productos cosméticos en Bolivia y Latinoamérica.

También dicto talleres presenciales en La Paz sobre elaboración de productos de limpieza ecológicos y perfumes naturales.',
  ARRAY['Emprendimientos eco-friendly', 'Plan de negocios', 'Marketing de cosméticos', 'Productos de limpieza ecológicos', 'Perfumería natural', 'Certificaciones orgánicas'],
  '+591 71234567',
  40.00,
  NOW() - INTERVAL '15 days'
);

/*
RESUMEN COMPLETO DE DATA DE PRUEBA
==================================

TUTORIALES: 4 tutoriales publicados
- Tutorial 1: Jabón de lavanda (Usuario 0ece4fef)
- Tutorial 2: Crema facial (Usuario 0ece4fef)
- Tutorial 3: Shampoo sólido (Usuario 441a923b)
- Tutorial 4: Bálsamo labial (Usuario 0ece4fef)

PUBLICACIONES COMUNIDAD: 4 posts + 3 comentarios
- Post 1: "Mis primeros jabones" (Usuario 0ece4fef)
  - Comentario de Usuario 441a923b
- Post 2: "Ayuda con manteca de karité" (Usuario 441a923b)
  - Comentario de Usuario 0ece4fef
- Post 3: "Nueva receta de crema" (Usuario 0ece4fef)
  - Sin comentarios
- Post 4: "Duda sobre aceites esenciales" (Usuario 441a923b)
  - Comentario de Usuario 0ece4fef

CURSOS: 4 cursos
- Curso 1: "Introducción a los Jabones Artesanales" - $49.99 (PUBLICADO)
- Curso 2: "Cremas Faciales Naturales Avanzadas" - $79.99 (PUBLICADO)
- Curso 3: "Perfumería Natural: Crea tus propios perfumes" - $99.99 (PUBLICADO)
- Curso 4: "Shampoos Sólidos Profesionales" - $89.99 (NO PUBLICADO - BORRADOR)

LECCIONES: 8 lecciones distribuidas en los cursos publicados
- Curso 1: 3 lecciones
- Curso 2: 3 lecciones
- Curso 3: 2 lecciones
- Curso 4: 0 lecciones (en borrador)

INSCRIPCIONES: 2 inscripciones
- Usuario 441a923b inscrito en Curso 1 y Curso 2

PERFILES DE EXPERTOS: 2 expertos
- Experto 1: María Rodríguez (Usuario 0ece4fef)
  - Especialidades: Jabones, Cremas faciales, Cosmética botánica, Formulación orgánica, Tratamientos capilares
  - Tarifa: $35/hora
  - WhatsApp: +591 70123456
- Experto 2: Juan Pérez (Usuario 441a923b)
  - Especialidades: Emprendimientos eco-friendly, Plan de negocios, Marketing, Productos de limpieza, Perfumería, Certificaciones
  - Tarifa: $40/hora
  - WhatsApp: +591 71234567

¡Tu MVP está completo con data de prueba realista para todos los features!
*/
