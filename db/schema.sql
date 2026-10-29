-- Kostenklar: Leads Schema (Neon Serverless PostgreSQL)
-- Target Region: AWS Europe Central 1 (Frankfurt / eu-central-1)
-- Compliant with German DSGVO / GDPR Art. 6, 7 & 17

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Contact Information
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    plz VARCHAR(5) NOT NULL,
    preferred_date TEXT NOT NULL,
    message TEXT,
    
    -- Calculator Context & Calculated Range
    calculator_input JSONB NOT NULL,
    price_min INTEGER,
    price_realistic INTEGER,
    price_max INTEGER,
    source_page TEXT NOT NULL DEFAULT 'homepage',
    
    -- DSGVO / GDPR Compliance Audit Trail
    consent_text_version TEXT NOT NULL,
    consent_text TEXT NOT NULL,
    consent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_hash TEXT NOT NULL,
    
    -- Lead Status & Routing
    status TEXT NOT NULL DEFAULT 'new',
    forwarded_to TEXT,
    
    -- Legacy/Compatibility Aliases (allows seamless querying)
    full_name TEXT GENERATED ALWAYS AS (name) STORED,
    postal_code VARCHAR(5) GENERATED ALWAYS AS (plz) STORED,
    notes TEXT GENERATED ALWAYS AS (message) STORED
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_leads_plz ON public.leads (plz);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);

-- Automated Data Retention Procedure: 180 Days Anonymization (DSGVO Art. 5(1)(e))
CREATE OR REPLACE FUNCTION public.scrub_expired_leads()
RETURNS void AS $$
BEGIN
    UPDATE public.leads
    SET 
        name = 'GELÖSCHT_DSGVO',
        email = 'anonymized@geloescht.invalid',
        phone = '00000000',
        message = NULL,
        status = 'archived'
    WHERE 
        created_at < NOW() - INTERVAL '180 days'
        AND status != 'archived';
END;
$$ LANGUAGE plpgsql;
