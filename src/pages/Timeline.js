// src/pages/Timeline.js
import React, { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './Timeline.css';

const Timeline = () => {
  const [events, setEvents] = useState([]);
  const [showFullText, setShowFullText] = useState(false);
  const [showCloseBtn, setShowCloseBtn] = useState(false);

  // Türkçe karakterleri doğru şekilde büyük harfe dönüştüren fonksiyon
  const toTurkishUpperCase = (text) => {
    const turkishMap = {
      'ç': 'Ç', 'ğ': 'Ğ', 'ı': 'I', 'i': 'İ', 'ö': 'Ö', 'ş': 'Ş', 'ü': 'Ü'
    };
    
    return text
      .toLowerCase()
      .replace(/[çğıiöşü]/g, char => turkishMap[char] || char)
      .toUpperCase();
  };

  useEffect(() => {
    fetch('/timeline_events.json')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  // Scroll event listener for close button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (showFullText) {
        const scrollPosition = window.scrollY;
        
        // Show close button when user scrolls down 200px or more
        if (scrollPosition > 200) {
          setShowCloseBtn(true);
        } else {
          setShowCloseBtn(false);
        }
      }
    };

    if (showFullText) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setShowCloseBtn(false);
    }
  }, [showFullText]);

  return (
    <div className="timeline-wrapper">
      {/* Süreç Özeti Bölümü */}
      <div className="process-summary">
        <div className="process-summary-content">
          <h1 className="process-title">10 EKİM ANKARA KATLİAMI YARGILAMA SÜRECİ</h1>
          <div className="process-description">
            <p>
              <strong>10 EKİM KATLİAMI TÜRKİYE TARİHİNİN KIRILMA ANLARINDAN BİRİDİR.</strong>
            </p>
            <p>
              10 Ekim 2015 günü ülkenin dört bir yanından gelenler bir barış mitingi için Ankara'da buluşmuştu. 
              On binlerce insan, sabahın daha ilk saatlerinde Ankara Garı'nda toplanmış, kortejlerini oluşturmaya 
              başlamışlardı ki iki canlı bomba, miting alanında olan olmayan milyonlarca insanın yaşamını bir daha 
              asla eskisi gibi olmayacak biçimde değiştirdi. Katliamın arkasından ölenlerle birlikte 103 kişi 
              hayatını kaybetti, beş yüzden fazla kişi yaralandı, binlerce kişi tanıklık etti.
            </p>
            <p>
              10 Ekim 2015'in sonuçları, sadece katliamda ölenler ve yaralananlarla sınırlı değildir. 2015 yılı 
              Haziran seçimlerinin intikamı alınmış, "kaos istiyorsunuz madem buyurun kaos" denilmiş, katliamın 
              arkasından anketler yapılmış, Kasım seçimlerinde AKP'nin tek başına iktidar olmasının yolları bu 
              katliamla kurulmuştur.
            </p>
             <p>
               Gerçekten de 10 Ekim 2015'den sonra ülke bir daha normal ya da normale yakın günler görmedi. 
               Demokrasi ve insan haklarının, en temel hak ve hürriyetlerin yok edildiği, savaşın, şiddetin 
               hayatımızın her alanına girdiği günler yaşandı ve bu süreç halen devam ediyor. Bu nedenle 
               10 Ekim 2015 gününün her açıdan aydınlatılması, tüm sorumlulukların yerli yerine konulması 
               memleket tarihi açısından olmazsa olmazdır. Ülkenin yakın tarihi açısından pek çok şifrenin 
               bu katliamda olduğunu söylemek ise çok abartılı bir yaklaşım olmaz.
             </p>
             <div className="timeline-intro">
               <button 
                 className="read-more-btn"
                 onClick={() => setShowFullText(!showFullText)}
               >
                 {showFullText ? 'Daha Az Göster' : 'Devamını Oku'}
               </button>
             </div>
             
             {showFullText && showCloseBtn && (
               <button 
                 className="fixed-close-btn"
                 onClick={() => {
                   setShowFullText(false);
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                 }}
               >
                 Daha Az Göster
               </button>
             )}
             
             {showFullText && (
               <div className="full-text-section">
                 <div className="full-text-content">
                   <h2>İLK YARGILAMA SÜRECİ</h2>
                   <h3>MAĞDURLARDAN VE AVUKATLARINDAN GİZLENEN SORUŞTURMA, EKSİK VE YÜZEYSEL İDDİANAME</h3>
                   
                   <p>
                     10 Ekim Ankara Katliamının yargı süreci tam sekiz ay devam eden kısıtlılık kararı altında yürütülen bir soruşturma ile başlamış, soruşturma bitip de iddianame ortaya çıktığında ise tablonun vehameti ortaya çıkmıştır. Hiçbir araştırma yapılmamış, IŞİD denen örgüte yönelik derinlemesine bir çalışma içerisine girilmemiş, katliamı planladığı söylenen Yunus DURMAZ'ın dijital materyallerinden yola çıkarak baştan savma bir iddianame hazırlanmıştır. Yıllardır Gaziantep'te büyük bir rahatlıkla faaliyet yürüten IŞİD'liler alt alta yazılmış ve "katliamı bunlar yaptı" diyerek dosya esasından uzaklaştırılarak, aslında kapatılmaya çalışılmıştır.
                   </p>
                   
                   <p>
                     Ulusal ve uluslararası bütün norm ve kurallara aykırı yapılmış olay yeri inceleme ile başlayan, şüphelilerinin Ankara'dan çıkmasına engel olmayan, toplanması gereken delilleri toplamayan, katliamın Gaziantep'te örgütlendiği belli olmasına karşın, burada etkili operasyonlar ve yakalamalar yapmayan, sanıkların bağlantıları ve ilişkilerini çözmeye çalışmayan, sanıkların yıllardır Gaziantep'te yargılandıkları onlarca dosyayı merak bile etmeyen bir soruşturma süreci yaşanmıştır.
                   </p>
                   
                   <p>
                     İddianame ile birlikte haklarında dava açılan toplam 36 sanık bulunmaktadır. İddianamenin tamamlanması ve davanın açılması aşamasında 15 sanık tutuklu iken yargılama sırasında 4 sanık daha tutuklanmış, toplam 19 tutuklu ile yargılama devam etmiştir. 14 sanık için sevk maddeleri; Anayasal Düzeni Ortadan Kaldırmaya Teşebbüs Etme, Kasten Öldürme, Kasten Öldürmeye Teşebbüs etme iken (ki bu 14 sanıktan birisi olan Mehmet Kadir Cebael 2016 yılında bir polis operasyonu ile öldürülmüştür) geri kalan 22 sanık için silahlı terör örgütüne üye olmak suçundan ibarettir. Dosyadaki firari 16 sanık ise katliamdan bu yana hala yakalanmış değildir.
                   </p>
                   
                   <h3>SANIKLARLA SINIRLI YARGILAMA YAPAN, GERÇEKLERE GÖZÜNÜ KAPATAN MAHKEME</h3>
                   
                   <p>
                     Ankara 4. Ağır Ceza Mahkemesi'nde davanın açılması ile yargılama süreci 7 Kasım 2016'da başlamıştır. O günden tutuklu sanıklar açısından karar verilen 3 Ağustos 2018 gününe kadar toplam 10 grup duruşma ve 54 celse yapılmıştır.
                   </p>
                   
                   <p>
                     Yargılama boyunca Ankara 4. Ağır Ceza Mahkemesi yukarıda eksiklerini belirtmiş olduğumuz iddianameye bağlı bir kovuşturma yürütmüş ve yeni sunulan ve ortaya çıkan hiçbir delil esasa dair bir tartışmanın temeli yapılmamıştır.
                   </p>
                   
                   <p>
                     Yargılama esnasında "Bu katliam nasıl gerçekleşti, engellenebilir miydi, kimler hangi sorumluluklarla bu katliamın içerisinde yer aldı" sorularına yanıt bulmak gerekirken, mahkeme heyeti tarafından bu kısım ısrarla görmezden gelinmiştir. Oysa yargılama sırasında dosyaya gelen her bir belge, her bir yazışma cevabı özellikle Gaziantep ve Adıyaman'da yaygın bir IŞİD örgütlenmesi söz konusu olduğunu ortaya koymuştur. El Kaide döneminden başlayan bu örgütlenme, hiçbir sıkıntı ile karşılaşmadan büyümüş ve güçlenmiştir. Her türlü legal olanağı kullanmışlar, dernekler açmışlar, kermesler düzenlemişler, taziye çadırları kurmuşlar, militan örgütlemişlerdir. Sınırları kontrol etmişler, kaçakçılık dahil her türlü sınır işi onlardan sorulmuş, militanlar rahatlıkla getirilip götürülmüş, canlı bombalar geçirilmiştir.
                   </p>
                   
                   <p>
                     Devletin bütün resmi birimlerinin haberdar olduğu bu örgütlenmeye engel olunmamış, dosya sanığı katliam planlayıcıları yakalanmamış, katliamın adım adım örgütlenmesine izin verilmiştir.
                   </p>
                   
                   <h3>GÖZ GÖRE GÖRE GELEN KATLİAM</h3>
                   
                   <p>
                     Öte yandan 10 Ekim katliamı onlarca yüzlerce istihbari bilgiye rağmen gerçekleşmiştir. Özellikle 2015 yılı temmuz ayında gerçekleşen Suruç katliamından sonra ülkenin her yerinden Ankara Emniyetine istihbari bilgiler gelmiş, miting gibi kalabalık yerlerde IŞİD eylemleri beklendiği 2015 yılı eylül ayında bildirilmiştir. Canlı bombacıların kimliklerinin belli olduğu istihbaratlardan anlaşılmaktadır. Bu istihbaratlara rağmen Ankara'da mitinge dair hiçbir önlem alınmamış, hatta önlemler başka mitinglere göre zayıf tutulmuştur. Tertip komitesi bilgilendirilmemiş, mitinge gelecek yüzbinlerce insanın can güvenliği konusunda özel hiçbir tedbir alınmamıştır.
                   </p>
                   
                   <p>
                     Dahası istihbaratlar esasen 10 Ekim katliamını kimlerin gerçekleştirebileceği konusunda bilgilerin olduğunu da göstermektedir. Bu sayede, katliamın hemen ardından Ankara Emniyet Müdürlüğü canlı bomba olabilecekleri Savcılığa bildirmiş, isimleri belli olan bu kişilerin ailelerinden kan örnekleri istemiş, bu sayede canlı bomba Yunus Emre ALAGÖZ hemen tespit edilebilmiştir. Aynı durum birkaç gün içerisinde canlı bombaları Ankara'ya getiren iki aracı kimlerin kullandığının tespit edebilmiş olmasından da anlaşılmaktadır.
                   </p>
                   
                   <p>
                     Ankara 4. Ağır Ceza Mahkemesi dosyadaki tüm bu delilleri dikkate almamış, dosyanın 19 tutuklu sanığı yönünden 3 Ağustos 2018 günü karar vermiştir. Üstelik dosyayı karar için Sincan Cezaevi kampüsüne taşımış ve kararı Sincan Cezaevi Kampüsü içinde olağanüstü güvenlik önlemleri altında yapılan yargılamada açıklamıştır.
                   </p>
                   
                   <p>
                     Bu ilk yargılamada sadece tutuklu 19 sanık için verilmiş bir karar söz konusu olup, 9 sanık hakkında 101 kez ağırlaştırılmış müebbet cezası ve insan öldürmeye teşebbüsten binlerce yıl cezalar verilmiş, kalan 1 sanık hakkında katliamdan kaynaklı suç duyurusunda bulunulmuş, diğer sanıklar hakkında ise 12 yıl ile 7,5 yıl arasında değişen örgüt üyeliğinden ceza tayinine gidilmiştir.
                   </p>
                   
                   <p>
                     Bu nedenlerle 2018 yılında verilen mahkeme kararı son derece eksik, yetersiz ve kamu vicdanını rahatlatmaktan uzaktır. Kısaca açıklamak gerekirse:
                   </p>
                   
                   <p>
                     <strong>Katliamın gerçekleşmesinde kusuru ve sorumluluğu bulunan hiçbir kamu görevlisi yargılamaya dahil edilmemiş, devletin sorumluluğunun üstü örtülmüştür:</strong> Söz konusu katliamda kamu görevlilerinin sorumluluğu belki de hiçbir olayda olmadığı kadar ortadadır. İçileri Bakanlığı müfettişlerince olaya ilişkin hazırlanan Mülkiye Müfettişleri Raporu, Ankara, Adana, Gaziantep ve Kilis vb. yerlerde görev yapan birçok kamu görevlisinin bu katliama yol verdiğini ortaya koymaktadır. Öte yandan dosya kapsamındaki belgeler de çok sayıda kamu görevlisinin sorumluluğuna işaret etmektedir. Buna rağmen Ankara 4. Ağır Ceza Mahkemesi bu kişiler hakkında hiçbir işlem yapmamıştır. Hatta hiçbir kamu görevlisi tanık sıfatıyla dahi dinlenmemiştir. Mahkeme, dosya kapsamında suç işlediği ortaya çıkan kamu görevlilerini sorumlu görmeyen bir tavırla yargılamayı yürütmüş ve sonuçlandırmıştır.
                   </p>
                   
                   <p>
                     <strong>Sanık olan IŞİD'liler bakımından istenen cezalar azdır:</strong> Eksik soruşturma neticesinde hazırlanan iddianame ile sanık haline gelen IŞİD'lilere verilen cezalar eksik ve yetersizdir. Sadece 9 sanık katliam sorumluluğu ve insan öldürmeden sorumlu bulumuş, diğer sanıklar ise fiilleriyle bağdaşmayan şekilde örgüt üyeliği gibi oldukça az cezalarla cezalandırılmıştır. Oysa Sanık IŞİD'lilerin bir kısmı doğrudan katliam örgütlenmesine iştirak etmişlerdir. Bir kısmı ise aslında üye değil yöneticidir. Bu gerçekler yok sayılarak, sanık IŞİD'lilerin fiilerine oranla daha az ceza almaları sağlanmıştır.
                   </p>
                   
                   <p>
                     <strong>Firari sanıklar veya ismi tespit edilemeyen katliamla bağı olan IŞİD'lilerin yakalanıp yargılanmalarını sağlayacak işlemlerin yapılması talebinde bulunulmamıştır:</strong> Katliamı planlayan sanıkların on altısı halen firari olup, şu an ülkenin ya da dünyanın çeşitli yerlerinde IŞİD faaliyetleri yürütmeye devam etmektedirler. Yine dosyada katliam faili olan ancak isimleri dahi tespit edilemeyen otuz iki kişi vardır. Mahkeme Heyeti ve Savcılık bu kişilerin tespiti ve yakalanması hususundaki tüm talepleri yok saymış, "kaçan kurtulur" mantığıyla hareket etmiş, adeta sanıkları ödüllendirmiştir. Hatta basına da yansıdığı üzere firari sanıklardan Nusret Yılmaz Gürcistan sınırında yakalanıp ülkeye iade edilmesine rağmen, esrarengiz bir biçimde tekrar kaybolmuş, buna ilişkin Ankara 4. Ağır Ceza Mahkemesi tek bir işlem dahi yapmamıştır.
                   </p>
                   
                   <p>
                     <strong>Mevcut sanıklar dışında katliamla ilişkili kişiler dosyaya dahil edilmemiştir:</strong> Sadece kamu görevlileri değil, farklı mahkemelerde yargılanan ve katliamla doğrudan ilişkili IŞİD üyeleri de dosyaya dahil edilmemiştir. Katliam sonrası sanıkların kaçmasını sağlayan ve sanıklarla birlikte hareket eden birçok kişinin dosyada neden sanık olmadıkları anlaşılmaz bir durumdur.
                   </p>
                   
                   <p>
                     <strong>10 Ekim Ankara Gar Katliamı insanlığa karşı suçtur! Bu gerçek yok sayılarak karar verilmiştir:</strong> Ankara 4. Ağır Ceza Mahkemesi katliamı devlete karşı suç kapsamında değerlendirmiştir. Ancak katliam insanlığa karşı suç işleyen İŞİD tarafından barış isteyen insanlara, insanlığa karşı yapılmıştır. Türk Ceza Kanunu m. 77'de "insanlığa karşı suçlar" düzenlenmiştir. Katliam, söz konusu maddedeki suç tanımına harfi harfine uymaktadır. İnsanlığa karşı suçta zamanaşımı yoktur. İnsanlığa karşı suçun varlığının yok sayılmasının en basit sonucu, başta firari sanıklar olmak üzere katliam faillerinin bir zaman sonra zamanaşımından yararlanarak ceza almaktan kurtulmaları olacaktır.
                   </p>
                   
                   <p>
                     Bu nedenlerle eksik ve yüzeysel yargılama sonucunda verilen mahkeme kararı tarafımızca istinaf edilmiştir.
                   </p>
                   
                   <h2>İKİNCİ YARGILAMA SÜRECİ</h2>
                   
                   <h3>TÜRKİYE'DE İLK DEFA İNSANLIĞA KARŞI SUÇTAN İDDİANAME DÜZENLENMİŞ VE BU SUÇTAN BİR YARGILAMA YAPILMIŞTIR</h3>
                   
                   <p>
                     Ankara 4. Ağır Ceza Mahkemesi tarafından verilen kararın ardından dosya 15 firari sanık açısından tefrik edilmiş ve ayrı bir dosya numarası almıştır. Tutuklu sanıklar için 3 Ağustos 2018 tarihinde verilmiş olan karar ile birlikte sanıklardan hakkında örgüt üyeliğinden dava açılmış olan Erman EKİCİ hakkında katliam sorumluluğu ile davaya dahil edilmesi için suç duyurusunda bulunulmuştur. Bu suç duyurusu sonucunda Ankara Cumhuriyet Başsavcılığı sanık Erman EKİCİ hakkında insanlığa karşı suçtan yargılanmasının gerektiğini belirten bir iddianame hazırlamış, söz konusu iddianame Ankara 4. Ağır Ceza Mahkemesi tarafından kabul edilmiş ve firari sanıklara ilişkin dosya ile birleştirilmiştir. 21 Kasım 2019 tarihinde yapılmış olan duruşma ile Türkiye tarihinde ilk kez insanlığa karşı suça ilişkin bir yargılama başlamıştır.
                   </p>
                   
                   <p>
                     Ancak bu yargılama sadece tek sanık (Erman Ekici) için yapılmış, diğer sanıklar bu suçtan yargılanmamıştır. Özelliği gereği tek bir kişinin işlemesinin hukuken ve mantıken mümkün olmadığı insanlığa karşı suçlardan sadece bir sanığın değil, tüm sanıkların yargılanması gerektiğine dair taleplerimiz Mahkeme tarafından ısrarla reddedilmiştir.
                   </p>
                   
                   <h3>YARGITAY'IN BOZMA KARARI</h3>
                   
                   <p>
                     Firari sanıklar bakımından bu yargılama devam etmekte iken, tutuklu sanıklar hakkında verilen hükümlerle ilgili istinaf süreci sonuçlanmış, 12 Ekim 2020 tarihinde verilen kararla tüm istinaf taleplerimiz reddedilmiştir. Dosya taraflarca temyiz edilmiştir. Yargıtay 3. Ceza Dairesi'nin 29.06.2022 tarihli kararı ile temyiz incelemesini sonuçlandırmış ve dosyada kısmi bozma kararı verilmiştir.
                   </p>
                   
                   <p>
                     Yargıtay 3. Ceza Dairesi bozma kararı özetle şu şekildedir; katliam sorumluluğu nedeniyle mahkumiyetlerine karar verilen sanıklar Yakub Şahin, Hakan Şahin, Hacı Ali Durmaz, İbrahim Halil Alçay, Resul Demir, Hüseyin Tunç, Talha Güneş, Abdülmubtalip Demir ve Metin Akaltın hakkında kasten öldürmeye teşebbüs etme suçu yönünden mahkumiyetlerine yönelik bozma kararı bir kısım katılan yönünden suç vasfının tayini ve raporla beyan arası çelişkinin giderilmesi yönünden bozulmuştur. 25 Haziran 2017 tarihinde katliam sırasındaki yaralanmaları nedeniyle hayatını kaybetmiş olan Mustafa Budak açısından bu değerlendirmenin yapılması istenmiştir. Diğer bir kısım katılan için ise; 11 kişi bulunup tespit edilmiş ve bu kişilerin yaralanmalarının katliamla ilişkili olup olmadığının belirlenmesi gerektiği ifade edilmiştir.
                   </p>
                   
                   <p>
                     Yargıtay 3. Ceza Dairesi tarafımızca ayrıntılarıyla sunulmuş temyiz taleplerini değerlendirmeye almamış, tüm temyiz taleplerimizin reddi ile mahkeme kararının bozma konusu kısımları dışındaki hükümleri onamıştır. Karara ilişkin 26.08.2022 tarihinde Anayasa Mahkemesine başvurulmuş olup, başvurumuza ilişkin halen bir karar verilmiş değildir.
                   </p>
                   
                   <p>
                     Ankara 4. Ağır Ceza Mahkemesi bozma kararına 19.10.2022 tarihli duruşmada uymuş ve firari sanıkların yargılandığı dosyayla birleştirilmesine karar vermiştir. Özetle firari sanıklar için tefrik edilen dosya, hem Erman Ekici açısından insanlığa karşı suç yargılaması hem de Yargıtay bozma kararının ardından yürütülen yargılamanın dosyası olmuştur.
                   </p>
                   
                   <p>
                     Firari sanıklar bakımından tefrik edilen yargılama 08.11.2018 tarihindeki ilk duruşma ile başlamıştır. Yargılama boyunca 10 Ekim Ankara katliamı faillerine, sanık olmayan ama aslında sanık olarak yargılanması gereken şüphelilere ve kamu görevlilerine dair farklı yönlerden pek çok hukuki ve cezai sorumluluk ortaya çıkmıştır. Söz konusu delillerin tamamı dosya kapsamında bulunmaktadır. Sorumluluğu bulunan ve suç işledikleri tespit edilen kamu görevlileri de dahil olmak üzere pek çok kişiyle ilgili duruşmalarda gerekli açıklamalar yapılarak taleplerde bulunulmuştur. Ancak bu taleplerin tamamı reddedilmiştir.
                   </p>
                   
                   <p>
                     Ankara 4. Ağır Ceza Mahkemesi, katliamla ilgili gerçeklerin ortaya çıkmasını sağlayacak talepleri reddederek, 1 Temmuz 2024 tarihindeki 26. Celsede karar vermiştir. Karar ile katliama ilişkin sorumluluklarla ağırlaştırılmış müebbet cezası alan sanık sayısı 10'a çıkmıştır. Katliamdan bir süre sonra ölen Mustafa Budak'ın ölümü de cezalandırmalara dahil edilmiş, 10 sanığa 101 kez Kasten Nitelikli Öldürme Suçundan ağırlaştırılmış müebbet cezası verilmiştir. Yargıtay bozma kararı kapsamında 11 kişinin yaralanması katliam kapsamında değerlendirilmemiş, bu 11 kişiyi Kasten Nitelikli Öldürmeye Teşebbüs Suçundan 10 sanığa beraat verilmiş, 379 kez Kasten Nitelikli Öldürmeye Teşebbüs suçundan cezalandırmaya gidilmiştir.
                   </p>
                   
                   <h3>IŞİD'LİLERİN İNSANLIĞA KARŞI SUÇ İŞLEMEDİĞİNİ KABUL EDEN, KATLİAM MAĞDURLARININ SUÇTAN ZARAR GÖRMEDİĞİNİ İDDİA EDEN YARGIÇLAR</h3>
                   
                   <p>
                     Ankara 4. Ağır Ceza Mahkemesi kararının en önemli özelliklerinden biri ülkenin ilk insanlığa karşı suç yargılamasında insanlığa karşı suçtan beraat verip, sanık Erman Ekici'yi anayasal düzeni değiştirmeye teşebbüsten cezalandırmış olmasıdır. 576 sayfalık gerekçeli kararda bu kısma sadece 5 sayfa ayrılmış, üstelik kararın bu kısmı Ankara 4. Ağır Ceza Mahkemesinin Yargıtay bozmasından önce 2018 yılında vermiş olduğu karardan birebir kopyalanarak oluşturulmuştur. Mahkeme; insanlığa karşı suçtan düzenlenmiş bir iddianame söz konusu iken bu açıdan beraat kararı vermiş, üstelik bir gerekçe yazmaya dahi zahmet etmemiştir. Mahkeme tarafından sanıkların gerçekleştirdiği katliamın, insanlığa karşı suç kapsamında olmayıp, esasen Türkiye Cumhuriyeti Devletinin Anayasal düzenine yönelik olduğu, sanıkların 2015 Kasım seçimleri öncesinde ülkede kaos yaratmak istedikleri kabulü ile hareket edilerek, katliama ilişkin siyasal iktidarın sorumluluğu bu şekilde ört bas edilmek istenmiştir.
                   </p>
                   
                   <p>
                     Bu karara karşı yaptığımız istinaf başvurusu üzerine Ankara Bölge Adliye Mahkemesi 22. Ceza Dairesi Temmuz 2025 yılında verdiği son kararla akıl almaz bir yaklaşımla mağdurların ve müdahillerin insanlığa karşı suçlar bakımından "suçtan doğrudan doğruya zarar görmedikleri" gerekçesiyle ve bu yüzden "katılan" sıfatları olamayacağından bahisle bu konudaki istinaf başvurumuzun reddine karar vermiştir. Yargılamanın en başından itibaren her fırsatta katliam mağdurlarını "mağdur" olarak kabul etmemek için elinden geleni yapan yargı makamlarının ve devletin bu yaklaşımı, en sonunda Katliamın mağdurlarının "suçtan zarar görmediklerini"! iddia edecek ve bunu açıkça ilan edecek kadar ileri gitmek zorunda kalmıştır.
                   </p>
                   
                   <h3>YARGILAMA SÜRECİNDE HİÇBİR KAMU GÖREVLİSİ HAKKINDA İŞLEM YAPILMAMIŞTIR</h3>
                   
                   <p>
                     2015 yılı 7 Haziran seçimlerinden sonra kaos yaşanacağını söyleyen iktidar sözcülerinin, katliamın hemen arkasından anket yaparak oylarının arttığını söyleyen dönemin Başbakanının açıklamaları, katliamda ölen ve yaralananların acılarını paylaşmak yerine sergilenen düşmanca tutumlar gibi çok sayıda somut gerçek karşısında Ankara 4. Ağır Ceza Mahkemesi devleti/siyasal iktidarı aklamayı seçmiş, bunun doğal sonucu olarak da katliamın gerçeklerini ortaya çıkarmaktan ısrarla kaçınmıştır.
                   </p>
                   
                   <p>
                     Ankara 4. Ağır Ceza Mahkemesi katliamda sorumluluğu bulunan kamu görevlilerinin yargılanması konusundaki taleplerin tamamını yine görmezden gelmiştir. Sadece bir IŞİD katliamı olarak yapılan değerlendirme kapsamında yazılmış olan karar, 2019'da yılında soruşturma savcılarının saklamış olduğu klasörlerle ortaya çıkan katliam sanıklarının katliamdan 10 gün önce belirlendiği ancak yakalanmadığı, hatta telefonlarının dinlendiğine ilişkin delilleri görmezden gelmiştir. İçişleri Bakanlığı Müfettiş Raporu'nun Emniyet Genel Müdürlüğü tarafından sansürlenmesi, içinde yer alan bilgilerin saklanması çabası da Ankara 4. Ağır Ceza Mahkemesi için dikkate değer bulunmamıştır. Gerekçeli kararda uzun uzun beyanlarına yer verilirken tanık ifadeleri kararda değerlendirmeye alınmamış, sınır köyünde İlhami Balı ile istihbarat görevlileri tarafından yapılan pazarlığı anlatan tanığın sözlerine bile itibar edilmemiştir.
                   </p>
                   
                   <p>
                     Sözünü etmiş olduğumuz deliller ve dosya kapsamındaki niceleri Ankara, Adana, Gaziantep ve Kilis vb. yerlerde görev yapan birçok kamu görevlisinin, İçişleri Bakanlığı ve Milli İstihbarat Teşkilatının ve siyasal iktidar temsilcilerinin bu katliama yol verdiğini ortaya koymaktadır. Ankara 4. Ağır Ceza Mahkemesi ikinci kez bu gerçeği yok sayarak karar vermiştir.
                   </p>
                   
                   <p>
                     Karar tarafımızca istinaf ve temyiz edilmiştir. Öte yandan dosya firari sanıklar açısından yine tefrik edilmiş olup, halen yargılama devam etmektedir.
                   </p>
                   
                   <h3>MÜFETTİŞ RAPORU VE KENDİ HAZIRLATTIĞI RAPORA SANSÜR UYGULAYAN EMNİYET GENEL MÜDÜRLÜĞÜ</h3>
                   
                   <p>
                     Katliama ilişkin hiçbir kamu görevlisi hakkında soruşturma ya da bir işlem yapılmamış olup, tarafımızca yapılmış olan başvurular da sürekli olumsuz sonuçlanmıştır. Ankara 4. Ağır Ceza Mahkemesi tarafından bu noktadaki başvurularımızın tamamı sonuçsuz bırakılmıştır. Öte yandan firari sanıkların yakalanmasına ilişkin talepler de karşılanmamış, Suriye'de oldukları bildirilen sanıklara ilişkin gerekli araştırmalar yapılmamış, iade süreçlerine ilişkin taleplerimiz görmezden gelinmiştir.
                   </p>
                   
                   <p>
                     Oysa Katliamın ardından İçişleri Bakanlığı Mülkiye Müfettişleri tarafından hazırlanan rapor, katliama ilişkin kamu görevlilerinin sorumluluklarını açıkça ortaya koymaktadır. Yargılamanın başından bu yana bu konudaki taleplerimiz Mahkemece reddedilmiştir. Raporun tamamı dahi dosyaya kazandırılmamış, müfettişlerin mahkemede dinlenmelerine ilişkin taleplerimiz reddedilmiş, raporun kapsam dışı bırakılan konulara ilişkin eklerine ulaşmamız engellenmiştir.
                   </p>
                   
                   <p>
                     Mülkiye Müfettişleri raporunun açıklanmasının hemen ardından 2016 yılı Temmuz ayında Ankara Emniyet Müdürlüğü yetkilileri hakkında yapmış olduğumuz suç duyurularının işleme konulmaması üzerine yapmış olduğumuz Anayasa Mahkemesi başvurusunda tam 8 yıl sonra hiçbir gerekçe içermeyen kabul edilemezlik kararı verilmiş, bu kapsamda AİHM başvurusu yapılmıştır.
                   </p>
                   
                   <p>
                     Mülkiye müfettişleri tarafından hazırlanmış olan raporun içerisinde yer alan ve "kapsam dışı bırakılan konular" söz konusu olup, kapsam dışı bırakılan konular, katliam failleri hakkında katliam öncesinde CMK 135 kapsamında tedbiren uygulanan iletişimin tespitlerini içermektedir.
                   </p>
                   
                   <p>
                     Raporun ilgili bölümünde bu hususta araştırmanın devam ettiğinin anlaşılması nedeniyle, tarafımızca İçişleri Bakanlığı Mülkiye Müfettişliğine bilgi edinme kanunu kapsamında bu hususlar sorulmuştur. Yanıt olarak inceleme raporlarının Emniyet Genel Müdürlüğüne gönderildiği ifade edilmiştir. Söz konusu raporlar; Ankara'da miting için alınan güvenlik tedbirlerinin yeterli olup olmadığının araştırıldığı disiplin raporu, Katliam failleri Yunus Emre Alagöz hakkında Adıyaman; Yunus Durmaz, Yakup Şahin ve Deniz Büyükçelebi hakkında Gaziantep; İlhami Balı hakkında ise Gaziantep ve Hatay il Emniyet Müdürlükleri tarafından yapılan istihbari iletişim ve teknik takip tedbirlerine rağmen katliam ile ilgili önceden bilgi edinilip edinilmediği ve bilgilerin iletilip iletilmediğine ilişkin araştırma raporu, Bilinen katliam failleri dışında halen ismi verilmeyen 3 kişi hakkında da istihbari iletişim ve teknik takip tedbiri uygulanıyor olması nedeniyle bu konuda inceleme yetkisinin Emniyet Genel Müdürlüğüne verilmesine ilişkin inceleme raporundan oluşmaktadır.
                   </p>
                   
                   <p>
                     05.09.2022 tarihli başvurumuza İçişleri Bakanlığı tarafından verilen 21.09.2022 tarih ve 103009 sayılı yanıt ile talebimizin uygun görülmediği ifade edilmiş, idari /adli mercilerce bilgi ve belge talebinde bulunulması durumunda talep eden merci/mercilere doğrudan bilgi verileceği belirtilmiştir. Dava konusu katliama dair hazırlanmış bir rapor söz konusu olduğundan hiçbir açıklama yapılmaksızın tarafımıza da bilgi verilmemesi nedeniyle İçişleri Bakanlığına müzekkere yazılması 19.10.2022 tarihli duruşmada tarafımızca talep edilmiş, talebimiz Mahkemece reddedilmiştir.
                   </p>
                   
                   <p>
                     Bunun üzerine tarafımızca idare mahkemesinde dava açılmış ve dava konusu talebimiz Ankara 11. İdare Mahkemesi'nin 26/04/2023 tarih ve 2023/4 Esas 2023/902 Karar sayılı kararı ile kabul edilmiştir.
                   </p>
                   
                   <p>
                     Ankara 11. İdare Mahkemesi kararının gereğinin yerine getirilmesi için tarafımızca Emniyet Müdürlüğüne başvurulmuş, tarafımıza verilen cevapla bir kısım belge, önemli ölçüde sensör edilmiş veya silinmiş bir şekilde CD'de paylaşılmıştır. Bunun üzerine mahkeme kararının uygulanmadığından bahisle sensör edilmeden bilgi ve belgenin verilmesi talep edilmiştir. Mahkeme kararının bu şekilde uygulanmasını takdir ettikleri bildirilmiş, en son 01 Eylül 2023 tarihli yazı ekinde 5 CD paylaşılmış ve içeriği neredeyse tamamı sensör edilmiş şekilde yollanmıştır.
                   </p>
                   
                   <p>
                     İdare Mahkemesi kararını yerine getirmemiş, herkesin bildiği bilgiler dahil tüm sayfaların sensörlenmiş olduğu haliyle tarafımıza vermiş olan Emniyet Genel Müdürlüğünün istinaf talebi reddedilmiş ancak, Ankara Bölge İdare Mahkemesi 12. İdari Dava Dairesi Başkanlığı kararında ilginç bir bölüme yer vermiştir. "Demokratik ve şeffaf yönetimin gereği olan eşitlik, tarafsızlık ve açıklık ilkelerine uygun olarak kişilerin bilgi edinme hakkını kullanmaları esas olmakla birlikte, talep edilen bilgiler arasında yukarıda sayılan sınırlamaların kapsamında olan bilgi belge bulunması halinde, bu bilgilerin ayıklanması suretiyle istenilen bilgi ve belgenin ilgililerine verileceği tabidir". Emniyet Genel Müdürlüğünün Ankara 11. İdare Mahkemesinin son derece açık olan kararını uygulamayan, kendi istediği biçimde sansürleyen tavrı, Ankara BİM kararına eklenmiş ve bu suretle idarenin hukuksuz tutumu hukuki bir kılıfa uydurulmaya çalışılmıştır.
                   </p>
                   
                   <p>
                     Dolayısıyla Emniyet Genel Müdürlüğü'nün kendi hazırlattığı raporu sansürlemesi ve Ankara Bölge Adliye Mahkemesi'nin bu sansürü onaylayan kararı, esasen katliamla ilgili kamuoyuna açıklanmayan gizli bilgilerin bulunduğunun açıkça kabulü anlamına gelmektedir. Buna göre katliamla ilgili açıklanması sakıncalı bulunan bilgiler olduğu ve bu bilgilerin muhtemelen kamu görevlilerin sorumluluğuna işaret ettiği anlaşılmaktadır.
                   </p>
                   
                   <h3>KAYIP KLASÖRLER</h3>
                   
                   <p>
                     10 Ekim Ankara katliamıyla ilgili tutuklu sanıkların yargılandığı 2016/232 E. Sayılı dosyada yapılan yargılama esnasında sanıklardan Yakub ŞAHİN'in "... katliamdan önce bomba yapımında kullanılmak üzere Hüseyin TUNÇ'la birlikte Nizip'ten amonyum nitrat satın almak istediklerini, ancak satıcının şüphelenmesi üzerine gübre almadan Nizip'ten ayrıldıklarını... " beyan etmesi üzerine, 09/02/2017 tarihinde yapılan ikinci grup celseler esnasında yani yargılamanın daha hemen başında tarafımızdan kovuşturmanın genişletilmesi talepleri arasında "... Yakup ŞAHİN'in ifadesinde amonyum nitrat satmadığı belirtilen satıcının 2015 yılı Ağustos, Eylül, Ekim aylarında bir ihbar kaydının bulunup bulunmadığının Gaziantep ve Nizip Emniyet Müdürlüklerinden sorulması ... " talep edilmiştir.
                   </p>
                   
                   <p>
                     Ancak bu talebimiz Mahkeme tarafından reddedilmiştir. Daha sonrasında 2018 yılında tutuklu sanıklar bakımından 2016/232 E. Sayılı dosyada çeşitli mahkumiyet kararları verildikten sonra dosyanın istinaf incelemesi aşamasında 09/10/2019 tarihinde Ankara Cumhuriyet Başsavcılığı Terör Suçları Soruşturma Bürosuna kimseye haber verilmeden bırakıldığı tespit edilen 9 klasör evrak, 10 Ekim Ankara Gar patlaması ile ilgili olduğu anlaşıldığından, Savcılık tarafından bir üst yazıyla Ankara 4. Ağır Ceza Mahkemesine gönderilmiştir.
                   </p>
                   
                   <p>
                     10/10/2015 tarihinde gerçekleştirilen Ankara katliamından tam 4 yıl sonra Ankara Cumhuriyet Başsavcılığı Terör Suçları Soruşturma Bürosu, "09/10/2019 tarihinde Terör Suçları Ön bürosuna kimseye haber verilmeden bırakıldığı tespit edilen 9 klasör, 10/10/2015 tarihli GAR Patlaması Olayına ilişkin evraklar olduğu anlaşıldığından 9 klasör dosya yazımız ekinde gönderilmiştir." şeklinde bir yazı ile 9 klasör dosyayı Ankara 4. Ağır Ceza Mahkemesine göndermiştir.
                   </p>
                   
                   <p>
                     Ankara Cumhuriyet Savcılığı tarafından 2015/141243 Soruşturma No ile yapılan katliam soruşturması dosyasındaki katliamın hemen ardından (2015 Ekim ayı içinde) toplanan, içinde katliamın hazırlanışına ve katliama yol açan bombaların nasıl temin edildiğine ilişkin çok önemli delillerin bulunduğu 9 klasör dosyadan ve kapsamındaki delillerden ancak 4 yıl sonra bu şekilde haberdar olabilmiştir. Soruşturma savcılarının boşalan odalarında bulunan bu klasörlerin savcılar tarafından saklanmış olduğu, iddianamede ve soruşturma evrakları içerisinde hiçbir biçimde yer verilmemesinden anlaşılmaktadır. Nitekim bu noktada üç soruşturma savcısı hakkında ilgili mercilere tarafımızca şikayetlerde bulunulmuş, ancak şikayetler hakkında hiçbir işlem yapılmamıştır.
                   </p>
                   
                   <p>
                     Söz konusu 9 klasör soruşturma evrakı, katliamın nasıl hazırlandığına ve katliama giden yolda Gaziantep Emniyet Müdürlüğü Personeli tarafından yapılan görev suistimallerinin yanı sıra katliam soruşturması sırasında aynı şekilde Ankara Emniyet Müdürlüğü yetkilisi kamu görevlileri tarafından yapılan görev suistimallerine ilişkin de çok önemli delilleri içermektedir. Katliam öncesinde ve sonrasında bazı delillerin ve olayların bilinçli şekilde saklandığı görülmektedir.
                   </p>
                   
                   <h3>KATLİAMDAN 10 GÜN ÖNCE İHBAR EDİLEN BOMBACILAR - İZLEMEKLE YETİNEN EMNİYET</h3>
                   
                   <p>
                     Klasörler, katliamı takiben başlatılan soruşturmanın başlangıç dönemine ilişkin evrakları içermektedir. 10 Ekim Ankara Katliamı, IŞİD'in Gaziantep hücresi tarafından örgütlenmiş, iki canlı bomba 9 Ekim 2015 gecesi Gaziantep'ten 2 araçla karayolu ile Ankara'ya doğru yola çıkmış, canlı bombaları taşıyan aracı Halil İbrahim Durgun kullanmış, Durgun'un aracına ise önünden giden Yakub Şahin kullandığı araçla eskortluk etmiştir.
                   </p>
                   
                   <p>
                     Mezkur 9 adet kayıp klasörde canlı bomba aracına eskortluk yapan sanık Yakub Şahin ve örgütün nakliyecisi olan sanık Hüseyin Tunç ile ilgili çok önemli belgeler bulunmaktadır. Nitekim Katliamdan 4 yıl sonra ortaya çıkarılan bu 9 kayıp klasörden 1. klasörün 5. ve 6. ciltlerinde bulunan evraklar, katliam bombalarının yapımında kullanılan gübrenin temini sürecinde 01.10.2015 tarihinde yapılan ihbara ve bu ihbar neticesinde katliamdan 10 gün önce (30 Eylül 2015 - 2 Ekim 2015 tarihleri arasında) Nizip Cumhuriyet Savcılığı tarafından yürütülen soruşturma evrakına ilişkin olanıdır.
                   </p>
                   
                   <p>
                     Bu soruşturma evrakındaki bilgi ve belgelere göre sanık Yakub Şahin, katliam planına uygun biçimde 30 Eylül 2015 tarihinde, yani katliamdan on gün önce, yanında örgüte ait 16 ATJ 54 plakalı nakliye aracını kullanan katliam sanığı Hüseyin Tunç olmak üzere Nizip'te tarım ürünleri satan bir işyerinden bomba yapımında kullanmak üzere 2.000,00 TL karşılığında 2 ton "Amonyum Nitrat 33" tanımlı gübre satın almış, bedelini ödemiş, ancak tedirgin hallerinden şüphelenen gübre satıcısının belge düzenlemek için kimliklerini istemesi üzerine Yakub Şahin ve Hüseyin Tunç gübreyi almaktan vazgeçmiş, parayı geri alarak alelacele dükkandan ayrılmışlardır. Durumdan şüphelenen gübre satıcısı, gübrenin "son zamanlarda artan terör saldırılarında kullanılabileceği" şüphesini de belirterek, hemen aynı gün, Nizip Emniyeti'ne hal ve tavırlarından şüphelendiği bu kişiler hakkında telefonla ihbarda bulunmuştur. Bu ihbar üzerine Nizip Cumhuriyet Başsavcılığınca yürütülen soruşturmada şüpheli bir şekilde gübre satın almaya çalışan kişinin Yakub Şahin olduğu ve kullandığı 27 Z 7072 plakalı otomobilin sahibi Hülya Demir'in isim ve adresi ile örgütün nakliyede kullanmak üzere Hüseyin Tunç adına satın aldığı 16 ATJ 54 kamyonet olduğu çok kısa bir sürede tespit edilmiştir.
                   </p>
                   
                   <p>
                     Gübre satıcısının ihbarı üzerine 02 Ekim 2015 tarihinde Nizip Emniyeti Terörle Mücadele Bürosu tarafından olaya ilişkin olarak gübre satıcısının ve çalışanının tanık olarak ifadeleri de alınmıştır. Nitekim gübre satıcısının bu ihbarı üzerine yürütülen soruşturma kapsamında elde edilen bilgilerle şüpheli şahısların tespit edilmesi üzerine, Nizip Cumhuriyet Başsavcılığının talimatı ile Nizip Emniyet Müdürlüğü tarafından 02/10/2015 tarihinde (yani katliamdan 8 gün önce) durumun önemi açıklanarak, tüm ihbar ve tespit tutanakları da eklenerek, Gaziantep Emniyet Müdürlüğü İstihbarat Büro Amirliğine ve Gaziantep Terörle Mücadele Şube Müdürlüğüne ayrı ayrı yazılar yazılmış ve "Yakub Şahin hakkında örgütsel bir ilişkisinin olup olmadığı hususunda gerekli araştırmanın yapılarak gereğinin yapılması ve bilgi verilmesi" istenmiştir.
                   </p>
                   
                   <p>
                     Gaziantep Emniyet Müdürlüğü bu bilgilendirme üzerine hiçbir şey yapmamıştır. Dolayısıyla Yakub Şahin katliamdan önce yakalanabilecekken yakalanmamıştır. Çok açıktır ki Gaziantep Emniyet Müdürlüğü görevini yapsa idi, Yakub Şahin katliamda kullanılan gübreyi temin edemeyecek, katliam planı açığa çıkarılabilecek ve katliam önlenebilecekti. Nitekim bu şekilde görevlerini suistimal eden Gaziantep Emniyet Müdürlüğü Personeli hakkında tarafımızdan gerekli şikayetler yapılmıştır.
                   </p>
                   
                   <p>
                     Ayrıca Nizip Emniyet Müdürlüğü de Nizip Cumhuriyet Savcılığı'nın talebi üzerine aynı şekilde Yakub Şahin'in katliamdan önceki ihbar evrakını 22/10/2015 tarihinde Ankara Emniyet Müdürlüğü'ne göndermiştir. Dolayısıyla, esasen katliam soruşturmasının savcıları ve soruşturmayı yürüten Ankara Emniyet Müdürlüğü Personeli, Yakub Şahin ve Hüseyin Tunç hakkındaki katliam öncesinde yapılan tespitlerden ve ihbardan 22/10/2015 tarihinde haberdar olmuştur.
                   </p>
                   
                   <p>
                     Ancak çok ilginçtir ki; Nizip Savcılığı ve Emniyet Müdürlüğü tarafından katliam soruşturmasını yürüten Ankara Cumhuriyet Savcılığı ve Ankara Emniyet Müdürlüğü'ne gönderilen Yakub Şahin'in katliamdan önce ihbar edildiğine dair evrak, iddianamede değerlendirilmemiş, soruşturma dosyasında hiç yokmuş gibi davranılmış, hatta yukarıda belirttiğimiz üzere Nizip CBS evraklarının olduğu klasörler kovuşturmanın yürütüldüğü mahkemeye de gönderilmemiş, saklanmış, yıllar sonra tesadüfen bulunmuştur. Bu durum bize katliam öncesi ve sonrasıyla ilgili özellikle soruşturma aşamasında çok ciddi ve bilinçli bir karartma ve gizleme yapıldığını, soruşturmanın yanlış yönlendirildiğini, gerçek suçluların ve sorumluların açığa çıkarılmak yerine tam tersine gizlenmelerinin sağlandığını açıkça göstermektedir.
                   </p>
                   
                   <h3>KATLİAMDAN 3 GÜN ÖNCE TELEFONU DİNLENEN FAİL</h3>
                   
                   <p>
                     Gaziantep Emniyet Müdürlüğü yetkilileri hakkında yapmış olduğumuz suç duyurusu ardından dosyada uzun süre bir işlem yapılmamıştır. Çok uzun bir zaman sonra söz konusu dosyaya kazandırılan evraklardan görülmektedir ki; 2015 Ekim ayında yani katliamın hemen öncesinde Yakub ŞAHİN hakkında aslında işlem başlatılmıştır. Buna göre Gaziantep Emniyet Müdürlüğü, Nizip Emniyet Müdürlüğü'nün yazısı üzerine Yakub ŞAHİN hakkında Gaziantep Cumhuriyet Savcılığı tarafından o dönem Türkiye çapında yetkili mahkeme olan Ankara 4. Ağır Ceza Mahkemesi'nden Yakub ŞAHİN'in telefonlarının dinlenmesi için iletişime müdahale tedbir kararı talebinde bulunmuştur. 07/10/2015 tarihinde ise Ankara 4. Ağır Ceza Mahkemesi 2015/10357 D. İş sayılı dosyası üzerinden iletişime müdahale tedbir kararı alınmıştır.
                   </p>
                   
                   <p>
                     Buna göre Yakub ŞAHİN'in katliam öncesinde emniyet tarafından telefonlarının dinlendiği, buna rağmen katliamla ilgili faaliyetlerine devam ettiği ve sonuçta 10/10/2015 tarihinde de katliamın gerçekleştiği anlaşılmaktadır. Bunun anlamı ise gayet açıktır. Katliam faillerinden Yakub ŞAHİN polis takibi altında bu katliamı gerçekleştirmiş ve Emniyet bunu izlemekle yetinmiştir.
                   </p>
                   
                   <p>
                     Gaziantep Emniyet Müdürlüğü'nde o dönem görev yapan ilgili personel, Yakub Şahin hakkında bilinçli bir şekilde yapılması gereken işlemleri yapmamışlar ve katliamın gerçekleşmesine olanak sağlamışlardır.
                   </p>
                   
                   <p>
                     Yakub ŞAHİN, birkaç gün sonra elini kolunu sallayarak, yine sanık Hüseyin Tunç ile birlikte bu sefer Şanlıurfa Birecik İlçesinden katliamda kullanılan gübreyi temin etmiş ve Nizip'te kiraladığı örgüt deposuna koymuşlardır. Oysa soruşturma derinleştirilip, uzun zamandan beri IŞİD içerisinde yer alan Yakub Şahin'in örgütsel ilişkisi açığa çıkarılsa, yakalansa ve ifadesine başvurulsaydı; çok açık olarak Yakub Şahin, katliamda kullanılan gübreyi temin edemeyecek, katliam planı açığa çıkarılabilecek ve katliam önlenebilecekti.
                   </p>
                   
                   <p>
                     Bu noktada tarafımızca Mahkemeden Ankara ve Gaziantep Emniyet Müdürlükleri hakkında suç duyurusuda bulunulması defalarca talep edilmiş ancak talepler reddedilmiştir. Bu nedenle suç duyuruları tarafımızca gerçekleştirilmiştir.
                   </p>
                   
                   <p>
                     Gaziantep ve Ankara Emniyet Müdürlükleri hakkındaki suç duyurularına ilişkin ilgili savcılıklar tarafından "kovuşturmaya yer olmadığına" ilişkin kararlar verilmiş, itirazlarımızın reddedilmesi üzerine tarafımızca Anayasa Mahkemesine başvurular yapılmıştır.
                   </p>
                   
                   <p>
                     Dosyaları odalarında saklayan soruşturma savcıları hakkında da gerekli şikayetlerde bulunulmuş, ancak şikayetlerin tamamı inceleme dahi yapılmaksızın reddedilmiştir.
                   </p>
                   
                   <h3>AHMET DAVUTOĞLU ÜMİT ÖZDAĞ HAKKINDA SUÇ DUYURUSU</h3>
                   
                   <p>
                     Dönemin Başbakanı Ahmet DAVUTOĞLU ve Ümit ÖZDAĞ'ın 2022 yılında kamuoyunda çok konuşulan beyan ve iddialarına ilişkin suç duyurusunda bulunulmuş her ikisi hakkında da Ankara Cumhuriyet Başsavcılığı tarafından işleme koymama kararı verilmiştir.
                   </p>
                   
                   <h3>SINIRDA İLHAMİ BALI İLE GÖRÜŞEN KİŞİLER HAKKINDA SUÇ DUYURUSU</h3>
                   
                   <p>
                     2018 yılında Mahkemeye İlhami Balı'ya ait tape kayıtları gelmiş, söz konusu tapelerde İlhami Balı'nın birçok kez asker ve polis ve/veya kamu görevlisi olduğu değerlendirilen kişiler ile telefon konuşmaları olduğu anlaşılmıştır. Görevlerinin gereklerini yerine getirmeyen ve sınır geçişlerini anında engellemeyerek katliamın gerçekleşmesine en azından bu şekilde neden olduğu anlaşılan görevli C.Savcısı ile adli soruşturmada görev alan polis memurları hakkında gerekli soruşturmanın yürütülmesi tarafımızca talep edilmiştir.
                   </p>
                   
                   <p>
                     Suç duyurusu halen sonuçlanmamıştır.
                   </p>
                   
                   <h3>HALEN SANIK OLARAK YARGILANMAYAN ŞÜPHELİLERLE İLGİLİ SUÇ DUYURULARI</h3>
                   
                   <p>
                     10 Ekim Ankara katliamı soruşturması esnasında Emniyet Müdürlüğü'nün 58604142-6756.(13211).S.N:71 sayısıyla Ankara Cumhuriyet Başsavcılığına sunmuş olduğu fezlekenin 675.sayfasında başlayıp 743. Sayfasına kadar devam eden site, depo ve rezidansa ait kamera görüntülerinin incelemesi bölümünde, dosyada halihazırda bildiğimiz şahıslar dışında, kameraya takılan başkaca şahısların kimlik tespiti yapılmamış; sadece y1, y2 ve x1 den başlayarak devamla x30'a kadar kendi isimlendirdikleri şahısların da kamera görüntülerinde var olduklarını tespit etmişlerdir. Dosyamızda var olan sanıklarla ilişkileri ve/veya suça iştirakleri çok muhtemel olan bu şahıslar şüpheli veya tanık olarak dahi görülmemiş olacak ki, hangi kameraya hangi zaman diliminde takıldıklarına dair birkaç şahıs dışında bilgi verilmemiş, şüpheli listelerine dahi eklenmemişlerdir. X ve Y lerin kimliklerinin tespitinin, dosyamızda var olan sanıkların suça ilişkin rollerinin de tam olarak ortaya konmasında etkili olacağı kuşkusuzdur.
                   </p>
                   
                   <p>
                     Ankara 4. Ağır Ceza Mahkemesi tarafından 08 Kasım 2018 tarih ve 5 nolu ara kararı ile dosyada kimliği tespit edilemeyen X ve Y olarak isimlendirilen, katliam faili olduğu kamera kayıtları ile sabit olan bu kişilerin kimlik belirleme işlemlerinin yapılması için Ankara Cumhuriyet Başsavcılığına suç duyurusunda bulunulmuştur.
                   </p>
                   
                   <p>
                     Mahkemenin yapmış olduğu bir diğer suç duyurusu ise katliam planlayıcısı olarak dosya kapsamında adı geçen Ebu Zeyneb isimli kişi ile ilgilidir. Talebimiz üzerine 21.09.2020 tarihinde Mahkeme tarafından Savcılığa suç duyurusunda bulunulmuştur.
                   </p>
                   
                   <p>
                     Muhammed Cengiz Dayan ile ilgili olarak ise Mahkemeye sunmuş olduğumuz suç duyurusunda bulunulması talebinin reddedilmesi üzerine tarafımızca Savcılığa suç duyurusunda bulunulmuştur. Ankara Cumhuriyet Başsavcılığı bu talebimizi değerlendirmeye almış, Muhammed Cengiz Dayan hakkında daha önce verilmiş KYOK'un kaldırılması için Sulh Ceza Hakimliğine başvurulmuş ve 16.03.2022 tarihinde kovuşturmaya yer olmadığına dair karar kaldırılmıştır.
                   </p>
                   
                   <p>
                     Söz konusu üç dosya Ankara Cumhuriyet Savcılığı 2018/205399 esasıyla birleştirilmiştir. Dosyada sanık olarak adları geçmeyen ancak katliamla ve sanıklarla bağlantılı olduklarını tespit ettiğimiz Yıldız Bozkurt, Deniz Duman ve Mustafa Demir hakkında yaptığımız suç duyuruları üzerine bu şahıslarla ilgili soruşturmalar da aynı dosyaya dahil edilmiştir. Ancak Savcılık tarafından dosyaya "kısıtlılık" kararı alınmış olup, şu anda bu nedenle dosyanın gidişatı hakkında bilgi sahibi olmamız mümkün olamamaktadır. Katliamın üzerinden uzun zaman geçtiği ve savcılığın bu şekilde kısıtlılık kararı vermesini gerektiren hiçbir gerekçe bulunmadığı halde dosyada kısıtlılık kararı verilmesi, katliamla ilgili halen gizlenmeye çalışılan gerçeklerin bulunduğunu bir kez daha göstermektedir.
                   </p>
                   
                   <p>
                     Ankara 4. Ağır Ceza Mahkemesi ise bu soruşturmaların akıbetlerini yargılama sürecinde araştırmadığı gibi sonuçlanmasını beklemeden karar vermiştir.
                   </p>
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>

      <div className="timeline-description">
        <p>
          <strong>Kronolojik sırayla inceleyebilirsiniz:</strong>
        </p>
      </div>

      <VerticalTimeline>
        {events.map((event, index) => (
          <VerticalTimelineElement
            key={index}
            date={event.date}
            iconStyle={{ background: '#8e4a49', color: '#fff' }}
            contentStyle={{ background: '#1c1c1c', color: '#fff' }}
          >
            <h3 className="timeline-title">{toTurkishUpperCase(event.title)}</h3>
            <p>{event.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;
