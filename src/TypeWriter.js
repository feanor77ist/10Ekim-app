import React from 'react';
import Typewriter from 'typewriter-effect';

const MyTypewriter = () => {
  return (
    <Typewriter
      options={{
        loop: true,
        delay: 25,
      }}
      onInit={(typewriter) => {
        typewriter
            .pauseFor(2000)
            .typeString('ANKARA\'DAYMIŞ <span style="background-color: #a8876e;">BARIŞ</span>')
            .pauseFor(2000)           
            .deleteChars(10)
            .pauseFor(1000)
            .typeString('<span> </span><span style="background-color: #a8876e;">BARIŞ</span>')
            .pauseFor(1000)
            .deleteChars(5)
            .pauseFor(1000)
            .typeString('<span> </span><span style="background-color: #a8876e;">MIYDI</span> BARIŞ ?')
            .pauseFor(2000)
            .start();
      }}
    />
  );
};

export default MyTypewriter;
