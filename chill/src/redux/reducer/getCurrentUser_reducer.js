export default function getCurrentUserReducer(state = {}, action) {
  switch (action.type) {
    case "USER_DATA":
      return action.payload;
    default:
      return state;
  }
}
