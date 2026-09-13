import { db } from 'hatchable';

export const access = 'public';
export const methods = ['GET'];

export default async function(req, res) {
  const { rows } = await db.query(
    'SELECT id, title, department, location, employment_type, description FROM jobs WHERE active = true ORDER BY created_at DESC'
  );

  res.json(rows);
}
