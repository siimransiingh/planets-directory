// src/App.js
import React, { useState, useEffect } from 'react';
import { fetchPlanets } from './service/Swapi';
import PlanetCard from './components/PlanetCard';
import SolarSystemBackground from './components/SolarSystem';

function App() {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [page, setPage] = useState(1); 
  const cardsPerPage = 2; 

  useEffect(() => {
    const fetchPlanetsData = async () => {
      const data = await fetchPlanets();
      if (data) {
        setPlanets(data.results);
        setNextPage(data.next);
      }
    };

    fetchPlanetsData();
  }, []);

  const handleNextPage = async () => {
    if (nextPage) {
      const data = await fetchPlanets(nextPage);
      if (data) {
        setPlanets(prevPlanets => [...prevPlanets, ...data.results]);
        setNextPage(data.next);
        setPage(prevPage => prevPage + 1);
      }
    }
  };

  const handleRestart = async () => {
    setPage(1);
    const data = await fetchPlanets();
    if (data) {
      setPlanets(data.results);
      setNextPage(data.next);
    }
  };
  
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const visiblePlanets = planets.slice(startIndex, endIndex);

  return (
    <div className="app-container">
      <div className="content">
        <SolarSystemBackground />
        <h1 className='anta-regular'>Star Wars Planets Directory</h1>
        <div className="planet-container">
          {visiblePlanets.map(planet => (
            <PlanetCard key={planet.url} planet={planet} />
          ))}
        </div>
        {nextPage ? (
          <button className='load-button' onClick={handleNextPage}>Load More</button>
        ) : (
          <button className='load-button' onClick={handleRestart}>Restart</button>
        )}
      </div>
    </div>
  );
}
export default App;
