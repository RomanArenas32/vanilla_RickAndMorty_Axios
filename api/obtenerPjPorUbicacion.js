import axios from "axios";

// BUSCAR TODOS LOS PERSONAJES POR UBICACIÓN
export const obtenerPjPorUbicacion = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data; 
    return data.residents; 
  } catch (error) {
    console.error("Error al obtener la ubicación:", error);
    return null; 
  }
};
