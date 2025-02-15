CREATE TABLE rmtjbs_candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES rmtjbs_users(id) ON DELETE CASCADE,
    profile_picture_key TEXT,
    resume_key TEXT,
    phone VARCHAR(20),
    job_preferences TEXT ARRAY[]
);

