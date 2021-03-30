import { getCharacters } from "../../helpers/API"

export const getCharactersAction = (page: Number, query: String) => async (dispatch: any) => {
  try {
    const data = await getCharacters(page, query)

    dispatch({ type: "GET_CHARACTERS", payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const getCharactersByQueryAction = (page: Number, query: String) => async (dispatch: any) => {
  try {
    const data = await getCharacters(page, query)

    dispatch({ type: "GET_CHARACTERS_BY_QUERY", payload: data })
  } catch (error) {
    console.log(error.message)
  }
}