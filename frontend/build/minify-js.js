import { minify } from 'terser';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import glob from 'glob';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

async function minifyJavaScript() {
    console.log('🔧 Minification JavaScript...\n');

    // Trouver tous les fichiers JS sources
    const jsFiles = glob.sync('src/js/**/*.js', {
        cwd: rootDir,
        ignore: ['**/*.test.js', '**/__tests__/**'],
    });

    let totalOriginal = 0;
    let totalMinified = 0;

    for (const file of jsFiles) {
        const inputPath = join(rootDir, file);
        const outputPath = join(rootDir, 'dist', file);

        // Créer le dossier de destination
        mkdirSync(dirname(outputPath), { recursive: true });

        // Lire le fichier
        const code = readFileSync(inputPath, 'utf8');
        totalOriginal += code.length;

        try {
            // Minifier
            const result = await minify(code, {
                module: true,
                compress: {
                    dead_code: true,
                    drop_console: false, // Garder console.warn et console.error
                    drop_debugger: true,
                    pure_funcs: ['console.log'],
                },
                mangle: {
                    toplevel: false,
                },
                format: {
                    comments: false,
                },
            });

            const minified = result.code;
            totalMinified += minified.length;

            // Écrire le fichier minifié
            writeFileSync(outputPath, minified);

            const reduction = ((1 - minified.length / code.length) * 100).toFixed(1);
            console.log(`✓ ${file} (${reduction}% réduction)`);
        } catch (error) {
            console.error(`✗ Erreur dans ${file}:`, error.message);
        }
    }

    const totalReduction = ((1 - totalMinified / totalOriginal) * 100).toFixed(1);
    console.log(`\n📊 Total: ${totalOriginal} → ${totalMinified} bytes (${totalReduction}% réduction)\n`);
}

minifyJavaScript().catch(console.error);
