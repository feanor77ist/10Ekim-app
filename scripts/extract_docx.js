const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

async function extractDocxContent() {
  try {
    const docxPath = path.join(__dirname, '../public/yazılar/GİRİŞ-Özgür Sevgi Göral-yayımlanacak son hali-26.09.2025 (1).docx');
    
    console.log('📄 Word dosyası okunuyor...');
    console.log('Dosya yolu:', docxPath);
    
    // Word dosyasını HTML formatında oku
    const result = await mammoth.convertToHtml({ path: docxPath });
    const html = result.value;
    
    console.log('✅ İçerik başarıyla çıkarıldı!');
    console.log('📝 İçerik uzunluğu:', html.length, 'karakter');
    console.log('\n📄 HTML İçerik:');
    console.log('='.repeat(50));
    console.log(html);
    console.log('='.repeat(50));
    
    // JSON dosyasını güncelle
    updateJsonWithContent(html);
    
  } catch (error) {
    console.error('❌ Hata:', error.message);
  }
}

function updateJsonWithContent(content) {
  try {
    const jsonPath = path.join(__dirname, '../public/anniversary_writings.json');
    
    // JSON dosyasını oku
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const writings = JSON.parse(jsonData);
    
    // "Giriş" yazısını bul (ID: 1)
    const girisyazisi = writings.find(w => w.id === 1);
    
    if (girisyazisi) {
      // İçeriği güncelle
      girisyazisi.content = content;
      girisyazisi.published = true;
      
      // JSON dosyasını kaydet
      fs.writeFileSync(jsonPath, JSON.stringify(writings, null, 2), 'utf8');
      
      console.log('\n✅ JSON dosyası güncellendi!');
      console.log('📝 Başlık:', girisyazisi.title);
      console.log('👤 Yazar:', girisyazisi.author);
      console.log('📊 İçerik uzunluğu:', content.length, 'karakter');
    } else {
      console.log('❌ Giriş yazısı bulunamadı!');
    }
    
  } catch (error) {
    console.error('❌ JSON güncelleme hatası:', error.message);
  }
}

// Scripti çalıştır
extractDocxContent();
