CREATE TABLE rmtjbs_chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chatter_one_id UUID REFERENCES rmtjbs_users(id) NOT NULL,
    chatter_two_id UUID REFERENCES rmtjbs_users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
