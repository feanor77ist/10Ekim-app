# SEO Şablonları - Sayfa Başına SEO Tag'leri

Bu dosya, her sayfa için kullanılacak SEO meta tag örneklerini içerir. `src/components/SEO.js` bileşenini her sayfada kullanın.

## Kullanım Örneği:

```javascript
import SEO from '../components/SEO';

const YourPage = () => {
  return (
    <>
      <SEO 
        title="Sayfa Başlığı - 10 Ekim Davası"
        description="Sayfa açıklaması (150-160 karakter)"
        keywords="anahtar, kelimeler, virgülle, ayrılmış"
        url="https://10ekimdavasi.com/sayfa-url"
      />
      {/* Sayfa içeriği */}
    </>
  );
};
```

---

## Sayfa Başına SEO Tag'leri

### 1. Ana Sayfa (/)
✅ **Eklendi**
```javascript
<SEO 
  title="10 Ekim Davası - Ankara Gar Katliamı"
  description="10 Ekim 2015 Ankara Gar Katliamı ile ilgili belgeler, haberler, yargı süreci ve adalet arayışının kapsamlı arşivi. 103 can, 500'den fazla yaralı. Adalet bekliyor."
  keywords="10 Ekim, Ankara Gar Katliamı, 10 Ekim 2015, adalet, dava, yargı süreci, insan hakları, barış mitingi, terör saldırısı"
  url="https://10ekimdavasi.com"
/>
```

---

### 2. Hafıza Arşivi (/hafiza-arsivi)
```javascript
<SEO 
  title="Hafıza Arşivi - 10 Ekim Davası"
  description="10 Ekim Ankara Gar Katliamı'nda hayatını kaybedenlerin anıları, fotoğrafları ve yaşam öyküleri. 103 canın hafızası burada yaşıyor."
  keywords="10 Ekim anılar, kurbanlar, yaşam öyküleri, fotoğraf arşivi, hafıza, anma"
  url="https://10ekimdavasi.com/hafiza-arsivi"
  structuredData={{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "10 Ekim Hafıza Arşivi",
    "description": "10 Ekim kurbanlarının anıları ve yaşam öyküleri",
    "url": "https://10ekimdavasi.com/hafiza-arsivi"
  }}
/>
```

**Eklenecek Dosya:** `src/pages/MemoryArchive.js`

---

### 3. Süreç / Timeline (/surec)
```javascript
<SEO 
  title="Yargı Süreci ve Zaman Çizelgesi - 10 Ekim Davası"
  description="10 Ekim Ankara Gar Katliamı'nın yargı süreci, önemli gelişmeler ve zaman çizelgesi. Davadan haberdar olun, adaleti takip edin."
  keywords="10 Ekim yargı süreci, dava gelişmeleri, mahkeme süreçleri, zaman çizelgesi, timeline"
  url="https://10ekimdavasi.com/surec"
  structuredData={{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "10 Ekim Yargı Süreci",
    "description": "10 Ekim katliamı yargı süreci ve zaman çizelgesi",
    "url": "https://10ekimdavasi.com/surec"
  }}
/>
```

**Eklenecek Dosya:** `src/pages/Timeline.js`

---

### 4. Hakkında (/hakkinda)
✅ **Eklendi**
```javascript
<SEO 
  title="Hakkında - 10 Ekim Davası"
  description="10 Ekim 2015 Ankara Gar Katliamı'nda 103 kişi hayatını kaybetti, 500'den fazla insan yaralandı. Adalet mücadelesinin öyküsü ve süreç hakkında detaylı bilgi."
  keywords="10 Ekim hakkında, Ankara Gar Katliamı nedir, barış mitingi, IŞİD saldırısı, adalet mücadelesi"
  url="https://10ekimdavasi.com/hakkinda"
/>
```

---

### 5. Kararlar (/kararlar)
```javascript
<SEO 
  title="Mahkeme Kararları - 10 Ekim Davası"
  description="10 Ekim Ankara Gar Katliamı ile ilgili tüm mahkeme kararları, gerekçeli kararlar ve hukuki belgeler. Adalet sisteminin kararlarını inceleyin."
  keywords="10 Ekim mahkeme kararları, gerekçeli karar, yargı kararları, hukuki belgeler, mahkeme tutanakları"
  url="https://10ekimdavasi.com/kararlar"
  structuredData={{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "10 Ekim Mahkeme Kararları",
    "description": "10 Ekim katliamı ile ilgili mahkeme kararları arşivi",
    "url": "https://10ekimdavasi.com/kararlar"
  }}
/>
```

