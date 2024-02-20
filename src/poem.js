import React from "react";
import './App.css'; // Stil dosyanızın yolu

const Poem = () => {
    return (
      <div>
        <div className="stanza stanza1">
            <p>Bahar mezarına gömsünler sizi</p>
            <p>Yapraklar gibi buluştunuzdu</p>
            <p>Kokular gibi seviştinizdi</p>
            <p>Bahar mezarına gömsünler sizi</p>
        </div>

        <div className="stanza stanza2">
            <p>Yaz mezarına gömsünler sizi</p>
            <p>İlk kezmiş gibi buluştunuzdu</p>
            <p>Son kezmiş gibi seviştinizdi</p>
            <p>Yaz mezarına gömsünler sizi</p>
        </div>

        <div className="stanza stanza3">
            <p>Güz mezarına gömsünler sizi</p>
            <p>Salkımlar gibi buluştunuzdu</p>
            <p>Ağular gibi seviştinizdi</p>
            <p>Güz mezarına gömsünler sizi</p>
        </div>
        <div className="stanza stanza4">
            <p>Cemal Süreya</p>
        </div>
      </div>
    );
  };
  
  export default Poem;
