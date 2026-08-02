import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { loadEnvFile } from 'node:process';
import { fileURLToPath } from 'node:url';
import { createContactHandler } from './server/contact-handler.mjs';

try {
  loadEnvFile('.env');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const distRoot = resolve(projectRoot, 'dist');
const contactHandler = createContactHandler(process.env);
const port = Number(process.env.PORT || 4173);
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
  '.woff2': 'font/woff2',
};

const exists = async (filePath) => {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
};

const securityHeaders = (response) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-src https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'");
};

createServer(async (request, response) => {
  securityHeaders(response);
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  if (url.pathname === '/api/contact') {
    await contactHandler(request, response);
    return;
  }

  if (!['GET', 'HEAD'].includes(request.method || 'GET')) {
    response.statusCode = 405;
    response.setHeader('Allow', 'GET, HEAD');
    response.end('Method not allowed');
    return;
  }

  try {
    const decodedPath = decodeURIComponent(url.pathname);
    const relativePath = normalize(decodedPath).replace(/^(\.\.(\/|\\|$))+/, '').replace(/^[/\\]+/, '');
    const directPath = join(distRoot, relativePath || 'index.html');
    const routePath = join(distRoot, relativePath, 'index.html');
    const candidates = extname(relativePath) ? [directPath] : [routePath, directPath];
    const filePath = await candidates.reduce(async (foundPromise, candidate) => {
      const found = await foundPromise;
      if (found) return found;
      return (candidate.startsWith(distRoot) && await exists(candidate)) ? candidate : null;
    }, Promise.resolve(null));

    if (!filePath) {
      const notFoundPath = join(distRoot, '404.html');
      response.statusCode = 404;
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      response.setHeader('Cache-Control', 'no-cache');
      if (request.method === 'HEAD') response.end();
      else if (await exists(notFoundPath)) response.end(await readFile(notFoundPath));
      else response.end('<!doctype html><html lang="en"><head><meta name="robots" content="noindex, nofollow"><title>Page Not Found</title></head><body><h1>Page not found</h1><p><a href="/">Return home</a></p></body></html>');
      return;
    }

    const extension = extname(filePath).toLowerCase();
    response.statusCode = 200;
    response.setHeader('Content-Type', mimeTypes[extension] || 'application/octet-stream');
    response.setHeader('Cache-Control', filePath.includes(`${join('assets', '')}`) ? 'public, max-age=31536000, immutable' : 'no-cache');
    if (request.method === 'HEAD') response.end();
    else response.end(await readFile(filePath));
  } catch (error) {
    console.error('Static server error:', error.message);
    response.statusCode = 500;
    response.end('Internal server error');
  }
}).listen(port, () => {
  console.log(`Zexton production server running at http://localhost:${port}`);
});
