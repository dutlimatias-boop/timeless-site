-- ══════════════════════════════════════════════════════════════════════════
-- TIMELESS — SUPABASE SECURITY HARDENING
-- Ejecutar en el SQL Editor de tu proyecto Supabase
-- Versión: sin Paso 7 (onboarding_status queda en Google Sheets)
-- ══════════════════════════════════════════════════════════════════════════

-- PASO 1: Agregar columna business_id si no existe
ALTER TABLE documents
  ADD COLUMN IF NOT EXISTS business_id TEXT NOT NULL DEFAULT 'default';

-- PASO 2: Habilitar RLS en documents (vulnerabilidad crítica sin esto)
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- PASO 3: Solo service_role puede insertar
CREATE POLICY "Solo service_role puede insertar documentos"
  ON documents
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- PASO 4: Lectura aislada por business_id
CREATE POLICY "Lectura solo del propio negocio"
  ON documents
  FOR SELECT
  TO service_role
  USING (
    business_id = current_setting('app.current_business_id', true)
  );

-- PASO 5: Bloquear acceso anónimo completamente
CREATE POLICY "Bloquear anon en documents"
  ON documents
  FOR ALL
  TO anon
  USING (false);

-- PASO 6: Función match_documents segura con aislamiento por business_id
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding  vector(1536),
  match_threshold  float   DEFAULT 0.7,
  match_count      int     DEFAULT 5,
  p_business_id    text    DEFAULT NULL
)
RETURNS TABLE (
  id         uuid,
  content    text,
  metadata   jsonb,
  similarity float
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id,
    d.content,
    d.metadata,
    1 - (d.embedding <=> query_embedding) AS similarity
  FROM documents d
  WHERE
    -- FAIL-CLOSED: sin business_id no se devuelve NADA (evita fuga cross-cliente
    -- si un workflow olvida pasar el parámetro). NUNCA cambiar a "IS NULL OR".
    p_business_id IS NOT NULL
    AND d.business_id = p_business_id
    AND 1 - (d.embedding <=> query_embedding) > match_threshold
  ORDER BY d.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- PASO 8: Índices para performance
CREATE INDEX IF NOT EXISTS idx_documents_business_id
  ON documents (business_id);

CREATE INDEX IF NOT EXISTS idx_documents_embedding
  ON documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- PASO 9: Función updated_at automático (para uso futuro)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- VERIFICACIÓN FINAL — correr esto después para confirmar RLS activo:
-- SELECT tablename, rowsecurity FROM pg_tables
-- WHERE schemaname = 'public' AND tablename IN ('documents');
-- Debe devolver rowsecurity = true
