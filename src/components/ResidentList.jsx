// src/components/ResidentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResidentList = ({ residents }) => {
  const [residentData, setResidentData] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const residentPromises = residents.map(async residentUrl => {
        const response = await axios.get(residentUrl);
        return response.data;
      });
      const residentInfo = await Promise.all(residentPromises);
      setResidentData(residentInfo);
    };

    fetchResidents();
  }, [residents]);

  return (
    <ul>
      {residentData.map(resident => (
        <li key={resident.url}>
          {resident.name} - Height: {resident.height}, Mass: {resident.mass}, Gender: {resident.gender}
        </li>
      ))}
    </ul>
  );
};

export default ResidentList;
