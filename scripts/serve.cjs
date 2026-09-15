'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../public');
const config = require('../vercel.json');
const port = Number(process.argv[2] || 5500);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};
const server = http.createServer((req, res) => {
  for (const header of config.headers[0].headers)
    res.setHeader(header.key, header.value);
  res.setHeader('Cache-Control', 'no-store');
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405);
    res.end();
    return;
  }
  let file;
  try {
    let pathname = decodeURIComponent(
      new URL(req.url, 'http://localhost').pathname,
    );
    if (pathname === '/') pathname = '/index.html';
    file = path.resolve(root, '.' + pathname);
    if (
      !file.startsWith(root + path.sep) ||
      pathname.includes('\\') ||
      !fs.statSync(file).isFile()
    )
      throw new Error('Not found');
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }
  res.writeHead(200, {
    'Content-Type': types[path.extname(file)] || 'application/octet-stream',
  });
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  fs.createReadStream(file).pipe(res);
});
server.listen(port, '127.0.0.1', () =>
  console.log(`deBarrosLabs static preview: http://localhost:${port}`),
);
