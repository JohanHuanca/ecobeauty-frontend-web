-- =====================================================
-- POLÍTICAS DE SEGURIDAD PARA SUPABASE STORAGE
-- =====================================================
-- Este archivo contiene las políticas RLS necesarias para los buckets de storage

-- =====================================================
-- BUCKET: posts (para imágenes de publicaciones)
-- =====================================================

-- 1. Permitir que usuarios autenticados SUBAN imágenes
CREATE POLICY "Usuarios autenticados pueden subir imágenes a posts"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'posts');

-- 2. Permitir que todos VEAN las imágenes (lectura pública)
CREATE POLICY "Lectura pública de imágenes de posts"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'posts');

-- 3. Permitir que usuarios ACTUALICEN solo sus propias imágenes
CREATE POLICY "Usuarios pueden actualizar sus propias imágenes de posts"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'posts' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 4. Permitir que usuarios ELIMINEN solo sus propias imágenes
CREATE POLICY "Usuarios pueden eliminar sus propias imágenes de posts"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'posts' AND auth.uid()::text = (storage.foldername(name))[1]);


-- =====================================================
-- BUCKET: avatars (para imágenes de perfil)
-- =====================================================

-- 1. Permitir que usuarios autenticados SUBAN avatares
CREATE POLICY "Usuarios autenticados pueden subir avatares"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- 2. Permitir que todos VEAN los avatares (lectura pública)
CREATE POLICY "Lectura pública de avatares"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- 3. Permitir que usuarios ACTUALICEN solo su propio avatar
CREATE POLICY "Usuarios pueden actualizar su propio avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 4. Permitir que usuarios ELIMINEN solo su propio avatar
CREATE POLICY "Usuarios pueden eliminar su propio avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);


-- =====================================================
-- VERIFICACIÓN
-- =====================================================
-- Para verificar que las políticas se crearon correctamente, ejecuta:
-- SELECT * FROM storage.policies WHERE bucket_id IN ('posts', 'avatars');
