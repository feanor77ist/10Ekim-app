import React from 'react';
import './Hakkinda.css';

const Hakkinda = () => {
  return (
    <div className="hakkinda-container">
      <div className="hakkinda-header">
        <h1>10 Ekim Ankara Katliamı Davası Avukat Komisyonu</h1>
      </div>

      <div className="hakkinda-content">
        <div className="intro-section">
          
          <div className="main-text">
            <p>
              Bundan yaklaşık 10 yıl önce 10 Ekim 2015 günü gerçekleştirilmek istenen barış mitinginin 
              başlangıç noktası olan Ankara Garında IŞİD'li iki canlı bombanın kendisini patlatmasıyla 
              <strong> 103 kişi hayatını kaybetmiş</strong>, <strong>500'den fazla insan yaralanmış</strong>, 
              binlerce kişi katliama tanıklık etmiştir.
            </p>
          </div>
        </div>

        <div className="mission-section">
          <p>
            Türkiye'nin en büyük kitle katliamlarından biri olarak toplumsal hafızada önemli izler bırakan, 
            öncesi ve sonrasıyla Türkiye'de toplumsal ve siyasal yaşamın önemli kırılma noktalarından biri 
            olarak kabul edilen 10 Ekim Ankara katliamının soruşturma ve yargılama sürecini 
            <strong> "10 Ekim Ankara Katliamı Avukat Komisyonu"</strong> olarak en başından itibaren takip etmekteyiz.
          </p>
          
          <p>
            Kolektif çalışmayı esas alan komisyonumuz, yargılama süreci boyunca katliama ilişkin tüm 
            sorumluların yargılanmasını hedefleyen bir çalışma yürütmüştür.
          </p>
        </div>

        <div className="justice-section">
          <p>
            Yargı süreci, hayatını kaybedenlerin yakınları, yaralılar, emek ve demokrasi güçlerinin 
            ısrarlı ve inatçı mücadelesi ile yıllardır takip edilmekte olup, bu açıdan önemli bir 
            hukuk ve adalet mücadelesine dönüşmüştür.
          </p>
          
          <p>
            Sadece iddianamede sanık olarak yer alan IŞİD'lilerin yargılanmasıyla yetinmeyen, 
            katliamın karanlık noktalarının aydınlatılması ve kamu görevlileri de dahil olmak üzere 
            tüm faillerinin yargılanmasını talep eden bu adalet mücadelesinin önemli bir parçasının 
            katliamın hafızalardan silinmemesi olduğunu düşünüyoruz.
          </p>
        </div>

        <div className="importance-section">
          <p>
            10 Ekim Ankara katliamının unutturulmaması, katliamın aydınlatılması ve gerçek faillerin 
            ortaya çıkarılması için verilen adalet mücadelesi, her şeyden önce 10 Ekim ailelerine ve 
            tüm Türkiye halklarına karşı bir sorumluluk olduğu gibi başka kitle katliamları yaşanmaması 
            için de önemlidir.
          </p>
          
          <p>
            Çünkü 10 Ekim Ankara katliamı ile birlikte 2015-2016 yıllarındaki katliamları planlayan ve 
            düzenleyenlerin, güçlü bir adalet mücadelesiyle katliamların gerçek failleri ortaya çıkarılmadığı 
            sürece yeni katliamlar planlamalarını engelleyecek hiçbir güç yoktur.
          </p>
        </div>

        <div className="digital-archive-section">
          <p>
            Bu meyanda 10 Ekim Ankara Katliamı ve yargılama süreciyle ilgili her türlü bilgi ve belgelerin, 
            sadece dava dosyalarında kalmamasının ve dijital olarak kamuoyuna sunulmasının, adalet ve 
            demokrasi mücadelesinin bir parçası olarak toplumsal hafıza çalışmaları bakımından önemli 
            olduğunu düşünüyoruz.
          </p>
        </div>

        <div className="portal-objectives">
          <h2>Portalımızın Amaçları</h2>
          <div className="objectives-grid">
            <div className="objective-item">
              <div className="objective-icon">📚</div>
              <h3>Bilgi Erişimi</h3>
              <p>
                Katliamın gerçeklerini öğrenmek isteyenlere tek bir noktadan ulaşabilecekleri 
                derli toplu bilgilerin yer aldığı bir dijital mecra sunulması
              </p>
            </div>
            
            <div className="objective-item">
              <div className="objective-icon">⚖️</div>
              <h3>Hukuki Kaynak</h3>
              <p>
                Katliamın yargı sürecine ilişkin hukukçuların ve araştırmacıların 
                ilk elden ulaşabilecekleri bir kaynak olması
              </p>
            </div>
            
            <div className="objective-item">
              <div className="objective-icon">🌐</div>
              <h3>Dijital Erişim</h3>
              <p>
                Katliamın gerçeklerinin dijital ortamlarda kolay ulaşılabilir hale getirilmesi
              </p>
            </div>
            
            <div className="objective-item">
              <div className="objective-icon">🧠</div>
              <h3>Toplumsal Hafıza</h3>
              <p>
                Böylece katliamın toplumun hafızasından silinmemesi amaçlanmaktadır
              </p>
            </div>
          </div>
        </div>

        <div className="future-section">
          <p>
            Şimdilik yargılama sürecine ilişkin temel bilgi ve belgeler ile katliamla ilgili ulaşılabilen 
            haberlerin arşivinden oluşan bir içeriğin yer aldığı web sitesinin içeriğini süreç içerisinde 
            anlamına uygun biçimde genişletmeye çalışacağız.
          </p>
          
          <p>
            Bu çalışmamızın adalet mücadelemizi güçlendirmesini, katliamla ilgili gerçekleri öğrenmek 
            isteyenlere ve özellikle genç hukukçulara faydalı olmasını umuyoruz.
          </p>
        </div>

        <div className="signature-section">
          <div className="signature">
            <p><strong>10 Ekim Ankara Katliamı Davası</strong></p>
            <p><strong>Avukat Komisyonu</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hakkinda;
