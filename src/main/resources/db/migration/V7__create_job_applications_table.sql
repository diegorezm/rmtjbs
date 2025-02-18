CREATE TABLE rmtjbs_job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID NOT NULL REFERENCES rmtjbs_candidates(id) ON DELETE CASCADE,
    job_posting_id UUID NOT NULL REFERENCES rmtjbs_job_postings(id) ON DELETE CASCADE,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state  application_state DEFAULT 'PENDING',
    UNIQUE (candidate_id, job_posting_id)
);
