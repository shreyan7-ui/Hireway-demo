CREATE TABLE IF NOT EXISTS leads (
id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
name text NOT NULL,
email text NOT NULL,
company text,
model text,
message text NOT NULL,
status text NOT NULL DEFAULT 'new',
created_at timestamptz NOT NULL DEFAULT now()
);
