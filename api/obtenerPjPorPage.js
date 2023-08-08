import axios from "axios";

const baseUrl = "https://rickandmortyapi.com/api/character";

//BUSCAR TODOS LOS PERSONAJES
export const obtenerPjPorPagina = async (page) => {
  try {
    const response = await axios.get(`${baseUrl}?page=${page}`);
    const data = response.data;
    return data.results;
  } catch (error) {
    console.error("Error al obtener los personajes:", error);
    return []; 
  }
};
