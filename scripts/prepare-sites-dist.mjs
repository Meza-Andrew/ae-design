import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const serverDir = path.join(distDir, 'server');
const openAiDir = path.join(distDir, '.openai');
const metaDir = path.join(distDir, '_appgen_meta');
const hostingSource = path.join(rootDir, '.openai', 'hosting.json');
const hostingDest = path.join(openAiDir, 'hosting.json');
const appgardenMetaDest = path.join(metaDir, 'appgarden.json');
const serverEntryDest = path.join(serverDir, 'index.js');

await mkdir(serverDir, { recursive: true });
await mkdir(openAiDir, { recursive: true });
await mkdir(metaDir, { recursive: true });

await copyFile(hostingSource, hostingDest);

const hosting = JSON.parse(await readFile(hostingSource, 'utf8'));
await writeFile(appgardenMetaDest, JSON.stringify({
  project_id: hosting.project_id,
  source: 'vite',
  format: 'appgarden',
}, null, 2));

const serverEntry = `import { createServer } from 'node:http';
import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf8');

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.htm': 'text/html; charset=utf-8',
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
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function sendFile(res, filePath) {
  res.statusCode = 200;
  res.setHeader('Content-Type', mimeTypes[extname(filePath)] ?? 'application/octet-stream');
  createReadStream(filePath).pipe(res);
}

createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
  const safePath = urlPath === '/' ? null : join(distDir, urlPath);

  if (safePath && existsSync(safePath) && !safePath.endsWith(path.sep)) {
    sendFile(res, safePath);
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(indexHtml);
}).listen(Number(process.env.PORT ?? 3000));
`;

await writeFile(serverEntryDest, serverEntry);
