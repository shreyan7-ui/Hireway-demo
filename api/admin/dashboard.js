import { db } from 'hatchable';

export const access = 'admin';
export const methods = ['GET'];

export default async function(req, res) {
  const a = await db.query(
    'SELECT count(*)::int AS count FROM leads'
  );

  const b = await db.query(
    'SELECT count(*)::int AS count FROM leads WHERE status = \'new\''
  );

  const c = await db.query(
    'SELECT count(*)::int AS count FROM jobs WHERE active = true'
  );

  const d = await db.query(
    'SELECT count(*)::int AS count FROM applications'
  );

  res.json({
    leads: a.rows[0].count,
    new_leads: b.rows[0].count,
    active_jobs: c.rows[0].count,
    applications: d.rows[0].count
  });
}