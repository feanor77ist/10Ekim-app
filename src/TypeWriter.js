
import React from 'react';
import Typewriter from 'typewriter-effect';

const MyTypewriter = () => {
  return (
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
            .typeString('ANKARA\'DAYMIŞ <span class="highlight-gradient">BARIŞ</span>')
            .pauseFor(2000)       
            
            // Yavaş silme efekti
            .deleteChars(10)
            .pauseFor(800)
            .typeString('<span> </span><span class="highlight-gradient">BARIŞ</span>')
            .pauseFor(1400)
            
            // Hızlı silme
            .deleteChars(6)
            .pauseFor(400)
            .typeString('<span> </span><span class="highlight-gradient">MIYDI</span>BARIŞ ?')
            .pauseFor(1800)
            
            // Dramatik silme
            .deleteAll()
            .pauseFor(1000)
            
            // Yeni metin: Farklı timing
            .typeString('<span class="highlight-gradient">10 EKİM</span> 2015\'DE NE OLDU?')
            .pauseFor(2200)
            
            // Alt yazı: Yavaş ve zarif
            .typeString('<br><span class="typewriter-subtitle">hasret ve saygıyla...</span>')
            .pauseFor(3000)
            .start();
      }}
    />
  );
};

export default MyTypewriter;
