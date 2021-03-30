export const charactersReducer = (state = { charactersList: [] }, action: any) => {
  switch (action.type) {
    case "GET_CHARACTERS":
      return {
        charactersList: [...state.charactersList, ...action.payload.results],
        charactersData: action.payload
      }
    case "GET_CHARACTERS_BY_QUERY":
      return {
        charactersList: [...action.payload.results],
        charactersData: action.payload
      }
    default:
      return state
  }
}