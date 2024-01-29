import { unfoldableConstant } from '../constants'

export const unfoldable = (val) => {
  return (dispatch) => {
    dispatch(unfoldableChange(val))
  }

  function unfoldableChange(val) {
    return { type: unfoldableConstant.SET, val }
  }
}
