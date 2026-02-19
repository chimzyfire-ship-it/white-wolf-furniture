import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_DIR = path.resolve('public/assets/real-photos');
const OUTPUT_DIR = path.resolve('public/assets/thumbs');
const THUMB_WIDTH = 480;
const QUALITY = 75;

// Also process category folders
const CATEGORY_DIR = path.resolve('public/assets/categories');

async function processDirectory(inputDir, outputDir) {
    if (!fs.existsSync(inputDir)) return;
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const files = fs.readdirSync(inputDir).filter(f =>
        /\.(jpe?g|png|webp)$/i.test(f)
    );

    console.log(`  📁 ${inputDir} → ${files.length} images`);

    let processed = 0;
    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputName = path.parse(file).name + '.webp';
        const outputPath = path.join(outputDir, outputName);

        // Skip if thumbnail already exists and is newer than source
        if (fs.existsSync(outputPath)) {
            const srcStat = fs.statSync(inputPath);
            const outStat = fs.statSync(outputPath);
            if (outStat.mtimeMs > srcStat.mtimeMs) {
                continue;
            }
        }

        try {
            await sharp(inputPath)
                .resize(THUMB_WIDTH, null, { withoutEnlargement: true })
                .webp({ quality: QUALITY })
                .toFile(outputPath);
            processed++;
        } catch (err) {
            console.error(`  ❌ Failed: ${file} — ${err.message}`);
        }
    }
    return { total: files.length, processed };
}

async function main() {
    console.log('\n🐺 White Wolf — Image Optimizer\n');
    const start = Date.now();

    // Process main real-photos
    console.log('Processing real-photos...');
    const mainResult = await processDirectory(INPUT_DIR, OUTPUT_DIR);

    // Process category folders
    if (fs.existsSync(CATEGORY_DIR)) {
        const categories = fs.readdirSync(CATEGORY_DIR, { withFileTypes: true })
            .filter(d => d.isDirectory())
            .map(d => d.name);

        for (const cat of categories) {
            const catInput = path.join(CATEGORY_DIR, cat);
            const catOutput = path.join(CATEGORY_DIR, cat, 'thumbs');
            console.log(`Processing category: ${cat}...`);
            await processDirectory(catInput, catOutput);
        }
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\n✅ Done in ${elapsed}s`);
    if (mainResult) {
        console.log(`   ${mainResult.processed} new thumbnails generated (${mainResult.total} total images)\n`);
    }
}

main().catch(console.error);
