import { FETCH_MOVIES, FILTER_MOVIES } from "../../../actionTypes";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FILTER_MOVIES:
      return [...payload];

    case FETCH_MOVIES:
      return [...state, ...payload];

    default:
      return state;
  }
}
