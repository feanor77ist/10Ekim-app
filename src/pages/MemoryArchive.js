import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPannellum from 'react-pannellum';
import './MemoryArchive.css';

const MemoryArchive = () => {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [victims, setVictims] = useState([]);
  const [panoramaReady, setPanoramaReady] = useState(false);
  const [selectedVictim, setSelectedVictim] = useState(null);
  const [fullscreenRoot, setFullscreenRoot] = useState(null);
  const [showHelp, setShowHelp] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const HELP_KEY = 'memory_help_v2';
  const openVictim = (v) => {
    // Tüm tooltip'leri gizle
    const tooltips = Array.from(document.querySelectorAll('[style*="position: fixed"][style*="z-index: 100000"]'));
    tooltips.forEach(tooltip => {
      tooltip.style.display = 'none';
    });
    
    setSelectedVictim(v);
    setIsModalOpen(true);
  };

  // Ensure a fullscreen button exists in the pannellum controls (iOS safe)
  useEffect(() => {
    if (!panoramaReady) return;
    let tries = 0;
    const attach = () => {
      tries += 1;
      try {
        const panoEl = document.getElementById('memory-archive-panorama');
        const container = panoEl && panoEl.parentElement;
        const controls = container && container.querySelector('.pnlm-controls');
        if (!controls) return;
        // Hide orientation button on mobile
        const orient = controls.querySelector('.pnlm-orientation-button, .pnlm-orientation-toggle-button');
        if (orient) {
          orient.style.display = 'none';
        }
        let fsBtn = controls.querySelector('.pnlm-fullscreen-toggle-button, .pnlm-fullscreen-toggle, .ma-fs-proxy');
        if (!fsBtn) {
          fsBtn = document.createElement('div');
          fsBtn.className = 'pnlm-control ma-fs-proxy';
          fsBtn.title = 'Tam ekran';
          fsBtn.innerHTML = '&#x26F6;';
          controls.appendChild(fsBtn);
        }
        if (!fsBtn.dataset.bound) {
          fsBtn.dataset.bound = '1';
          fsBtn.addEventListener('click', () => {
            try {
              const v = ReactPannellum.getViewer && ReactPannellum.getViewer();
              if (v && typeof v.toggleFullscreen === 'function') { v.toggleFullscreen(); return; }
            } catch (_) {}
            const doc = document;
            const isFs = doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement;
            const root = panoEl;
            if (isFs) {
              (doc.exitFullscreen || doc.webkitExitFullscreen || doc.msExitFullscreen)?.call(doc);
            } else {
              (root.requestFullscreen || root.webkitRequestFullscreen || root.msRequestFullscreen)?.call(root);
            }
          });
        }
        // Force visibility on mobile devices
        if (window.innerWidth <= 768) {
          fsBtn.style.display = 'flex';
          fsBtn.style.visibility = 'visible';
          fsBtn.style.opacity = '1';
          fsBtn.style.position = 'relative';
          fsBtn.style.zIndex = '1200';
        }
      } catch (_) {}
    };
    attach();
    const id = setInterval(() => { attach(); if (tries > 10) clearInterval(id); }, 250);
    return () => clearInterval(id);
  }, [panoramaReady]);

  // Track fullscreen changes so we can portal tooltips/modals into FS root
  useEffect(() => {
    const handleFsChange = () => {
      setFullscreenRoot(document.fullscreenElement || null);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    handleFsChange();
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Help HUD visibility persisted
  useEffect(() => {
    let dismissed = null;
    try { dismissed = localStorage.getItem(HELP_KEY); } catch (_) {}
    if (dismissed === '1') setShowHelp(false);
  }, []);

  const dismissHelp = () => {
    setShowHelp(false);
    try { localStorage.setItem(HELP_KEY, '1'); } catch (_) {}
  };

  // Auto-dismiss help on first interaction or after delay, only if not dismissed before
  useEffect(() => {
    if (!showHelp) return;
    const container = document.getElementById('memory-archive-panorama');
    const onFirstInteract = () => {
      dismissHelp();
      container && container.removeEventListener('mousedown', onFirstInteract);
      container && container.removeEventListener('touchstart', onFirstInteract);
      window.removeEventListener('keydown', onFirstInteract);
    };
    container && container.addEventListener('mousedown', onFirstInteract, { once: true });
    container && container.addEventListener('touchstart', onFirstInteract, { once: true, passive: true });
    window.addEventListener('keydown', onFirstInteract, { once: true });
    const t = setTimeout(dismissHelp, 7000);
    return () => {
      clearTimeout(t);
      container && container.removeEventListener('mousedown', onFirstInteract);
      container && container.removeEventListener('touchstart', onFirstInteract);
      window.removeEventListener('keydown', onFirstInteract);
    };
  }, [showHelp]);

  // Hafıza kategorileri → Navbar ile uyumlu: Süreç, Kararlar, Belgeler & Raporlar, Basın Açıklamaları
  const [memoryData, setMemoryData] = useState({
    surec: { title: "Süreç", icon: "🧭", items: [] },
    kararlar: {
      title: "Kararlar",
      icon: "⚖️",
      items: [
        { id: "k1", title: "ANKARA 4 AĞIR CEZA MAH 2016 232 GEREKÇELİ KARAR", date: "", content: "Karar metni", url: "/kararlar/ANKARA 4 AĞIR CEZA MAH 2016 232 GEREKÇELİ KARAR.pdf", type: "legal" },
        { id: "k2", title: "ANKARA 4 AĞIR CEZA MAH 2018 287 GEREKÇELİ KARAR", date: "", content: "Karar metni", url: "/kararlar/ANKARA 4 AĞIR CEZA MAH 2018 287 GEREKÇELİ KARAR.pdf", type: "legal" },
        { id: "k3", title: "ANKARA BÖLGE ADLİYE MAHKEMESİ GEREKÇELİ KARAR", date: "", content: "Karar metni", url: "/kararlar/ANKARA BÖLGE ADLİYE MAHKEMESİ GEREKÇELİ KARAR.pdf", type: "legal" },
        { id: "k4", title: "İDDİANAME", date: "", content: "İddianame", url: "/kararlar/İDDİANAME.pdf", type: "legal" }
      ]
    },
    belgeler: {
      title: "Belgeler & Raporlar",
      icon: "📄",
      items: [
        { id: "b1", title: "Araştırma Raporu", date: "", content: "PDF", url: "/belgeler-raporlar/1-Araştırma Raporu.pdf", type: "document" },
        { id: "b2", title: "Araştırma Raporu Ekleri", date: "", content: "PDF", url: "/belgeler-raporlar/2-Araştırma Raporu Ekleri .pdf", type: "document" },
        { id: "b3", title: "Disiplin Raporu", date: "", content: "PDF", url: "/belgeler-raporlar/Disiplin Raporu .pdf", type: "document" },
        { id: "b4", title: "İnceleme Raporu (1)", date: "", content: "PDF", url: "/belgeler-raporlar/İnceleme Raporu .pdf", type: "document" },
        { id: "b5", title: "İnceleme Raporu (2)", date: "", content: "PDF", url: "/belgeler-raporlar/İnceleme Raporu.pdf", type: "document" },
        { id: "b6", title: "Mülkiye Müfettişleri Ön İnceleme Raporu", date: "", content: "PDF", url: "/belgeler-raporlar/MÜLKİYE MÜFETTİŞLERİ ÖN İNCELEME RAPORU.pdf", type: "document" }
      ]
    },
    aciklamalar: {
      title: "Basın Açıklamaları",
      icon: "📰",
      items: [
        { id: "a1", title: "10.10.2024 - 9. Yıl Anma Açıklama", date: "10.10.2024", content: "PDF", url: "/basın açıklamaları/10.10.2024-9.YIL ANMA açıklama.pdf", type: "press" },
        { id: "a2", title: "24.04.2024 - Tefrik Mütalaa Açıklama", date: "24.04.2024", content: "PDF", url: "/basın açıklamaları/24.04.2024- Tefrik Mütalaa açıklama.pdf", type: "press" },
        { id: "a3", title: "21.05.2024 - AYM Kabul Edilmezlik Açıklama", date: "21.05.2024", content: "PDF", url: "/basın açıklamaları/21.05.2024-AYM Kabul edilmezlik Açıklama.pdf", type: "press" },
        { id: "a4", title: "13.09.2024 - Tefrik Gerekçeli Karar Açıklaması", date: "13.09.2024", content: "PDF", url: "/basın açıklamaları/13.09.2024-Tefrik Gerekçeli karar açıklaması.pdf", type: "press" },
        { id: "a5", title: "10.10.2022 - 7. Yıl Anma Açıklama", date: "10.10.2022", content: "PDF", url: "/basın açıklamaları/10.10.2022-7.Yıl Anma Açıklama.pdf", type: "press" }
      ]
    },
    barisportreleri: {
      title: "Barış Portreleri",
      icon: "👥",
      items: [
        { id: "bp1", title: "Barış Portreleri", date: "", content: "PDF", url: "https://platform24.org/wp-content/uploads/2024/02/P24_Hafiza_Kitapligi_Baris_Portreleri.pdf", type: "document", external: true }
      ]
    }
  });

  // Süreç verilerini timeline_events.json'dan çek
  useEffect(() => {
    fetch('/timeline_events.json')
      .then((r) => r.json())
      .then((data) => {
        const events = (Array.isArray(data) ? data : []).map((ev, idx) => ({
          id: `s_${idx}`,
          title: ev.title || ev.name || 'Olay',
          date: ev.date || ev.when || '',
          content: ev.description || ev.detail || '',
          type: 'process'
        }));
        setMemoryData((prev) => ({ ...prev, surec: { ...prev.surec, items: events } }));
      })
      .catch(() => {});
  }, []);

  // Hotspotları daha sonra addHotSpot API'si ile ekleyeceğiz

  const handleHotspotClick = (category) => {
    setSelectedHotspot(memoryData[category]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHotspot(null);
    setSelectedVictim(null);
  };

  // Load memories.json once
  useEffect(() => {
    fetch('/memories.json')
      .then((r) => r.json())
      .then((data) => setVictims(Array.isArray(data) ? data : []))
      .catch(() => setVictims([]));
  }, []);

  // Hide victim pins when a victim modal is open
  useEffect(() => {
    const pins = Array.from(document.querySelectorAll('.victim-pin'));
    if (isModalOpen && selectedVictim) {
      pins.forEach((el) => { el.style.visibility = 'hidden'; });
    } else {
      pins.forEach((el) => { el.style.visibility = 'visible'; });
    }
    return () => {
      pins.forEach((el) => { el.style.visibility = 'visible'; });
    };
  }, [isModalOpen, selectedVictim]);

  // Hide all tooltips when modal opens
  useEffect(() => {
    if (isModalOpen && selectedVictim) {
      // Tüm tooltip'leri gizle
      const tooltips = Array.from(document.querySelectorAll('[style*="position: fixed"][style*="z-index: 100000"]'));
      tooltips.forEach(tooltip => {
        if (tooltip.style.display !== 'none') {
          tooltip.style.display = 'none';
        }
      });
    }
  }, [isModalOpen, selectedVictim]);

  // Simple, deterministic ring positions (responsive)
  const victimPositions = useMemo(() => {
    const count = victims.length;
    if (!count) return [];
    const positions = [];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const rings = isMobile ? 6 : 4; // Mobilde daha fazla ring
    const perRing = Math.ceil(count / rings);
    const ringPitch = isMobile ? [-25, -15, -5, 5, 15, 25] : [-12, -4, 4, 12]; // Mobilde daha geniş pitch aralığı
    for (let r = 0; r < rings; r += 1) {
      for (let i = 0; i < perRing && positions.length < count; i += 1) {
        // Mobilde daha geniş yaw dağılımı ve daha az rastgelelik
        const yaw = (i / perRing) * 360 + r * (isMobile ? 20 : 15) + (Math.random() * (isMobile ? 8 : 12) - (isMobile ? 4 : 6));
        const pitch = ringPitch[r] + (Math.random() * (isMobile ? 6 : 8) - (isMobile ? 3 : 4));
        positions.push({ yaw, pitch });
      }
    }
    return positions;
  }, [victims]);

  // Render victim pins (filtered by search)
  useEffect(() => {
    if (!panoramaReady || !victims.length) return;
    try {
      const filtered = searchQuery
        ? victims.filter((m) => (m.name || '').toLowerCase().includes(searchQuery.toLowerCase()))
        : victims;

      // Clear previously added hotspots generously
      for (let i = 0; i < 500; i += 1) {
        try { ReactPannellum.removeHotSpot(`victim_${i}`, 'memoryScene'); } catch (_) {}
      }

      // Compute positions for the filtered subset so spacing stays nice
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const rings = isMobile ? 6 : 4; // Mobilde daha fazla ring
      const perRing = Math.ceil(filtered.length / rings) || 1;
      const ringPitch = isMobile ? [-25, -15, -5, 5, 15, 25] : [-12, -4, 4, 12]; // Mobilde daha geniş pitch aralığı
      const posForIndex = (i) => {
        const r = Math.floor(i / perRing);
        const idxInRing = i % perRing;
        // Mobilde daha geniş yaw dağılımı ve daha az rastgelelik
        const yaw = (idxInRing / perRing) * 360 + r * (isMobile ? 20 : 15) + (Math.random() * (isMobile ? 8 : 12) - (isMobile ? 4 : 6));
        const pitch = ringPitch[r] + (Math.random() * (isMobile ? 6 : 8) - (isMobile ? 3 : 4));
        return { yaw, pitch };
      };

      filtered.forEach((v, idx) => {
        const pos = posForIndex(idx);
        const id = `victim_${idx}`;
        ReactPannellum.addHotSpot({
          id,
          pitch: pos.pitch,
          yaw: pos.yaw,
          cssClass: 'victim-pin',
          createTooltipFunc: (hotSpotDiv) => {
            // Base position and interactions
            hotSpotDiv.style.transform = 'translate(-50%, -50%)';
            hotSpotDiv.style.pointerEvents = 'auto';
            hotSpotDiv.style.zIndex = '2000';
            // Pin (simple dot with larger touch area on mobile)
            const pin = document.createElement('div');
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            const size = isMobile ? 12 : 16; // Daha belirgin fark
            const touchSize = isMobile ? 32 : 24; // Touch alanı daha geniş
            console.log('Mobile:', isMobile, 'Size:', size); // Debug
            pin.style.width = `${size}px`;
            pin.style.height = `${size}px`;
            pin.style.borderRadius = '50%';
            pin.style.border = '2px solid #fff';
            pin.style.boxShadow = '0 0 0 1px #d4af37, 0 2px 8px rgba(0,0,0,0.6), 0 0 15px rgba(212, 175, 55, 0.6)';
            pin.style.backgroundColor = '#d4af37';
            pin.style.zIndex = '1000';
            pin.style.animation = 'pulse 2s infinite';
            pin.style.cursor = 'pointer';
            
            // Mobilde daha geniş touch alanı için invisible padding
            if (isMobile) {
              pin.style.position = 'relative';
              pin.style.padding = `${(touchSize - size) / 2}px`;
              pin.style.margin = `-${(touchSize - size) / 2}px`;
            }
            // Tooltip: render at body level to avoid stacking issues
            let tooltip = null;
            const ensureTooltip = () => {
              if (tooltip) return tooltip;
              tooltip = document.createElement('div');
              tooltip.style.position = 'fixed';
              tooltip.style.background = 'rgba(0,0,0,0.9)';
              tooltip.style.color = '#fff';
              tooltip.style.padding = '12px';
              tooltip.style.borderRadius = '12px';
              tooltip.style.fontSize = '14px';
              tooltip.style.fontWeight = '600';
              tooltip.style.pointerEvents = 'none';
              tooltip.style.zIndex = '100000';
              tooltip.style.display = 'none';
              tooltip.style.border = '2px solid #d4af37';
              tooltip.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
              tooltip.style.maxWidth = '200px';
              tooltip.style.textAlign = 'center';
              
              // Resim preview'ı ekle
              if (v.image) {
                const img = document.createElement('img');
                img.src = v.image;
                img.style.width = '60px';
                img.style.height = '60px';
                img.style.borderRadius = '50%';
                img.style.objectFit = 'cover';
                img.style.marginBottom = '8px';
                img.style.border = '2px solid #fff';
                tooltip.appendChild(img);
              }
              
              // İsim ekle
              const nameDiv = document.createElement('div');
              nameDiv.textContent = v.name;
              nameDiv.style.whiteSpace = 'nowrap';
              tooltip.appendChild(nameDiv);
              
              const arrow = document.createElement('div');
              arrow.style.position = 'absolute';
              arrow.style.left = '50%';
              arrow.style.transform = 'translateX(-50%)';
              arrow.style.width = '0';
              arrow.style.height = '0';
              arrow.style.borderLeft = '8px solid transparent';
              arrow.style.borderRight = '8px solid transparent';
              arrow.style.borderTop = '8px solid #d4af37';
              arrow.dataset.arrow = '1';
              tooltip.appendChild(arrow);
              const root = document.fullscreenElement || document.body;
              root.appendChild(tooltip);
              return tooltip;
            };

            const positionTooltip = () => {
              if (!tooltip) return;
              const rect = hotSpotDiv.getBoundingClientRect();
              const top = rect.top - 10;
              const left = rect.left + rect.width / 2;
              tooltip.style.top = `${top}px`;
              tooltip.style.left = `${left}px`;
              tooltip.style.transform = 'translate(-50%, -100%)';
              const arrow = tooltip.querySelector('[data-arrow="1"]');
              if (arrow) { arrow.style.bottom = '-5px'; }
            };

            hotSpotDiv.appendChild(pin);

            let showTimer = null; let hideTimer = null; let longTimer = null; let longPressed = false;
            const show = (delay = 200) => {
              clearTimeout(hideTimer); clearTimeout(showTimer);
              showTimer = setTimeout(() => { ensureTooltip(); positionTooltip(); tooltip.style.display = 'block'; }, delay);
            };
            const hide = (delay = 120) => {
              clearTimeout(hideTimer); clearTimeout(showTimer);
              hideTimer = setTimeout(() => { if (tooltip) tooltip.style.display = 'none'; }, delay);
            };
            hotSpotDiv.addEventListener('mouseenter', () => show(200));
            hotSpotDiv.addEventListener('mouseleave', () => hide(120));
            hotSpotDiv.addEventListener('mousemove', () => positionTooltip());
            hotSpotDiv.addEventListener('touchstart', () => {
              longPressed = false; clearTimeout(longTimer);
              longTimer = setTimeout(() => { 
                longPressed = true; 
                ensureTooltip(); 
                positionTooltip(); 
                tooltip.style.display = 'block'; 
              }, 300);
            }, { passive: true });
            hotSpotDiv.addEventListener('touchend', () => {
              clearTimeout(longTimer);
              if (longPressed) {
                hide(1000); // Preview'ı daha uzun göster
              }
            }, { passive: true });
            hotSpotDiv.addEventListener('click', (e) => {
              if (longPressed) { e.stopPropagation(); longPressed = false; }
            });
          },
          clickHandlerFunc: () => {
            openVictim(v);
          }
        }, 'memoryScene');
      });

      // Only re-center when user actually searched something
      if (searchQuery && searchQuery.trim().length > 0 && filtered.length > 0) {
        const firstPos = posForIndex(0);
        try {
          // Adjust view without changing zoom (hfov)
          if (typeof ReactPannellum.setYaw === 'function') ReactPannellum.setYaw(firstPos.yaw, 'memoryScene');
          if (typeof ReactPannellum.setPitch === 'function') ReactPannellum.setPitch(firstPos.pitch, 'memoryScene');
        } catch (_) {}
      }
    } catch (e) {
      // no-op baseline
    }
  }, [panoramaReady, victims, victimPositions, searchQuery]);

  return (
    <div className="memory-archive">
      <div className="archive-header">
        <h1>10 Ekim Hafıza Meydanı</h1>
        <p>360° İnteraktif hafıza ve mücadele alanı</p>
      </div>

      <div className="pannellum-container">
        <ReactPannellum
          id="memory-archive-panorama"
          sceneId="memoryScene"
          imageSource={require('../images/360kolaj.png')}
          style={{
            width: "100%",
            height: "75vh",
            background: "#000000"
          }}
          config={{
            autoLoad: true,
            autoRotate: 0,
            showZoomCtrl: true,
            showFullscreenCtrl: true,
            mouseZoom: true,
            keyboardZoom: false,
            friction: 0.15,
            momentum: true,
            doubleClickZoom: true,
            touchZoom: true,
            touchPan: true,
            pitch: 10,
            yaw: 180,
            hfov: 110
          }}
          onPanoramaLoaded={() => {
            setPanoramaReady(true);
            // Ensure fullscreen control exists on all devices and hide orientation button
            try {
              const panoEl = document.getElementById('memory-archive-panorama');
              const container = panoEl && panoEl.parentElement;
              const controls = container && container.querySelector('.pnlm-controls');
              if (!controls) return;
              
              // Hide orientation button on mobile
              const orient = controls.querySelector('.pnlm-orientation-button, .pnlm-orientation-toggle-button');
              if (orient) {
                orient.style.display = 'none';
              }
              
              let fsBtn = controls.querySelector('.pnlm-fullscreen-toggle-button, .pnlm-fullscreen-toggle');
              if (!fsBtn) {
                fsBtn = document.createElement('div');
                fsBtn.className = 'pnlm-control pnlm-fullscreen-toggle-button';
                fsBtn.title = 'Tam ekran';
                fsBtn.textContent = '⛶';
                controls.appendChild(fsBtn);
              }
              if (!fsBtn.dataset.bound) {
                fsBtn.dataset.bound = '1';
                fsBtn.addEventListener('click', () => {
                  try {
                    const v = ReactPannellum.getViewer && ReactPannellum.getViewer();
                    if (v && typeof v.toggleFullscreen === 'function') { v.toggleFullscreen(); return; }
                  } catch (_) {}
                  const doc = document;
                  const root = panoEl;
                  const isFs = doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement;
                  if (isFs) {
                    (doc.exitFullscreen || doc.webkitExitFullscreen || doc.msExitFullscreen)?.call(doc);
                  } else {
                    (root.requestFullscreen || root.webkitRequestFullscreen || root.msRequestFullscreen)?.call(root);
                  }
                });
              }
            } catch (_) {}
          }}
        />
        {/* No custom fullscreen button; rely on Pannellum's own control (visible via CSS) */}
      </div>

      {/* Search under panorama */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', margin: '8px 0 16px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="İsim ara..."
          style={{
            width: 'min(680px, 92vw)',
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            background: 'rgba(0,0,0,0.5)',
            color: '#f5f5f5',
            outline: 'none',
          }}
        />
        <div style={{ color: '#d4af37', opacity: 0.9, fontWeight: 600 }}>
          {(() => {
            const q = (searchQuery || '').trim().toLowerCase();
            const count = q ? victims.filter((m) => (m.name || '').toLowerCase().includes(q)).length : victims.length;
            return `${count}/${victims.length}`;
          })()}
        </div>
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

      {/* Help HUD */}
      {showHelp ? (
        <div className="help-hud">
          <div className="help-title">Nasıl gezinebilirsiniz?</div>
          <ul>
            <li><b>Gezinme</b>: Fareyle basılı tutup sürükleyin. TouchPad / mobilde parmağınızla sürükleyin.</li>
            <li><b>Yakınlaştırma</b>: Fare tekeri / çift tıklama; TouchPad / mobilde iki parmakla “pinch”.</li>
            <li><b>Detay</b>: Bir pin’e tıklayın. Hover’da isim görünür.</li>
            <li><b>Kapatma</b>: Modalı kapatmak için ESC’ye basın veya boş alana tıklayın.</li>
            <li><b>Tam ekran</b>: Tam ekran için butona tıklayın; tekrar tıklayın çıkın.</li>
          </ul>
          <button className="help-dismiss" onClick={dismissHelp}>Anladım</button>
        </div>
      ) : (
        <button className="help-fab" onClick={() => setShowHelp(true)}>?</button>
      )}

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
                  {item.url && (
                    <a className="victim-link" href={item.url} target="_blank" rel="noreferrer">İndir / Görüntüle</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Victim modal - portal to fullscreen root if present */}
      {isModalOpen && selectedVictim && (
        ReactDOM.createPortal(
          (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>
                    <span className="modal-icon">🕊️</span>
                    {selectedVictim.name}
                  </h2>
                  <button className="close-btn" onClick={closeModal}>×</button>
                </div>
                <div className="modal-body victim-modal">
                  {selectedVictim.image && (
                    <img
                      className="victim-photo"
                      src={selectedVictim.image}
                      alt={selectedVictim.name}
                      loading="lazy"
                    />
                  )}
                  <p className="victim-bio">{selectedVictim.bio}</p>
                  {selectedVictim.source && (
                    <a
                      className="victim-link"
                      href={selectedVictim.source}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Kaynak
                    </a>
                  )}
                </div>
              </div>
            </div>
          ),
          fullscreenRoot || document.body
        )
      )}
    </div>
  );
};

export default MemoryArchive;
