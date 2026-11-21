// Contrôles automatiques du site de l'Omni-système (sans navigateur, sans rien installer).
// Lancement (depuis le dossier du site) :   node --test
//
// - la règle de sécurité (CSP) est présente et stricte ;
// - rien n'est écrit en ligne dans la page (ni <style>, ni <script> avec du code, ni style=, ni onclick=…) ;
// - aucun fichier n'est chargé depuis un autre site (pas de Google Fonts, pas de CDN) ;
// - chaque fichier appelé par la page ou le style existe ;
// - les polices embarquées sont toutes déclarées, présentes et accompagnées de leur licence ;
// - les petits boutons gardent une cible tactile de 44 px.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lire = (f) => fs.readFileSync(path.join(racine, f), 'utf8');
const existe = (f) => fs.existsSync(path.join(racine, decodeURI(f)));
const html = lire('index.html');
const css = lire('style.css');
const js = lire('script.js');

function csp() {
  const m = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/);
  if (!m) return null;
  return Object.fromEntries(m[1].split(';').map((d) => d.trim().split(/\s+/)).filter((d) => d[0]).map(([n, ...v]) => [n, v]));
}

test('la page a une règle de sécurité (CSP) stricte', () => {
  const c = csp();
  assert.ok(c, 'index.html : pas de CSP');
  assert.deepEqual(c['default-src'], ["'none'"]);
  assert.deepEqual(c['script-src'], ["'self'"]);
  assert.deepEqual(c['style-src'], ["'self'"]);
  assert.deepEqual(c['font-src'], ["'self'"]);
  assert.deepEqual(c['object-src'], ["'none'"]);
  assert.deepEqual(c['base-uri'], ["'none'"]);
  for (const [nom, valeurs] of Object.entries(c)) {
    assert.ok(!valeurs.includes("'unsafe-inline'"), `${nom} autorise 'unsafe-inline'`);
    assert.ok(!valeurs.includes("'unsafe-eval'"), `${nom} autorise 'unsafe-eval'`);
    assert.ok(!valeurs.some((v) => /^https?:|^\*$|^\w+\.\w+/.test(v)), `${nom} autorise un autre site`);
  }
});

test('rien n\'est écrit en ligne dans la page (bloqué par la CSP)', () => {
  assert.ok(!/<style[\s>]/i.test(html), 'un bloc <style> est écrit dans index.html : le mettre dans style.css');
  assert.ok(!/<script(?![^>]*\bsrc=)[^>]*>\s*\S/i.test(html), 'du code <script> est écrit dans index.html : le mettre dans script.js');
  assert.ok(!/\sstyle="/i.test(html), 'un attribut style= est dans index.html : utiliser une classe de style.css');
  assert.ok(!/\son[a-z]+="/i.test(html), 'un attribut onclick=… (ou autre on…=) est dans index.html : le mettre dans script.js');
});

test('aucun fichier n\'est chargé depuis un autre site (pas de Google Fonts, pas de CDN)', () => {
  // Les liens <a href="https://…"> sont permis : on les clique, ils ne chargent rien.
  // <link rel="canonical"> et les balises de partage (og:image) ne chargent rien non plus.
  const balises = [...html.matchAll(/<(link|script|img|iframe|source|video|audio)\b[^>]*>/gi)].map((m) => m[0])
    .filter((b) => !/rel="canonical"/.test(b));
  for (const b of balises) assert.ok(!/(src|href)="(https?:)?\/\//i.test(b), `chargement externe : ${b.slice(0, 120)}`);
  assert.ok(!/fonts\.(googleapis|gstatic)\.com/.test(html + css), 'Google Fonts est encore appelé');
  assert.ok(!/@import/i.test(css), 'style.css importe une autre feuille');
  assert.ok(!/url\(\s*["']?(https?:)?\/\//i.test(css), 'style.css utilise une ressource externe');
  assert.ok(!/(fetch|import|importScripts)\s*\(\s*["'`](https?:)?\/\//.test(js), 'script.js contacte un autre site');
});

test('chaque fichier appelé par la page ou le style existe', () => {
  const locaux = [
    ...[...html.matchAll(/<(?:link|script|img)\b[^>]*\b(?:src|href)="([^"#:]+)"/gi)].map((m) => m[1]),
    ...[...html.matchAll(/<a\b[^>]*\bhref="([^"#:?]+\.(?:pdf|txt|png))"/gi)].map((m) => m[1]),
    ...[...css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)].map((m) => m[1]).filter((u) => !u.startsWith('data:')),
  ];
  assert.ok(locaux.includes('style.css') && locaux.includes('script.js'));
  for (const f of locaux) assert.ok(existe(f), `${f} est appelé mais n'existe pas`);
});

test('polices embarquées : déclarées, présentes et accompagnées de leur licence', () => {
  const declarees = [...css.matchAll(/@font-face\s*\{[^}]*url\("([^"]+)"\)/g)].map((m) => m[1]);
  const fichiers = fs.readdirSync(path.join(racine, 'polices')).filter((f) => f.endsWith('.woff2')).map((f) => `polices/${f}`);
  assert.deepEqual([...declarees].sort(), [...fichiers].sort(), 'chaque police de polices/ doit être déclarée une fois dans style.css, et inversement');
  const familles = new Set([...css.matchAll(/@font-face\s*\{[^}]*font-family:"([^"]+)"/g)].map((m) => m[1]));
  assert.deepEqual([...familles].sort(), ['JetBrains Mono', 'Literata', 'Oxanium']);
  const tiers = lire('licences-tierces.txt');
  for (const [famille, licence] of [['Oxanium', 'polices/OFL-oxanium.txt'], ['Literata', 'polices/OFL-literata.txt'], ['JetBrains Mono', 'polices/OFL-jetbrains-mono.txt']]) {
    assert.ok(tiers.includes(famille), `${famille} n'est pas créditée dans licences-tierces.txt`);
    assert.ok(tiers.includes(licence), `licences-tierces.txt ne renvoie pas vers ${licence}`);
    assert.match(lire(licence), /SIL Open Font License/, `${licence} n'est pas la licence OFL`);
  }
});

test('les petits boutons gardent une cible tactile de 44 px', () => {
  const regle = css.match(/\.petit-bouton\{([^}]*)\}/);
  assert.ok(regle, 'règle .petit-bouton introuvable dans style.css');
  assert.match(regle[1], /min-height:44px/, '.petit-bouton doit garder min-height:44px');
});
