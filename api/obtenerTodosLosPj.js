import axios from "axios";

const baseUrl = "https://rickandmortyapi.com/api/character";

//BUSCAR TODOS LOS PERSONAJES
export const obtenerTodosLosPj = async () => {
    
    try {
        const response = await axios.get(`${baseUrl}`);
        const data = response.data;
        return data.info;
      } catch (error) {
        console.error("Error al obtener los personajes:", error);
        return []; 
      }


};
