import React, { useState, useEffect } from 'react';
import './Haberler.css';

const Haberler = () => {
  const [haberler, setHaberler] = useState([]);
  const [filteredHaberler, setFilteredHaberler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('Tümü');
  const [selectedSource, setSelectedSource] = useState('Tümü');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Sayfa başına 12 haber

  // Filtreleme seçenekleri
  const [years, setYears] = useState([]);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    // JSON dosyasını yükle
    fetch('/haberler_filtered.json')
      .then(response => response.json())
      .then(data => {
        // Haberleri tarihe göre ters sırala (en yeni en üstte)
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setHaberler(sortedData);
        setFilteredHaberler(sortedData);
        setLoading(false);

        // Yılları ve kaynakları çıkar
        const uniqueYears = [...new Set(data.map(item => item.date.split('-')[0]))].sort((a, b) => b - a);
        const uniqueSources = [...new Set(data.map(item => item.source))].sort();
        
        setYears(['Tümü', ...uniqueYears]);
        setSources(['Tümü', ...uniqueSources]);
      })
      .catch(error => {
        console.error('Haberler yüklenirken hata:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Arama için debounce
    if (searchTerm) {
      setIsSearching(true);
      const timeoutId = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setIsSearching(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Filtreleme işlemi
    let filtered = haberler;

    // Yıl filtresi
    if (selectedYear !== 'Tümü') {
      filtered = filtered.filter(item => item.date.startsWith(selectedYear));
    }

    // Kaynak filtresi
    if (selectedSource !== 'Tümü') {
      filtered = filtered.filter(item => item.source === selectedSource);
    }

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtreleme sonrası da tarihe göre ters sırala (en yeni en üstte)
    filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredHaberler(filtered);
    setCurrentPage(1); // Filtreleme yapıldığında ilk sayfaya dön
  }, [haberler, selectedYear, selectedSource, searchTerm]);

  // Pagination hesaplamaları
  const totalPages = Math.ceil(filteredHaberler.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHaberler = filteredHaberler.slice(startIndex, endIndex);

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sayfa değiştiğinde üste çık
  };

  // Sayfa numaralarını oluştur
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Tüm sayfaları göster
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Akıllı sayfa numaralandırması
      if (currentPage <= 3) {
        // İlk sayfalardayız
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Son sayfalardayız
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Ortadayız
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImagePath = (imageName) => {
    if (!imageName) return '/images/logo.png'; // Varsayılan resim
    return `/images/haberler/${imageName}`;
  };

  const truncateContent = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="haberler-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Haberler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="haberler-container">
      {/* Header */}
      <div className="haberler-header">
        <h1>Haber Arşivi</h1>
        <p>10 Ekim katliamı ile ilgili haberler ve gelişmeler</p>
      </div>

      {/* Filtreler */}
      <div className="filters-section">
        <div className="filters-container">
          {/* Arama */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Haber ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">
              {isSearching ? '⏳' : '🔍'}
            </span>
          </div>

          {/* Filtreler Row - Sadece mobilde */}
          <div className="filters-row">
            {/* Yıl Filtresi */}
            <div className="filter-group">
              <label>Yıl</label>
              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                className="filter-select"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Kaynak Filtresi */}
            <div className="filter-group">
              <label>Kaynak</label>
              <select 
                value={selectedSource} 
                onChange={(e) => setSelectedSource(e.target.value)}
                className="filter-select"
              >
                {sources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sonuç sayısı */}
          <div className="results-count">
            {filteredHaberler.length} haber bulundu
            {totalPages > 1 && (
              <span className="page-info">
                (Sayfa {currentPage} / {totalPages})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Haberler Grid */}
      <div className="haberler-grid">
        {currentHaberler.map((haber, index) => (
          <div 
            key={index} 
            className="haber-card"
            onClick={() => window.open(haber.url, '_blank', 'noopener,noreferrer')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.open(haber.url, '_blank', 'noopener,noreferrer');
              }
            }}
            aria-label={`${haber.title} haberini aç`}
          >
            {/* Resim */}
            <div className="haber-image">
              <img 
                src={getImagePath(haber.image_name)} 
                alt={haber.title}
                onError={(e) => {
                  e.target.src = '/images/logo.png';
                }}
              />
              <div className="haber-source">{haber.source}</div>
            </div>

            {/* İçerik */}
            <div className="haber-content">
              <h3 
                className="haber-title" 
                title={haber.title}
                data-tooltip={haber.title}
              >
                {haber.title}
              </h3>
              <p className="haber-date">{formatDate(haber.date)}</p>
              <p className="haber-excerpt">
                {truncateContent(haber.content)}
              </p>
              
              {/* Butonlar */}
              <div className="haber-actions">
                <span className="read-more-btn">
                  Haberi Oku →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination">
            {/* Önceki sayfa butonu */}
            <button
              className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹ Önceki
            </button>

            {/* Sayfa numaraları */}
            {getPageNumbers().map((pageNumber, index) => (
              <button
                key={index}
                className={`pagination-btn ${
                  pageNumber === currentPage ? 'active' : ''
                } ${pageNumber === '...' ? 'ellipsis' : ''}`}
                onClick={() => typeof pageNumber === 'number' && handlePageChange(pageNumber)}
                disabled={pageNumber === '...'}
              >
                {pageNumber}
              </button>
            ))}

            {/* Sonraki sayfa butonu */}
            <button
              className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Sonraki ›
            </button>
          </div>

          {/* Sayfa bilgisi */}
          <div className="pagination-info">
            {startIndex + 1}-{Math.min(endIndex, filteredHaberler.length)} / {filteredHaberler.length} haber
          </div>
        </div>
      )}

      {/* Sonuç bulunamadı */}
      {filteredHaberler.length === 0 && !loading && (
        <div className="no-results">
          <h3>Hiç haber bulunamadı</h3>
          <p>Filtrelerinizi değiştirerek tekrar deneyin.</p>
        </div>
      )}
    </div>
  );
};

export default Haberler;
