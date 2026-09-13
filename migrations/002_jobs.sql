CREATE TABLE IF NOT EXISTS jobs (
id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
title text NOT NULL,
department text NOT NULL,
location text NOT NULL,
employment_type text NOT NULL,
description text NOT NULL,
active boolean NOT NULL DEFAULT true,
created_at timestamptz NOT NULL DEFAULT now()
);
