
import React from 'react';
import Typewriter from 'typewriter-effect';

const MyTypewriter = () => {
  return (
    <div translate="no" className="notranslate">
      <Typewriter
        options={{
          loop: true,
          delay: 60, // Daha hızlı yazım
          deleteSpeed: 30, // Daha hızlı silme
          html: true,
          cursor: '<span class="custom-cursor">|</span>', // Özel cursor
          autoStart: true,
          skipAddStyles: true, // Kendi stillerimizi kullan
        }}
        onInit={(typewriter) => {
          typewriter
              // İlk blok: Hızlı başlangıç
              .pauseFor(600)
              .typeString('ANKARA&#39;DAYMI&#350; <span class="highlight-gradient">BARI&#350;</span>')
              .pauseFor(2000)       
              
              // Yavaş silme efekti
              .deleteChars(10)
              .pauseFor(800)
              .typeString('<span> </span><span class="highlight-gradient">BARI&#350;</span>')
              .pauseFor(1400)
              
              // Hızlı silme
              .deleteChars(6)
              .pauseFor(400)
              .typeString('<span> </span><span class="highlight-gradient">MIYDI</span>BARI&#350; ?')
              .pauseFor(1800)
              
              // Dramatik silme
              .deleteAll()
              .pauseFor(1000)
              
              // Yeni metin: Farklı timing
              .typeString('<span class="highlight-gradient">10 Ekim</span> 2015&#39;te ne oldu?')
              .pauseFor(2200)
              
              // Alt yazı: Yavaş ve zarif
              .typeString('<br><span class="typewriter-subtitle">hasret ve saygıyla...</span>')
              .pauseFor(3000)
              .start();
        }}
      />
    </div>
  );
};

export default MyTypewriter;
