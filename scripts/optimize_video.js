const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Video optimizasyon scripti
async function optimizeVideos() {
  const videosDir = path.join(__dirname, '../src/images');
  
  console.log('🎥 Video dosyaları optimize ediliyor...');
  
  // Video dosyalarını bul
  const videoFiles = fs.readdirSync(videosDir).filter(file => 
    /\.(mp4|mov|avi)$/i.test(file)
  );
  
  console.log(`📊 Toplam ${videoFiles.length} video dosyası bulundu`);
  
  for (const videoFile of videoFiles) {
    const videoPath = path.join(videosDir, videoFile);
    const originalSize = fs.statSync(videoPath).size;
    
    console.log(`\n🔄 Optimize ediliyor: ${videoFile}`);
    console.log(`📏 Orijinal boyut: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Optimize edilmiş dosya adı
    const optimizedName = videoFile.replace(/\.(mp4|mov|avi)$/i, '_optimized.mp4');
    const optimizedPath = path.join(videosDir, optimizedName);
    
    try {
      // FFmpeg ile optimize et
      // -crf 28: Kalite/bitrate dengesi (18-28 arası önerilen)
      // -preset slow: Daha iyi sıkıştırma
      // -vf scale: Çözünürlük azalt (isteğe bağlı)
      const command = `ffmpeg -i "${videoPath}" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart "${optimizedPath}"`;
      
      console.log('⏳ FFmpeg işlemi başlıyor...');
      execSync(command, { stdio: 'pipe' });
      
      const optimizedSize = fs.statSync(optimizedPath).size;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      
      console.log(`✅ Optimize edildi: ${optimizedName}`);
      console.log(`📏 Yeni boyut: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`💾 Tasarruf: ${savings}% (${((originalSize - optimizedSize) / 1024 / 1024).toFixed(2)} MB)`);
      
      // Orijinal dosyayı yedekle
      const backupPath = videoPath.replace(/\.(mp4|mov|avi)$/i, '_original.$1');
      fs.renameSync(videoPath, backupPath);
      console.log(`💾 Orijinal dosya yedeklendi: ${path.basename(backupPath)}`);
      
    } catch (error) {
      console.error(`❌ Hata: ${videoFile}`, error.message);
    }
  }
  
  console.log('\n🎯 Video optimizasyonu tamamlandı!');
  console.log('💡 Not: Orijinal dosyalar _original uzantısıyla yedeklendi');
}

// Script çalıştır
optimizeVideos().catch(console.error);
