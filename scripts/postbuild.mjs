// Runs after `ng build` (see the "build" script in package.json).
//
// Angular prerenders every real page, but does not emit a 404 page. Vercel serves `404.html`
// (with HTTP status 404) for any URL that matches no file, so we derive it from the client-side
// rendering shell `index.csr.html`: the router resolves the catch-all route to <rotw-not-found>.
// `noindex` is written into the file up front, so it does not depend on JavaScript.
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const browserDir = join('dist', 'roar-of-the-waves', 'browser');
const shell = await readFile(join(browserDir, 'index.csr.html'), 'utf8');

if (!shell.includes('<head>')) {
  throw new Error('postbuild: <head> not found in index.csr.html');
}

const notFound = shell.replace('<head>', '<head>\n  <meta name="robots" content="noindex, follow" />');
await writeFile(join(browserDir, '404.html'), notFound, 'utf8');

console.log('postbuild: wrote 404.html');
