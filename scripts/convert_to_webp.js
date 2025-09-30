const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// WebP'ye çevirme scripti
async function convertToWebP() {
  const imagesDir = path.join(__dirname, '../public/images');
  
  console.log('🔍 Görsel dosyaları taranıyor...');
  
  // Tüm görsel dosyalarını bul
  const imageFiles = [];
  
  function findImages(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findImages(filePath);
      } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
        imageFiles.push(filePath);
      }
    });
  }
  
  findImages(imagesDir);
  
  console.log(`📊 Toplam ${imageFiles.length} görsel dosyası bulundu`);
  
  let totalOriginalSize = 0;
  let totalWebPSize = 0;
  let convertedCount = 0;
  
  // WebP'ye çevir
  for (const imagePath of imageFiles) {
    try {
      const originalSize = fs.statSync(imagePath).size;
      totalOriginalSize += originalSize;
      
      const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      // Eğer WebP versiyonu yoksa çevir
      if (!fs.existsSync(webpPath)) {
        console.log(`🔄 Çevriliyor: ${path.basename(imagePath)}`);
        
        // cwebp ile çevir (yüksek kalite, düşük boyut)
        execSync(`cwebp -q 80 -m 6 "${imagePath}" -o "${webpPath}"`, { stdio: 'pipe' });
        
        const webpSize = fs.statSync(webpPath).size;
        totalWebPSize += webpSize;
        
        const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
        console.log(`✅ ${path.basename(imagePath)} → ${path.basename(webpPath)} (${savings}% tasarruf)`);
        
        convertedCount++;
      } else {
        // WebP zaten varsa boyutunu say
        const webpSize = fs.statSync(webpPath).size;
        totalWebPSize += webpSize;
      }
    } catch (error) {
      console.error(`❌ Hata: ${imagePath}`, error.message);
    }
  }
  
  console.log('\n📈 Dönüşüm Raporu:');
  console.log(`- Çevrilen dosya sayısı: ${convertedCount}`);
  console.log(`- Toplam orijinal boyut: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`- Toplam WebP boyut: ${(totalWebPSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`- Toplam tasarruf: ${(((totalOriginalSize - totalWebPSize) / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log(`- Tasarruf edilen alan: ${((totalOriginalSize - totalWebPSize) / 1024 / 1024).toFixed(2)} MB`);
}

// Script çalıştır
convertToWebP().catch(console.error);
