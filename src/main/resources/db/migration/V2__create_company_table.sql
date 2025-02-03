CREATE TABLE rmtjbs_companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES rmtjbs_users(id) ON DELETE CASCADE,
    location VARCHAR(255) NOT NULL,
    banner_key TEXT
);
