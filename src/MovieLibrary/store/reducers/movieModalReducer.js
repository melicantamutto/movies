import { MOVIE_MODAL, ERASE_MOVIE_MODAL } from "../../../actionTypes";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case MOVIE_MODAL:
      return payload;
    case ERASE_MOVIE_MODAL:
      return payload;

    default:
      return state;
  }
}
