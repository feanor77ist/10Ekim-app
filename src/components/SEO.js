import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = '10 Ekim Davası', 
  description = '10 Ekim Ankara Gar Katliamı ile ilgili belgeler, haberler ve yargı süreci hakkında kapsamlı bilgi arşivi',
  keywords = '10 Ekim, Ankara Gar Katliamı, adalet, dava, yargı süreci, insan hakları',
  image = 'https://10ekimdavasi.com/logo.webp',
  url = 'https://10ekimdavasi.com',
  type = 'website',
  structuredData = null
}) => {
  return (
    <Helmet>
      {/* Temel Meta Tag'ler */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="10 Ekim Davası" />
      <meta property="og:locale" content="tr_TR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Ek SEO Meta Tag'leri */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="Turkish" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="10 Ekim Davası Aileler Platformu" />
      
      {/* Mobil Optimizasyon */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

