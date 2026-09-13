CREATE TABLE IF NOT EXISTS resource_requests (
id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
company text NOT NULL,
contact_name text NOT NULL,
email text NOT NULL,
phone text,
resource_name text,
resource_id text,
request_type text NOT NULL,
priority text NOT NULL DEFAULT 'Medium',
subject text NOT NULL,
details text NOT NULL,
status text NOT NULL DEFAULT 'Open',
created_at timestamptz NOT NULL DEFAULT now()
);