**Eklenecek Dosya:** `src/pages/Kararlar.js`

---

### 6. Belgeler & Raporlar (/belgeler-raporlar)
```javascript
<SEO 
  title="Belgeler ve Raporlar - 10 Ekim Davası"
  description="10 Ekim Ankara Gar Katliamı ile ilgili resmi belgeler, araştırma raporları, bilirkişi raporları ve hukuki mütalalar. TTB, ÖHD ve mülkiye müfettişleri raporları."
  keywords="10 Ekim belgeleri, araştırma raporları, TTB raporu, ÖHD raporu, bilirkişi raporu, disiplin soruşturması"
  url="https://10ekimdavasi.com/belgeler-raporlar"
  structuredData={{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "10 Ekim Belgeler ve Raporlar",
    "description": "10 Ekim katliamı ile ilgili resmi belgeler ve raporlar",
    "url": "https://10ekimdavasi.com/belgeler-raporlar"
  }}
/>
```

**Eklenecek Dosya:** `src/pages/BelgelerRaporlar.js`

---

### 7. Haberler (/haberler)
✅ **Eklendi**
```javascript
<SEO 
  title="Haber Arşivi - 10 Ekim Davası"
  description="10 Ekim Ankara Gar Katliamı ile ilgili haberler, medya takibi ve gelişmeler. Yargı süreci, tanık ifadeleri ve adalet arayışına dair tüm haberler."
  keywords="10 Ekim haberleri, Ankara Gar Katliamı haberleri, dava haberleri, yargı süreci, medya takibi"
  url="https://10ekimdavasi.com/haberler"
/>
```

---

### 8. Açıklamalar (/aciklamalar)
```javascript
<SEO 
  title="Basın Açıklamaları - 10 Ekim Davası"
  description="10 Ekim Ankara Gar Katliamı ile ilgili basın açıklamaları, aileler platformu bildirgeleri ve kamuoyu açıklamaları. Adaletin sesi burada."
  keywords="10 Ekim basın açıklamaları, aileler platformu, kamuoyu açıklamaları, dava açıklamaları"
  url="https://10ekimdavasi.com/aciklamalar"
  structuredData={{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "10 Ekim Basın Açıklamaları",
    "description": "10 Ekim aileler platformu ve komisyon basın açıklamaları",
    "url": "https://10ekimdavasi.com/aciklamalar"
  }}
/>
```

**Eklenecek Dosya:** `src/pages/Aciklamalar.js`

---

### 9. Sözler - Davanın Sahipleri Konuşuyor (/sozler)
```javascript
<SEO 
  title="Davanın Sahipleri Konuşuyor - 10 Ekim Davası"
  description="10 Ekim Ankara Gar Katliamı kurbanlarının aileleri konuşuyor. Acılarını, adalet arayışlarını ve umutlarını dinleyin. Her söz bir tanıklık."
  keywords="10 Ekim aileler, kurban aileleri, tanıklıklar, aileler konuşuyor, adalet arayışı"
  url="https://10ekimdavasi.com/sozler"
  structuredData={{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Davanın Sahipleri Konuşuyor",
    "description": "10 Ekim kurban ailelerinin tanıklıkları ve sözleri",
    "url": "https://10ekimdavasi.com/sozler"
  }}
/>
```

**Eklenecek Dosya:** `src/pages/Sozler.js`

---

### 10. Anma Yazıları (/yazilar)
```javascript
<SEO 
  title="Anma Yazıları - 10 Ekim Davası"
  description="10 Ekim Ankara Gar Katliamı'nın yıl dönümlerinde yazılan anma yazıları, şiirler ve hatıratlar. Hafızamızda yaşatıyoruz."
  keywords="10 Ekim anma yazıları, hatıra yazıları, şiirler, yıl dönümü, anma günü"
  url="https://10ekimdavasi.com/yazilar"
  structuredData={{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "10 Ekim Anma Yazıları",
    "description": "10 Ekim yıl dönümlerinde yazılan anma yazıları ve şiirler",
    "url": "https://10ekimdavasi.com/yazilar"
  }}
/>
```

