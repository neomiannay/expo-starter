import axios from "axios";

const API_URL = "https://api.tcgdex.net/v2/fr/cards?name=eq:";

export const fetchPokemonCardByName = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    throw error;
  }
};