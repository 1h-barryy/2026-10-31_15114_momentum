import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const types = { html: 'text/html', css: 'text/css', js: 'text/javascript', json: 'application/json', png: 'image/png' };
createServer(async (request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname;
  // Serve only the game's public files, never repository metadata.
  if (!/^\/(?:index\.html|styles\.css|src\/[\w-]+\.js|assets\/[\w-]+\.(?:png|json))?$/.test(path)) {
    response.writeHead(404).end(); return;
  }
  try {
    const file = new URL(path.slice(1) || 'index.html', root);
    const data = await readFile(fileURLToPath(file));
    response.writeHead(200, { 'Content-Type': types[file.pathname.split('.').pop()], 'Cache-Control': 'no-cache' });
    response.end(data);
  } catch { response.writeHead(404).end(); }
}).listen(8000, '127.0.0.1', () => console.log('Momentum: http://localhost:8000'));
