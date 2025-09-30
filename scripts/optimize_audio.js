const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Audio optimizasyon scripti
async function optimizeAudios() {
  const audioDir = path.join(__dirname, '../src/images');
  
  console.log('🎵 Audio dosyaları optimize ediliyor...');
  
  // Audio dosyalarını bul
  const audioFiles = fs.readdirSync(audioDir).filter(file => 
    /\.(mp3|wav|m4a|aac)$/i.test(file)
  );
  
  console.log(`📊 Toplam ${audioFiles.length} audio dosyası bulundu`);
  
  for (const audioFile of audioFiles) {
    const audioPath = path.join(audioDir, audioFile);
    const originalSize = fs.statSync(audioPath).size;
    
    console.log(`\n🔄 Optimize ediliyor: ${audioFile}`);
    console.log(`📏 Orijinal boyut: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Optimize edilmiş dosya adı
    const optimizedName = audioFile.replace(/\.(mp3|wav|m4a|aac)$/i, '_optimized.mp3');
    const optimizedPath = path.join(audioDir, optimizedName);
    
    try {
      // FFmpeg ile optimize et
      // -b:a 128k: 128kbps bitrate (yeterli kalite)
      // -ar 44100: Sample rate
      const command = `ffmpeg -i "${audioPath}" -b:a 128k -ar 44100 -ac 2 "${optimizedPath}"`;
      
      console.log('⏳ FFmpeg işlemi başlıyor...');
      execSync(command, { stdio: 'pipe' });
      
      const optimizedSize = fs.statSync(optimizedPath).size;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      
      console.log(`✅ Optimize edildi: ${optimizedName}`);
      console.log(`📏 Yeni boyut: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`💾 Tasarruf: ${savings}% (${((originalSize - optimizedSize) / 1024 / 1024).toFixed(2)} MB)`);
      
      // Orijinal dosyayı yedekle
      const backupPath = audioPath.replace(/\.(mp3|wav|m4a|aac)$/i, '_original.$1');
      fs.renameSync(audioPath, backupPath);
      console.log(`💾 Orijinal dosya yedeklendi: ${path.basename(backupPath)}`);
      
    } catch (error) {
      console.error(`❌ Hata: ${audioFile}`, error.message);
    }
  }
  
  console.log('\n🎯 Audio optimizasyonu tamamlandı!');
  console.log('💡 Not: Orijinal dosyalar _original uzantısıyla yedeklendi');
}

// Script çalıştır
optimizeAudios().catch(console.error);
