import { unfoldableConstant } from '../constants'

const initialState = {
  unfoldable: false,
}

export const unfoldableState = (state = initialState, action) => {
  switch (action.type) {
    case unfoldableConstant.SET:
      return {
        unfoldable: action.val,
      }
    default:
      return state
  }
}
