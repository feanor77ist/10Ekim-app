# 📊 SEO ve Analytics Kurulum Rehberi - 10 Ekim Davası

Bu rehber, sitenizin arama motorlarında daha iyi sıralanması ve trafiğini analiz edebilmeniz için gerekli tüm adımları içermektedir.

## ✅ Tamamlanan SEO Optimizasyonları

### 1. Canonical URL ve Meta Tag'ler
- ✅ Canonical link eklendi: `https://10ekimdavasi.com`
- ✅ Open Graph meta tag'leri (Facebook, LinkedIn için)
- ✅ Twitter Card meta tag'leri
- ✅ Temel SEO meta tag'leri (description, keywords)

### 2. Sitemap ve Robots.txt
- ✅ `sitemap.xml` oluşturuldu (tüm sayfalar dahil)
- ✅ `robots.txt` güncellendi ve sitemap referansı eklendi
- ✅ Arama motorlarının tüm önemli sayfalara erişimi sağlandı

### 3. Structured Data (JSON-LD)
- ✅ Organization schema eklendi
- ✅ BreadcrumbList schema eklendi
- ✅ WebSite schema eklendi (arama özelliği ile)

### 4. React Helmet Async
- ✅ Her sayfaya dinamik meta tag desteği eklendi
- ✅ SEO bileşeni oluşturuldu ve örnek sayfalara uygulandı

---

## 🚀 Yapılması Gereken Adımlar

### 1. Google Search Console Kurulumu

