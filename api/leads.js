import { db, email } from 'hatchable';

export const access = 'public';
export const methods = ['POST'];

export default async function(req, res) {
  const {
    name,
    email: address,
    company,
    model,
    message
  } = req.body || {};

  if (!name || !address || !message) {
    return res.status(400).json({
      error: 'name, email and message are required'
    });
  }

  const r = await db.query(
    'INSERT INTO leads (name, email, company, model, message) VALUES ($1, $2, $3, $4, $5) RETURNING id, created_at',
    [
      name,
      address,
      company || '',
      model || '',
      message
    ]
  );

  try {
    await email.send({
      to: address,
      subject: 'We received your ElevateBridge requirement',
      html: `<div><p>Hi ${name},</p>
        <p>Thank you for contacting ElevateBridge.
        Our team has received your requirement and will follow up shortly.</p></div>`
    });
  } catch {}

  res.status(201).json({
    success: true,
    lead: r.rows[0]
  });
}
