// src/services/swapi.js
import axios from 'axios';

const BASE_URL = 'https://swapi.dev/api';

export const fetchPlanets = async (url = `${BASE_URL}/planets/`) => {
  try {
    
    const response = await axios.get(url);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching planets:', error);
    return null;
  }
};
