import axios from "axios";

const baseUrl = "https://rickandmortyapi.com/api/character/";

//BUSCAR TODOS LOS PERSONAJES
export const obtenerPjPorNombre = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}`);
    const data = response.data;
    const resultado = data.results;
    const resultadoByName = resultado.filter(el => el.name == id)
    return resultadoByName
    
  } catch (error) {
    console.error("Error al obtener los personajes:", error);
    return []; 
  }
};
