-- 1. Create Status Enum
CREATE TYPE lead_status AS ENUM ('new', 'forwarded', 'invalid', 'archived');

-- 2. Create Leads Table
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Contact Data
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    postal_code VARCHAR(5) NOT NULL,
    preferred_date TEXT NOT NULL,
    notes TEXT,
    
    -- Calculator Context
    calculator_input JSONB NOT NULL,
    calculator_result JSONB NOT NULL,
    source_page TEXT NOT NULL DEFAULT 'homepage',
    
    -- DSGVO Compliance Audit Trail
    consent_given BOOLEAN NOT NULL DEFAULT TRUE,
    consent_version TEXT NOT NULL,
    consent_text TEXT NOT NULL,
    consent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_hash TEXT NOT NULL,
    user_agent TEXT,
    
    -- Lead Processing
    status lead_status NOT NULL DEFAULT 'new',
    forwarded_to TEXT[] DEFAULT '{}',
    buyer_notes TEXT
);

-- 3. Indexes for Search & Lead Routing
CREATE INDEX idx_leads_postal_code ON public.leads (postal_code);
CREATE INDEX idx_leads_status ON public.leads (status);
CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny public select" ON public.leads
    FOR SELECT TO public
    USING (false);

CREATE POLICY "Deny public update" ON public.leads
    FOR UPDATE TO public
    USING (false);

CREATE POLICY "Deny public delete" ON public.leads
    FOR DELETE TO public
    USING (false);

-- 5. DSGVO Data Retention Function (180 days anonymization)
CREATE OR REPLACE FUNCTION public.scrub_expired_leads()
RETURNS void AS $$
BEGIN
    UPDATE public.leads
    SET 
        full_name = 'GELÖSCHT_DSGVO',
        email = 'anonymized@geloescht.invalid',
        phone = '00000000',
        notes = NULL,
        status = 'archived'
    WHERE 
        created_at < NOW() - INTERVAL '180 days'
        AND status != 'archived';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