**Eklenecek Dosya:** `src/pages/AnniversaryWritings.js`

---

### 11. Görseller (/gorseller)
```javascript
<SEO 
  title="Fotoğraf Arşivi - 10 Ekim Davası"
  description="10 Ekim Ankara Gar Katliamı'nın fotoğraf arşivi. Anma törenleri, yargı süreci ve unutulmayan anlar. Her fotoğraf bir belge, her kare bir tanıklık."
  keywords="10 Ekim fotoğraflar, görsel arşiv, anma töreni fotoğrafları, basından kareler"
  url="https://10ekimdavasi.com/gorseller"
  structuredData={{
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "10 Ekim Fotoğraf Arşivi",
    "description": "10 Ekim katliamı ve adalet mücadelesinin fotoğraf arşivi",
    "url": "https://10ekimdavasi.com/gorseller"
  }}
/>
```

**Eklenecek Dosya:** Henüz tamamlanmamış (placeholder page)

---

### 12. Yitirdiklerimiz (/yitirdiklerimiz)
```javascript
<SEO 
  title="Yitirdiklerimiz - 10 Ekim Davası"
  description="10 Ekim 2015 Ankara Gar Katliamı'nda hayatını kaybeden 103 kişinin isimleri, yaşam öyküleri ve anıları. Unutmadık, unutmayacağız, unutturmayacağız."
  keywords="10 Ekim kurbanları, hayatını kaybedenler, isim listesi, yaşam öyküleri, 103 can"
  url="https://10ekimdavasi.com/yitirdiklerimiz"
  structuredData={{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "10 Ekim'de Yitirdiklerimiz",
    "description": "10 Ekim katliamında hayatını kaybeden 103 kişinin anısına",
    "url": "https://10ekimdavasi.com/yitirdiklerimiz",
    "about": {
      "@type": "Event",
      "name": "10 Ekim Ankara Gar Katliamı",
      "startDate": "2015-10-10",
      "location": {
        "@type": "Place",
        "name": "Ankara Gar",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ankara",
          "addressCountry": "TR"
        }
      }
    }
  }}
/>
```

**Eklenecek Dosya:** Henüz tamamlanmamış (placeholder page)

---

## Toplu Uygulama Stratejisi

Tüm sayfalara SEO eklemek için:

1. **İlk olarak import edin:**
   ```javascript
   import SEO from '../components/SEO';
   ```

2. **Component'in return statement'ının en üstüne ekleyin:**
   ```javascript
   return (
     <>
       <SEO {...yukarıdaki örneklerden birini buraya kopyalayın} />
       {/* Mevcut JSX kodunuz */}
     </>
   );
   ```

3. **Test edin:**
   - Tarayıcıda sayfayı açın
   - Sağ tıklayıp "Inspect" > "Head" bölümüne bakın
   - Meta tag'lerin doğru eklendiğini kontrol edin

---

## Dinamik İçerik için SEO

Eğer sayfa dinamik içerik gösteriyorsa (örneğin haber detay sayfası):

```javascript
const HaberDetay = () => {
  const [haber, setHaber] = useState(null);
  
  return (
    <>
      {haber && (
        <SEO 
          title={`${haber.baslik} - 10 Ekim Davası`}
          description={haber.ozet || haber.icerik.substring(0, 155)}
          keywords={`10 Ekim, ${haber.kaynak}, ${haber.tarih}`}
          url={`https://10ekimdavasi.com/haber/${haber.id}`}
          image={haber.gorsel}
        />
      )}
      {/* Haber içeriği */}
    </>
  );
};
```

---

## İlerleme Durumu

- ✅ Ana Sayfa (/)
- ✅ Haberler (/haberler)
- ✅ Hakkında (/hakkinda)
- ⏳ Hafıza Arşivi (/hafiza-arsivi)
- ⏳ Süreç (/surec)
- ⏳ Kararlar (/kararlar)
- ⏳ Belgeler & Raporlar (/belgeler-raporlar)
- ⏳ Açıklamalar (/aciklamalar)
- ⏳ Sözler (/sozler)
- ⏳ Yazılar (/yazilar)
- ⏳ Görseller (/gorseller)
- ⏳ Yitirdiklerimiz (/yitirdiklerimiz)

**Tavsiye:** Önce tamamlanmış sayfalara odaklanın, sonra placeholder sayfaları tamamladıkça SEO ekleyin.