**Adım 1: Hesap Oluşturma**
1. [Google Search Console](https://search.google.com/search-console/)'a gidin
2. Google hesabınızla giriş yapın
3. "Özellik ekle" butonuna tıklayın

**Adım 2: Domain Doğrulama**
1. **Domain** seçeneğini tercih edin (önerilen)
2. Domain'inizi girin: `10ekimdavasi.com`
3. DNS doğrulama yöntemiyle doğrulayın:
   - Size verilen TXT kaydını domain sağlayıcınızın DNS ayarlarına ekleyin
   - Vercel kullanıyorsanız: Vercel Dashboard > Domains > DNS Records
   
   **Vercel DNS Ayarları:**
   ```
   Type: TXT
   Name: @
   Value: [Google'dan aldığınız kod]
   ```

**Adım 3: Sitemap Gönderimi**
1. Search Console'da "Sitemaps" bölümüne gidin
2. Sitemap URL'inizi ekleyin: `https://10ekimdavasi.com/sitemap.xml`
3. "Gönder" butonuna tıklayın

**Adım 4: İlk İndeksleme İsteği**
1. "URL Inspection" aracını kullanın
2. Ana sayfa URL'inizi girin: `https://10ekimdavasi.com`
3. "İndeksleme Talep Et" butonuna tıklayın
4. Diğer önemli sayfalar için de tekrarlayın

---

### 2. Google Analytics 4 (GA4) Kurulumu

**Adım 1: Hesap Oluşturma**
1. [Google Analytics](https://analytics.google.com/)'e gidin
2. "Yönetici" > "Hesap Oluştur" seçin
3. Hesap adı: "10 Ekim Davası"
4. Özellik adı: "10ekimdavasi.com"
5. Saat dilimi: "Türkiye"
6. Para birimi: "Turkish Lira"

**Adım 2: Veri Akışı Oluşturma**
1. "Web" platformunu seçin
2. Website URL: `https://10ekimdavasi.com`
3. Stream adı: "10 Ekim Davası Website"
4. "Veri akışı oluştur" butonuna tıklayın

**Adım 3: Measurement ID'yi Almak**
1. Oluşturulan veri akışına tıklayın
2. **Measurement ID**'yi kopyalayın (G-XXXXXXXXXX formatında)

**Adım 4: React Uygulamasına Entegrasyon**

1. **Google Analytics paketini kurun:**
   ```bash
   npm install react-ga4
   ```

2. **src/index.js dosyasını güncelleyin:**
   ```javascript
   import ReactGA from 'react-ga4';
   
   // Google Analytics başlat
   ReactGA.initialize('G-XXXXXXXXXX'); // Measurement ID'nizi buraya yazın
   
   // Sayfa görüntülemelerini takip et
   ReactGA.send({ hitType: "pageview", page: window.location.pathname });
   ```

3. **src/App.js'e sayfa değişikliği takibi ekleyin:**
   ```javascript
   import { useEffect } from 'react';
   import { useLocation } from 'react-router-dom';
   import ReactGA from 'react-ga4';
   
   function App() {
     const location = useLocation();
     
     useEffect(() => {
       // Her sayfa değişikliğinde Google Analytics'e bildir
       ReactGA.send({ 
         hitType: "pageview", 
         page: location.pathname + location.search 
       });
     }, [location]);
     
     // ... geri kalan kod
   }
   ```

**Adım 5: Önemli Olayları Takip Etme**
```javascript
// Örnek: PDF indirme takibi
ReactGA.event({
  category: 'Belgeler',
  action: 'PDF İndirildi',
  label: 'Araştırma Raporu'
});

// Örnek: Video izleme takibi
ReactGA.event({
  category: 'Video',
  action: 'Video İzlendi',
  label: 'Ana Sayfa Videosu'
});

// Örnek: Haber detay görüntüleme
ReactGA.event({
  category: 'Haber',
  action: 'Haber Görüntülendi',
  label: haberBasligi
});
```

---

### 3. Vercel Analytics (Opsiyonel ama Önerilir)

Vercel Analytics, React uygulamanızın performansını ve ziyaretçi davranışlarını izlemek için harika bir araçtır ve çok kolay kurulur.

**Kurulum:**
```bash
npm install @vercel/analytics
```

**src/App.js'e ekleyin:**
```javascript
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      {/* Mevcut kodunuz */}
      <Analytics />
    </>
  );
}
```

---

### 4. Microsoft Bing Webmaster Tools

Google'a ek olarak Bing'de de indekslenmeniz önemlidir:

1. [Bing Webmaster Tools](https://www.bing.com/webmasters/)'a gidin
2. Google Search Console hesabınızla import edebilirsiniz
3. Veya manuel olarak site ekleyip doğrulayın
4. Sitemap'inizi gönderin: `https://10ekimdavasi.com/sitemap.xml`

---

### 5. Sosyal Medya Meta Tag Test Araçları

Sitenizin sosyal medyada nasıl görüneceğini test edin:

**Facebook & LinkedIn:**
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- URL'inizi girin: `https://10ekimdavasi.com`
- "Scrape Again" butonuna tıklayın

**Twitter:**
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- URL'inizi test edin

**Genel Test:**
- [Rich Results Test](https://search.google.com/test/rich-results) - Structured Data testi
- [PageSpeed Insights](https://pagespeed.web.dev/) - Performans ve SEO analizi

---

## 📈 Performans ve Teknik SEO İyileştirmeleri

### Yapılmış Optimizasyonlar:
- ✅ Vercel Speed Insights entegrasyonu mevcut
- ✅ WebP formatında görseller kullanılıyor
- ✅ React lazy loading
- ✅ PWA desteği (manifest.json)

### Önerilen İyileştirmeler:

#### 1. Görsel Optimizasyonu
```javascript
// public/images/ klasöründeki tüm görsellere alt text ekleyin
<img src="..." alt="10 Ekim Ankara Gar Katliamı anma töreni" />
```

#### 2. Yavaş Bağlantılarda Performans
```javascript
// Lazy loading için React.lazy kullanın
const Timeline = React.lazy(() => import('./pages/Timeline'));
const Haberler = React.lazy(() => import('./pages/Haberler'));

// Suspense ile sarmalayın
<Suspense fallback={<div>Yükleniyor...</div>}>
  <Routes>
    <Route path="/surec" element={<Timeline />} />
    <Route path="/haberler" element={<Haberler />} />
  </Routes>
</Suspense>
```

#### 3. Önbellek Stratejisi
Vercel otomatik olarak static dosyaları önbelleğe alır, ancak ek optimizasyon için:

**vercel.json** oluşturun (proje kök dizininde):
```json
{
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*).html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

---

## 🔍 Anahtar Kelime Stratejisi

Siteniz için önerilen anahtar kelimeler:

### Birincil Anahtar Kelimeler:
- 10 Ekim
- 10 Ekim Davası
- Ankara Gar Katliamı
- 10 Ekim 2015

### İkincil Anahtar Kelimeler:
- 10 Ekim adalet mücadelesi
- Ankara Gar saldırısı davası
- Barış mitingi katliamı
- 10 Ekim belgeler
- 10 Ekim yargı süreci
- IŞİD Ankara saldırısı

### Long-tail Keywords (Uzun Kuyruk):
- 10 Ekim Ankara Gar Katliamı nedir
- 10 Ekim davası son durum
- 10 Ekim katliamı mahkeme kararları
- Ankara Gar saldırısı sorumlular kimler
- 10 Ekim kurbanları kimler

---

## 📱 Sosyal Medya Entegrasyonu

### Yapılması Gerekenler:

1. **Sosyal Medya Hesapları:**
   - Twitter/X hesabı açın ve index.html'deki Organization schema'ya ekleyin
   - Instagram hesabı açın
   - Facebook sayfası oluşturun
   
2. **Schema Güncellemesi:**
   ```json
   "sameAs": [
     "https://twitter.com/10ekimdavasi",
     "https://www.facebook.com/10ekimdavasi",
     "https://www.instagram.com/10ekimdavasi"
   ]
   ```

3. **Paylaşım Butonları:**
   Her haber ve belge sayfasına sosyal medya paylaşım butonları ekleyin

---

## 🎯 İlk 30 Gün İçinde Yapılması Gerekenler

### Hafta 1: Teknik SEO
- [x] Canonical URL ekle
- [x] Sitemap oluştur ve gönder
- [x] robots.txt güncelle
- [ ] Google Search Console'da site doğrula
- [ ] Bing Webmaster Tools'a kaydet

### Hafta 2: Analytics ve Takip
- [ ] Google Analytics 4 kur
- [ ] Vercel Analytics aktive et
- [ ] Önemli olayları (events) tanımla
- [ ] Dönüşüm hedefleri belirle

### Hafta 3: İçerik ve Sosyal Medya
- [ ] Sosyal medya hesaplarını aç
- [ ] İlk paylaşımları yap
- [ ] Sosyal medya meta tag'lerini test et
- [ ] Tüm sayfalara SEO bileşenini ekle

### Hafta 4: Analiz ve İyileştirme
- [ ] İlk performans raporlarını incele
- [ ] Yavaş yüklenen sayfaları optimize et
- [ ] Görsel alt text'lerini tamamla
- [ ] Kırık linkleri kontrol et

---

## 📊 Başarı Metrikleri

Aşağıdaki metrikleri düzenli olarak takip edin:

### Google Search Console:
- Toplam gösterim sayısı
- Ortalama konum
- Tıklama oranı (CTR)
- Hangi sorgularda çıkıyorsunuz

### Google Analytics:
- Aktif kullanıcı sayısı
- Sayfa görüntülemeleri
- Ortalama oturum süresi
- Hemen çıkma oranı
- En çok ziyaret edilen sayfalar
- Trafik kaynakları (organik, sosyal medya, direkt)

### Hedefler:
- **1. Ay:** 100+ organik ziyaretçi/gün
- **3. Ay:** 500+ organik ziyaretçi/gün
- **6. Ay:** 1000+ organik ziyaretçi/gün

---

## 🔗 Faydalı Kaynaklar

- [Google SEO Başlangıç Kılavuzu](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org Dokümantasyonu](https://schema.org/)
- [Vercel SEO Dokümantasyonu](https://vercel.com/docs/concepts/analytics/audiences/seo)
- [React Helmet Async](https://github.com/staylor/react-helmet-async)
- [Web.dev SEO Rehberi](https://web.dev/learn/seo/)

---

## ⚠️ Önemli Notlar

1. **Sitemap Güncellemesi:** Yeni sayfa eklendiğinde `public/sitemap.xml` dosyasını güncellemeyi unutmayın. Tarih olarak `<lastmod>` değerini güncelleyin.

2. **Sosyal Medya Görselleri:** Her sayfa için özel Open Graph görselleri (1200x630px) oluşturmak, sosyal medya paylaşımlarını çok daha etkili hale getirecektir.

3. **İçerik Güncelliği:** Arama motorları taze içeriği sever. Haber arşivini düzenli güncelleyin ve yeni gelişmeleri ekleyin.

4. **Backlink Stratejisi:** İnsan hakları, medya ve hukuk sitelerinden backlink almak SEO için çok önemlidir.

5. **Yerel SEO:** "Ankara" ve "Türkiye" gibi coğrafi terimleri içeriklerinizde kullanın.

---

## 🆘 Destek ve Sorular

Herhangi bir sorunuz veya teknik desteğe ihtiyacınız olursa:
- Google Search Console Help Community
- Vercel Support
- React Helmet Issues on GitHub

**Son Güncelleme:** 11 Ekim 2025

