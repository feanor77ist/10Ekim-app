const fs = require('fs');
const path = require('path');

function isLikelyNameLine(line) {
  if (!line) return false;
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('http')) return false;
  if (/^\d/.test(trimmed)) return false; // starts with digit
  if (/[.:!?]$/.test(trimmed)) return false; // ends with punctuation
  if (trimmed.includes('\t')) return false; // bullets
  if (trimmed.length > 60) return false; // too long for a name
  // Heuristic: 1-5 words, each word starts with uppercase (allow Turkish chars)
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length < 1 || words.length > 6) return false;
  let capitalizedWords = 0;
  for (const w of words) {
    const first = w[0];
    if (/[A-ZÇĞİÖŞÜÂÊÎÔÛ]/.test(first)) capitalizedWords += 1;
  }
  if (capitalizedWords < Math.min(words.length, 2)) return false;
  // Avoid header lines
  if (/Katliamı|yaşam|Giriş|Güncelleme/i.test(trimmed)) return false;
  return true;
}

function parseTxtToEntries(txt) {
  const lines = txt.split(/\r?\n/);
  // First non-empty line is likely the source URL
  const firstNonEmpty = lines.find(l => l.trim().length > 0) || '';
  const sourceUrl = firstNonEmpty.startsWith('http') ? firstNonEmpty.trim() : '';

  const entries = [];
  let current = null;
  let buffer = [];

  function flush() {
    if (current) {
      const bio = buffer.join('\n').trim();
      entries.push({
        name: current,
        image: null,
        bio,
        source: sourceUrl
      });
    }
    current = null;
    buffer = [];
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();
    if (isLikelyNameLine(trimmed)) {
      // If we already had a current entry and accumulated some text, flush
      if (current && buffer.length > 0) flush();
      // Start new entry
      current = trimmed;
      buffer = [];
      continue;
    }
    if (current) {
      buffer.push(line);
    }
  }
  // flush last
  flush();

  // Post-process: keep only entries that have some bio content
  const cleaned = entries
    .map(e => ({
      ...e,
      bio: e.bio.replace(/\n{3,}/g, '\n\n').trim()
    }))
    .filter(e => e.bio && e.bio.length > 0);

  return cleaned;
}

function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const inputPath = path.join(projectRoot, 'public', 'birgun_yasam_oykuleri.txt');
  const outputPath = path.join(projectRoot, 'public', 'memories.json');

  if (!fs.existsSync(inputPath)) {
    console.error('Input TXT not found:', inputPath);
    process.exit(1);
  }

  const txt = fs.readFileSync(inputPath, 'utf8');
  const entries = parseTxtToEntries(txt);

  // For short bio: take first paragraph up to ~600 chars
  const MAX_BIO = 600;
  const normalized = entries.map(e => {
    const firstPara = (e.bio.split(/\n\n+/)[0] || e.bio).replace(/\s+/g, ' ').trim();
    const shortBio = firstPara.length > MAX_BIO ? firstPara.slice(0, MAX_BIO - 1).trimEnd() + '…' : firstPara;
    return {
      name: e.name,
      image: e.image,
      bio: shortBio,
      source: e.source
    };
  });

  fs.writeFileSync(outputPath, JSON.stringify(normalized, null, 2), 'utf8');
  console.log(`Wrote ${normalized.length} entries to ${outputPath}`);
}

if (require.main === module) {
  main();
}

module.exports = { parseTxtToEntries };


