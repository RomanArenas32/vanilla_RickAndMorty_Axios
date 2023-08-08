import axios from "axios";

const baseUrl = "https://rickandmortyapi.com/api/location";


export const obtenerUbicaciones = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    const data = response.data;
    return data.results; 
  } catch (error) {
    console.error("Error al obtener los personajes:", error);
    return [];
  }
};
