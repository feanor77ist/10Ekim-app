import React from 'react';
import videoSource from "./images/short2.mp4";

// Video bileşeni
const Video = React.forwardRef(({ src, onVideoLoad, onVideoEnd, onVideoPlay }, ref) => (
    <div className="video-container">
      <div className="video-overlay"></div>
        <video 
          autoPlay 
          loop 
          muted 
          onLoadedMetadata={(e) => {
            onVideoLoad && onVideoLoad(e);
            e.target.playbackRate = 0.5; // <-- VİDEO HIZINI %75’YE DÜŞÜRÜR
          }} 
          onEnded={onVideoEnd}
          onPlay={onVideoPlay}
          ref={ref}
        >
          <source src={videoSource} type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>
    </div>
  ));

  export default Video;