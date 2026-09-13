import { db } from 'hatchable';

export const access = 'public';
export const methods = ['POST'];

export default async function(req, res) {
    const {
    job_id,
    name,
    email,
    phone,
    resume_url,
    cover_note
    } = req.body || {};

    if (!name || !email) {
        return res.status(400).json({
            error: 'name and email are required'
        });
    }

    const r = await db.query(
        'INSERT INTO applications (job_id, name, email, phone, resume_url, cover_note) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, created_at',
        [
            job_id || null,
            name,
            email,
            phone || '',
            resume_url || '',
            cover_note || ''
        ]
    );

    res.status(201).json({
        success: true,
        application: r.rows[0]
    });

    }
