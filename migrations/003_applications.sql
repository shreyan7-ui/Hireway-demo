CREATE TABLE IF NOT EXISTS applications (
id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
job_id uuid REFERENCES jobs(id) ON DELETE SET NULL,
name text NOT NULL,
email text NOT NULL,
phone text,
resume_url text,
cover_note text,
created_at timestamptz NOT NULL DEFAULT now()
);
