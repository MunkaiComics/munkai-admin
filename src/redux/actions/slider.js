import { sliderConstant } from '../constants'

export const slider = (val) => {
  return (dispatch) => {
    dispatch(slideChange(val))
  }

  function slideChange(val) {
    return { type: sliderConstant.SET, val }
  }
}
