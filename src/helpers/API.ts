import axios from "axios"

export const getCharacters = async (page: Number = 1, query: String = "") => {
  const { data } = await axios.get(`https://swapi.dev/api/people/?page=${page}&search=${query}`)
  return data
}
