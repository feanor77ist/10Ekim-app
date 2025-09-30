// Cloudinary utility functions
export const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com';

// Cloudinary URL builder
export const buildCloudinaryUrl = (publicId, options = {}) => {
  const {
    cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    format = 'auto',
    quality = 'auto',
    width,
    height,
    crop = 'scale'
  } = options;

  let url = `${CLOUDINARY_BASE_URL}/${cloudName}/image/upload/`;
  
  // Transformations
  const transformations = [];
  
  if (quality !== 'auto') transformations.push(`q_${quality}`);
  if (format !== 'auto') transformations.push(`f_${format}`);
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  
  if (transformations.length > 0) {
    url += transformations.join(',') + '/';
  }
  
  url += publicId;
  
  return url;
};

// Video URL builder
export const buildCloudinaryVideoUrl = (publicId, options = {}) => {
  const {
    cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    format = 'auto',
    quality = 'auto'
  } = options;

  let url = `${CLOUDINARY_BASE_URL}/${cloudName}/video/upload/`;
  
  const transformations = [];
  if (quality !== 'auto') transformations.push(`q_${quality}`);
  if (format !== 'auto') transformations.push(`f_${format}`);
  
  if (transformations.length > 0) {
    url += transformations.join(',') + '/';
  }
  
  url += publicId;
  
  return url;
};

// Lazy loading hook
export const useCloudinaryImage = (publicId, options = {}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    const img = new Image();
    
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError('Failed to load image');
    
    img.src = buildCloudinaryUrl(publicId, options);
  }, [publicId, options]);
  
  return { isLoaded, error };
};

// Optimized image component
export const CloudinaryImage = ({ 
  publicId, 
  alt, 
  className, 
  width, 
  height, 
  quality = 80,
  ...props 
}) => {
  const { isLoaded, error } = useCloudinaryImage(publicId, { width, height, quality });
  
  if (error) {
    return <div className={`cloudinary-error ${className}`}>Image failed to load</div>;
  }
  
  return (
    <img
      src={buildCloudinaryUrl(publicId, { width, height, quality })}
      alt={alt}
      className={`cloudinary-image ${className} ${isLoaded ? 'loaded' : 'loading'}`}
      style={{ 
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto'
      }}
      {...props}
    />
  );
};

// Optimized video component
export const CloudinaryVideo = ({ 
  publicId, 
  poster,
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  className,
  ...props 
}) => {
  const videoUrl = buildCloudinaryVideoUrl(publicId, { quality: 80 });
  const posterUrl = poster ? buildCloudinaryUrl(poster, { quality: 60 }) : null;
  
  return (
    <video
      src={videoUrl}
      poster={posterUrl}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      className={`cloudinary-video ${className}`}
      {...props}
    />
  );
};
