import React from "react";
import Poem from './poem';

const Poetry = ({ isVisible }) => {
    const containerClasses = `poetry-container ${isVisible ? 'visible' : ''}`;
  
    return (
      <div className={containerClasses}>
        <Poem />
      </div>
    );
  };

  export default Poetry;