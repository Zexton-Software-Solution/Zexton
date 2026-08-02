import nodemailer from 'nodemailer';

const MAX_BODY_BYTES = 24 * 1024;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const attempts = new Map();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sendJson = (response, status, payload) => {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.end(JSON.stringify(payload));
};

const cleanText = (value, maxLength) => String(value ?? '').trim().slice(0, maxLength);
const cleanHeader = (value, maxLength) => cleanText(value, maxLength).replace(/[\r\n]+/g, ' ');
const escapeHtml = (value) => cleanText(value, 5000).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);

const readJsonBody = async (request) => {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      const error = new Error('Request body is too large.');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
  } catch {
    const error = new Error('Invalid request body.');
    error.statusCode = 400;
    throw error;
  }
};

const getClientKey = (request) => {
  const forwarded = request.headers['x-forwarded-for'];
  return (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0])?.trim() || request.socket.remoteAddress || 'unknown';
};

const withinRateLimit = (key) => {
  const now = Date.now();
  const recent = (attempts.get(key) || []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) return false;
  recent.push(now);
  attempts.set(key, recent);
  if (attempts.size > 500) {
    for (const [entryKey, timestamps] of attempts) {
      if (!timestamps.some((timestamp) => now - timestamp < WINDOW_MS)) attempts.delete(entryKey);
    }
  }
  return true;
};

const originAllowed = (request, env) => {
  const origin = request.headers.origin;
  if (!origin) return true;
  try {
    if (new URL(origin).host === request.headers.host) return true;
  } catch {
    return false;
  }
  const allowed = cleanText(env.CONTACT_ALLOWED_ORIGINS, 1000).split(',').map((item) => item.trim().replace(/\/$/, '')).filter(Boolean);
  return allowed.includes(origin.replace(/\/$/, ''));
};

const validate = (data) => {
  if (data.name.length < 2) return 'Please enter your full name.';
  if (!emailPattern.test(data.email) || data.email.length > 160) return 'Please enter a valid email address.';
  if (data.message.length < 20) return 'Please add at least 20 characters about your project.';
  if (!data.consent) return 'Please confirm that we may respond to your enquiry.';
  return '';
};

export const createContactHandler = (env = process.env) => {
  let transporter;

  return async (request, response, next) => {
    const pathname = new URL(request.url || '/', 'http://localhost').pathname;
    if (pathname !== '/api/contact') {
      if (next) next();
      return false;
    }

    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST');
      sendJson(response, 405, { message: 'Method not allowed.' });
      return true;
    }
    if (!originAllowed(request, env)) {
      sendJson(response, 403, { message: 'Request origin is not allowed.' });
      return true;
    }
    if (!String(request.headers['content-type'] || '').toLowerCase().includes('application/json')) {
      sendJson(response, 415, { message: 'Content-Type must be application/json.' });
      return true;
    }
    if (!withinRateLimit(getClientKey(request))) {
      sendJson(response, 429, { message: 'Too many enquiries were sent. Please wait 15 minutes or email info@zexton.com.' });
      return true;
    }

    try {
      const body = await readJsonBody(request);
      if (cleanText(body.website, 200)) {
        sendJson(response, 200, { message: 'Your enquiry has been received.' });
        return true;
      }

      const data = {
        name: cleanHeader(body.name, 80),
        email: cleanHeader(body.email, 160).toLowerCase(),
        company: cleanHeader(body.company, 120),
        phone: cleanHeader(body.phone, 30),
        service: cleanHeader(body.service, 120),
        budget: cleanHeader(body.budget, 80),
        timeline: cleanHeader(body.timeline, 80),
        message: cleanText(body.message, 4000),
        consent: body.consent === true,
      };
      const validationMessage = validate(data);
      if (validationMessage) {
        sendJson(response, 400, { message: validationMessage });
        return true;
      }

      const requiredConfig = [env.SMTP_HOST, env.SMTP_USER, env.SMTP_PASS, env.SMTP_FROM, env.CONTACT_TO_EMAIL];
      if (requiredConfig.some((value) => !cleanText(value, 500))) {
        sendJson(response, 503, { message: 'Email delivery is not configured yet. Please email info@zexton.com directly.' });
        return true;
      }

      if (!transporter) {
        const port = Number(env.SMTP_PORT || 587);
        transporter = nodemailer.createTransport({
          host: env.SMTP_HOST,
          port,
          secure: String(env.SMTP_SECURE).toLowerCase() === 'true' || port === 465,
          auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
          connectionTimeout: 12_000,
          greetingTimeout: 12_000,
          socketTimeout: 20_000,
        });
      }

      const safe = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, typeof value === 'string' ? escapeHtml(value) : value]));
      await transporter.sendMail({
        from: env.SMTP_FROM,
        to: env.CONTACT_TO_EMAIL,
        replyTo: data.email,
        subject: `Zexton website enquiry: ${data.service} — ${data.name}`,
        text: `New Zexton website enquiry\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || 'Not provided'}\nPhone: ${data.phone || 'Not provided'}\nService: ${data.service}\nBudget: ${data.budget}\nTimeline: ${data.timeline}\n\nProject details:\n${data.message}`,
        html: `<h2>New Zexton website enquiry</h2><p><strong>Name:</strong> ${safe.name}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Company:</strong> ${safe.company || 'Not provided'}</p><p><strong>Phone:</strong> ${safe.phone || 'Not provided'}</p><p><strong>Service:</strong> ${safe.service}</p><p><strong>Budget:</strong> ${safe.budget}</p><p><strong>Timeline:</strong> ${safe.timeline}</p><h3>Project details</h3><p style="white-space:pre-wrap">${safe.message}</p>`,
      });

      sendJson(response, 200, { message: 'Thank you. Your enquiry has been sent to the Zexton team.' });
      return true;
    } catch (error) {
      const status = error.statusCode || 500;
      if (status >= 500) console.error('Contact delivery failed:', error.message);
      sendJson(response, status, { message: status >= 500 ? 'We could not send the enquiry right now. Please email info@zexton.com.' : error.message });
      return true;
    }
  };
};
