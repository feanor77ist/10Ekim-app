const fs = require('fs');
const path = require('path');

function readSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch (e) { return null; }
}

function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  const unzipDir = path.join(publicDir, 'memories_images');
  const docXmlPath = path.join(unzipDir, 'word', 'document.xml');
  const relsPath = path.join(unzipDir, 'word', '_rels', 'document.xml.rels');

  const docXml = readSafe(docXmlPath);
  const relsXml = readSafe(relsPath);
  if (!docXml || !relsXml) {
    console.error('DOCX XML not found. Ensure the DOCX was unzipped to public/memories_images');
    process.exit(1);
  }

  const idToTarget = {};
  relsXml.replace(/<Relationship[^>]*Id=\"([^\"]+)\"[^>]*Target=\"([^\"]+)\"/g, (m, Id, Target) => {
    idToTarget[Id] = Target;
  });

  const paraRe = /<w:p[\s\S]*?<\/w:p>/g;
  const textRe = /<w:t[^>]*>([\s\S]*?)<\/w:t>/g;
  const drawingRe = /<a:blip[^>]*r:embed=\"([^\"]+)\"/;

  function getAll(s, re) { const out = []; let m; while ((m = re.exec(s))) out.push(m[0]); return out; }
  const paras = getAll(docXml, paraRe);

  let currentName = null;
  const pairs = [];
  for (const p of paras) {
    const texts = Array.from(p.matchAll(textRe)).map(m => m[1]).join('').trim();
    const imgMatch = p.match(drawingRe);
    if (texts) {
      // If a paragraph looks like a standalone name line, set it as current; otherwise keep the last seen name
      if (/^[A-ZÇĞİÖŞÜÂÊÎÔÛ][^.:!?]{0,80}$/.test(texts) && !/\s{2,}/.test(texts)) {
        currentName = texts;
      }
    }
    if (imgMatch) {
      const rId = imgMatch[1];
      const target = idToTarget[rId];
      if (currentName && target && target.startsWith('media/')) {
        pairs.push({ name: currentName, image: target.split('/').pop() });
      }
    }
  }

  const imagesDir = path.join(unzipDir, 'word', 'media');
  const webImagesDir = path.join(publicDir, 'memories_photos');
  if (!fs.existsSync(webImagesDir)) fs.mkdirSync(webImagesDir);

  // Copy matched images to public/memories_photos maintaining filenames
  const copied = new Set();
  for (const p of pairs) {
    const src = path.join(imagesDir, p.image);
    const dst = path.join(webImagesDir, p.image);
    if (!copied.has(p.image) && fs.existsSync(src)) {
      fs.copyFileSync(src, dst);
      copied.add(p.image);
    }
  }

  // Load existing memories.json and update image fields by fuzzy name match (exact first)
  const memoriesPath = path.join(publicDir, 'memories.json');
  const memories = JSON.parse(fs.readFileSync(memoriesPath, 'utf8'));

  function normalizeName(s) {
    return s.toLowerCase().replace(/[^a-zçğıöşüâêîôû0-9]+/g, ' ').trim();
  }

  const nameToImage = new Map();
  for (const { name, image } of pairs) {
    nameToImage.set(normalizeName(name), image);
  }

  const updated = memories.map(m => {
    const key = normalizeName(m.name || '');
    const img = nameToImage.get(key) || null;
    if (img) {
      return { ...m, image: `/memories_photos/${img}` };
    }
    return m;
  });

  fs.writeFileSync(memoriesPath, JSON.stringify(updated, null, 2), 'utf8');
  console.log(`Mapped ${pairs.length} name→image pairs. Updated ${updated.filter(m=>m.image).length} records.`);
}

if (require.main === module) {
  main();
}


