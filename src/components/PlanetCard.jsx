// src/components/PlanetCard.js
import React, { useState } from 'react';
import ResidentList from './ResidentList';

const PlanetCard = ({ planet }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (

    <div className="planet-container">
    <div className={`planet-card ${expanded ? 'active' : ''}`}>
      <div className="planet-card-header" onClick={toggleExpansion}>
        <h2>{planet.name}</h2>
        <span className='plus-button'>{expanded ? '-' : '+'}</span>
      </div>
      {expanded && (
        <div className="planet-card-body">
          <p><b>Climate:</b> {planet.climate}</p>
          <p><b>Population:</b> {planet.population}</p>
          <p><b>Terrain:</b> {planet.terrain}</p>
          <h3>Residents:</h3>
          <ResidentList residents={planet.residents} />
        </div>
      )}
    </div>
    </div>
  );
};

export default PlanetCard;
