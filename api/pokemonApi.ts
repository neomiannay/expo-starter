import axios from "axios";

const API_URL = "https://tyradex.app/api/v1/pokemon/";

export const fetchPokemonByName = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    throw error;
  }
};
