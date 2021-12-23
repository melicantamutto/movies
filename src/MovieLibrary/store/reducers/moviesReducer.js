import {FETCH_MOVIES} from '../../../actionTypes'

const initialState = []

export default function (state = initialState, action) {
  const {type, payload} = action
  switch (type) {

    case FETCH_MOVIES:
      return [...initialState, ...payload]

    default:
      return state
  }
}
