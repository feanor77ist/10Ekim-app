// Cloudinary kurulum ve kullanım rehberi
const cloudinary = require('cloudinary').v2;

// Cloudinary konfigürasyonu
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Dosya yükleme fonksiyonu
async function uploadToCloudinary(filePath, folder = '10ekim-app') {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'auto', // Otomatik tip tespiti
      quality: 'auto', // Otomatik kalite optimizasyonu
      fetch_format: 'auto' // Otomatik format optimizasyonu
    });
    
    console.log(`✅ Yüklendi: ${result.public_id}`);
    console.log(`🔗 URL: ${result.secure_url}`);
    console.log(`📏 Boyut: ${result.bytes} bytes`);
    
    return result;
  } catch (error) {
    console.error(`❌ Yükleme hatası: ${filePath}`, error.message);
    return null;
  }
}

// Toplu yükleme fonksiyonu
async function uploadAllFiles() {
  const fs = require('fs');
  const path = require('path');
  
  // Yüklenecek dosya türleri
  const fileExtensions = ['.mp4', '.mp3', '.pdf', '.jpg', '.jpeg', '.png'];
  const uploadDirs = [
    '../src/images',
    '../public/kararlar',
    '../public/belgeler-raporlar',
    '../public/basın açıklamaları'
  ];
  
  const uploadedFiles = [];
  
  for (const dir of uploadDirs) {
    const fullPath = path.join(__dirname, dir);
    
    if (!fs.existsSync(fullPath)) continue;
    
    const files = fs.readdirSync(fullPath);
    
    for (const file of files) {
      const filePath = path.join(fullPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isFile() && fileExtensions.some(ext => file.toLowerCase().endsWith(ext))) {
        console.log(`\n📤 Yükleniyor: ${file}`);
        
        const result = await uploadToCloudinary(filePath, dir.replace('../', ''));
        
        if (result) {
          uploadedFiles.push({
            originalPath: filePath,
            cloudinaryUrl: result.secure_url,
            publicId: result.public_id,
            size: result.bytes
          });
        }
        
        // Rate limiting için bekle
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  
  // Sonuçları JSON dosyasına kaydet
  fs.writeFileSync(
    path.join(__dirname, '../cloudinary-uploads.json'),
    JSON.stringify(uploadedFiles, null, 2)
  );
  
  console.log(`\n🎯 Toplam ${uploadedFiles.length} dosya Cloudinary'e yüklendi`);
  console.log('📄 Sonuçlar cloudinary-uploads.json dosyasına kaydedildi');
}

// Script çalıştır
if (require.main === module) {
  uploadAllFiles().catch(console.error);
}

module.exports = { uploadToCloudinary, uploadAllFiles };
