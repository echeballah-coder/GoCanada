#!/usr/bin/env node
/*
 * Script cross-platform pour injecter `enhancements.css` après `components.css`
 * dans tous les fichiers HTML du dossier `frontend/public` si nécessaire.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { globSync } from 'glob';

const publicDir = join(new URL(import.meta.url).pathname.replace(/\/frontend\/scripts\/add-enhancements.js$/, ''), '..', 'public');

// globSync ne fonctionne pas bien avec URL windows -> on utilisera pattern relatif
const htmlFiles = globSync('frontend/public/*.html', { nodir: true });

if (htmlFiles.length === 0) {
    console.log('Aucun fichier HTML trouvé dans frontend/public');
    process.exit(0);
}

const COMPONENT_LINE = '<link rel="stylesheet" href="/src/css/components.css">';
const ENHANCEMENT_LINE = '    <link rel="stylesheet" href="/src/css/enhancements.css">';

for (const filePath of htmlFiles) {
    try {
        let content = readFileSync(filePath, 'utf8');

        if (content.includes('enhancements.css')) {
            console.log(`⏭️  Skipped (already has enhancements.css): ${filePath}`);
            continue;
        }

        if (content.includes(COMPONENT_LINE)) {
            // Insert enhancements.css after components line
            content = content.replace(COMPONENT_LINE, COMPONENT_LINE + '\n' + ENHANCEMENT_LINE);
            writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Added enhancements.css to: ${filePath}`);
        } else {
            console.log(`⚠️  components.css not found in: ${filePath} — skipping`);
        }
    } catch (err) {
        console.error(`Erreur lors du traitement de ${filePath}:`, err.message);
    }
}

console.log('\n🎉 Done!');
