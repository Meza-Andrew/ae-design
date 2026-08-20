import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { join } from 'node:path';

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

const serverEntry = `const indexHtml = ${JSON.stringify(await readFile(join(distDir, 'index.html'), 'utf8'))};

export default {
  async fetch() {
    return new Response(indexHtml, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
    });
  },
};
`;

await writeFile(serverEntryDest, serverEntry);
