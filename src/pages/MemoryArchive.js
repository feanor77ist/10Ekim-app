import React, { useState } from 'react';
import ReactPannellum from 'react-pannellum';
import './MemoryArchive.css';

const MemoryArchive = () => {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hafıza kategorileri ve içerikleri
  const memoryData = {
    legal: {
      title: "Hukuki Süreç",
      icon: "⚖️",
      items: [
        {
          id: "ankara4",
          title: "Ankara 4. Ağır Ceza Mahkemesi",
          date: "7 Kasım 2016 - 3 Ağustos 2018",
          content: "Davanın açılması ile yargılama süreci 7 Kasım 2016'da başlamıştır. Toplam 10 grup duruşma ve 54 celse yapılmıştır. 19 tutuklu sanık yönünden 3 Ağustos 2018 günü karar verilmiştir.",
          type: "legal"
        },
        {
          id: "yargitay",
          title: "Yargıtay Süreci",
          date: "29 Haziran 2022",
          content: "Yargıtay 3. Ceza Dairesi'nin kararı ile dosyada kısmi bozma kararı verilmiştir. Sanıklar hakkında kasten öldürmeye teşebbüs etme suçu yönünden mahkumiyetlerine yönelik bozma kararı.",
          type: "legal"
        }
      ]
    },
    documents: {
      title: "Belgeler & Deliller",
      icon: "📋",
      items: [
        {
          id: "missing-folders",
          title: "Kayıp 9 Klasör",
          date: "2019",
          content: "Katliamdan 4 yıl sonra ortaya çıkarılan 9 kayıp klasörde canlı bomba aracına eskortluk yapan sanık Yakub Şahin ve örgütün nakliyecisi Hüseyin Tunç ile ilgili çok önemli belgeler bulunmaktadır.",
          type: "document"
        },
        {
          id: "fertilizer-investigation",
          title: "Gübre Satın Alma Soruşturması",
          date: "30 Eylül 2015",
          content: "Katliamdan 10 gün önce Yakub Şahin ve Hüseyin Tunç'un bomba yapımında kullanmak üzere 2 ton Amonyum Nitrat gübre satın almaya çalışması ve gübre satıcısının ihbarı.",
          type: "document"
        }
      ]
    },
    testimonies: {
      title: "Tanıklıklar",
      icon: "👥",
      items: [
        {
          id: "fertilizer-seller",
          title: "Gübre Satıcısının Tanıklığı",
          date: "1 Ekim 2015",
          content: "Gübre satıcısı, şüpheli kişilerin gübrenin 'son zamanlarda artan terör saldırılarında kullanılabileceği' şüphesini belirterek Nizip Emniyeti'ne ihbarda bulunmuştur.",
          type: "testimony"
        },
        {
          id: "massacre-witnesses",
          title: "Katliam Tanıkları",
          date: "10 Ekim 2015",
          content: "On binlerce insan sabahın ilk saatlerinde Ankara Garı'nda toplanmış, kortejlerini oluşturmaya başlamışlardı. Binlerce kişi katliama tanıklık etti.",
          type: "testimony"
        }
      ]
    },
    statistics: {
      title: "Veriler",
      icon: "📊",
      items: [
        {
          id: "casualties",
          title: "Kayıplar",
          date: "10 Ekim 2015",
          content: "104 kişi hayatını kaybetti, 500'den fazla kişi yaralandı. Bu sayılar sadece fiziksel kayıpları ifade eder, psikolojik ve toplumsal etkiler çok daha geniştir.",
          type: "data"
        },
        {
          id: "sentences",
          title: "Mahkumiyetler",
          date: "1 Temmuz 2024",
          content: "10 sanığa 101 kez Kasten Nitelikli Öldürme Suçundan ağırlaştırılmış müebbet cezası verilmiştir. 379 kez Kasten Nitelikli Öldürmeye Teşebbüs suçundan cezalandırma.",
          type: "data"
        }
      ]
    },
    political: {
      title: "Politik Boyut",
      icon: "🎯",
      items: [
        {
          id: "election-impact",
          title: "Seçimlere Etkisi",
          date: "Kasım 2015",
          content: "Haziran seçimlerinin intikamı alınmış, 'kaos istiyorsunuz madem buyurun kaos' denilmiş, katliamın arkasından anketler yapılmış, AKP'nin tek başına iktidar olmasının yolları bu katliamla kurulmuştur.",
          type: "political"
        },
        {
          id: "peace-rally",
          title: "Barış Mitingi Ruhu",
          date: "10 Ekim 2015",
          content: "Ülkenin dört bir yanından gelenler bir barış mitingi için Ankara'da buluşmuştu. Bu barışçıl ruh ve demokrasi mücadelesi katliamla hedef alınmıştır.",
          type: "political"
        }
      ]
    }
  };

  // Hotspotları daha sonra addHotSpot API'si ile ekleyeceğiz

  const handleHotspotClick = (category) => {
    setSelectedHotspot(memoryData[category]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHotspot(null);
  };

  return (
    <div className="memory-archive">
      <div className="archive-header">
        <h1>10 Ekim Hafıza Arşivi</h1>
        <p>360° İnteraktif hafıza ve mücadele alanı</p>
      </div>

      <div className="pannellum-container">
        <ReactPannellum
          id="memory-archive-panorama"
          sceneId="memoryScene"
          imageSource="https://pannellum.org/images/alma.jpg"
          style={{
            width: "100%",
            height: "600px",
            background: "#000000"
          }}
          config={{
            autoLoad: true,
            autoRotate: -2,
            showZoomCtrl: true,
            showFullscreenCtrl: true,
            mouseZoom: true,
            doubleClickZoom: true,
            pitch: 10,
            yaw: 180,
            hfov: 110
          }}
          onPanoramaLoaded={() => {
            console.log('Panorama yüklendi!');
          }}
        />
      </div>

      <div className="category-navigation">
        {Object.entries(memoryData).map(([key, category]) => (
          <button
            key={key}
            className={`category-btn ${key}-btn`}
            onClick={() => handleHotspotClick(key)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-title">{category.title}</span>
          </button>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedHotspot && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <span className="modal-icon">{selectedHotspot.icon}</span>
                {selectedHotspot.title}
              </h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            
            <div className="modal-body">
              {selectedHotspot.items.map((item) => (
                <div key={item.id} className={`memory-item ${item.type}`}>
                  <div className="item-header">
                    <h3>{item.title}</h3>
                    <span className="item-date">{item.date}</span>
                  </div>
                  <p className="item-content">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryArchive;
