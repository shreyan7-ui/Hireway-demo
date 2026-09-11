const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = Number(process.env.PORT || 5500);
const API_TARGET = 'https://elevatebridge-it.hatchable.site';
const PUBLIC = path.join(__dirname, 'public');
const MIME = {'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.ico':'image/x-icon'};

function safePath(urlPath) {
  let decoded;
  try { decoded = decodeURIComponent(urlPath); } catch { return null; }
  const rel = decoded.replace(/^\/+/, '');
  const full = path.resolve(PUBLIC, rel);
  if (full !== PUBLIC && !full.startsWith(PUBLIC + path.sep)) return null;
  return full;
}

function serveStatic(req, res) {
  let file = safePath(new URL(req.url, 'http://localhost').pathname);
  if (!file) return res.writeHead(400).end('Bad request');
  try {
    if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  } catch {}
  if (!fs.existsSync(file)) {
    // Pretty routes: /about -> /about/index.html
    const candidate = file + '.html';
    if (fs.existsSync(candidate)) file = candidate;
    else return res.writeHead(404, {'Content-Type':'text/plain'}).end('Not found');
  }
  const ext = path.extname(file).toLowerCase();
  res.writeHead(200, {'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control':'no-cache'});
  fs.createReadStream(file).pipe(res);
}

function proxyApi(req, res) {
  const target = new URL(req.url, API_TARGET);
  const headers = {...req.headers, host: target.host};
  delete headers.connection;
  const opts = {hostname: target.hostname, port: 443, path: target.pathname + target.search, method: req.method, headers};
  const upstream = https.request(opts, r => {
    const outHeaders = {...r.headers, 'access-control-allow-origin':'http://localhost:' + PORT, 'access-control-allow-credentials':'true'};
    res.writeHead(r.statusCode || 502, outHeaders);
    r.pipe(res);
  });
  upstream.on('error', err => { console.error('API proxy error:', err.message); if (!res.headersSent) res.writeHead(502, {'Content-Type':'application/json'}); res.end(JSON.stringify({error:'API proxy failed', detail:err.message})); });
  req.pipe(upstream);
}

http.createServer((req, res) => {
  if (req.method === 'OPTIONS' && req.url.startsWith('/api/')) {
    return res.writeHead(204, {'Access-Control-Allow-Origin':'http://localhost:' + PORT, 'Access-Control-Allow-Methods':'GET,POST,PATCH,OPTIONS', 'Access-Control-Allow-Headers':'Content-Type, Authorization', 'Access-Control-Allow-Credentials':'true'}).end();
  }
  if (req.url.startsWith('/api/')) return proxyApi(req, res);
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.writeHead(405).end('Method not allowed');
  serveStatic(req, res);
}).listen(PORT, () => {
  console.log(`\nElevateBridge local server running at http://localhost:${PORT}`);
  console.log('Frontend: local public/');
  console.log('API: proxied to ' + API_TARGET + '/api');
  console.log('Press Ctrl+C to stop.\n');
});
