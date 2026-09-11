INSERT INTO jobs (
        title,
        department,
        location,
        employment_type,
        description
    )
SELECT 'ServiceNow Business Analyst',
    'ServiceNow',
    'Bengaluru / Hybrid',
    'Full-time',
    'Own requirement discovery, process mapping, BRD/FRD, UAT and stakeholder coordination across ServiceNow programs.'
WHERE NOT EXISTS (
        SELECT 1
        FROM jobs
        WHERE title = 'ServiceNow Business Analyst'
    )