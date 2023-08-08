import axios from "axios";

// BUSCAR TODOS LOS PERSONAJES POR UBICACIÓN
export const obtenerPjPorUrl = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data; 
    return data; 
  } catch (error) {
    console.error("Error al obtener la ubicación:", error);
    return null; 
  }
};
