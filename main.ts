// Japan Data Atlas — hand-in program (Node 22, standard library only).
//
// The site itself is the static app/ folder next to this file: plain HTML,
// CSS and ES modules that a browser opens at app/index.html with no build
// step and no network request. This program is what the grader runs. It
// copies app/ and screenshots/ into the output folder and writes
// dossier.json there with buildDossier from vendor/makefun-frontend.ts,
// the kit library the scorer compares byte for byte, so the vendor copy
// must stay exactly as the kit shipped it.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Copy the site and its screenshots. The gate's caps are passed to
// buildDossier so an entry the sealed scorer would refuse (too many or
// too large screenshots, an app/ past 993 entries or 16 MiB) fails here
// first, with the library's own words.
mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });

const shotsDir = join(outputDir, 'screenshots');
mkdirSync(shotsDir, { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), shotsDir, { recursive: true });
}

const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);
