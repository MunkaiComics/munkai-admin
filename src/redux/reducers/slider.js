import { sliderConstant } from '../constants'

const initialState = {
  sidebarShow: true,
}

export const sliderState = (state = initialState, action) => {
  switch (action.type) {
    case sliderConstant.SET:
      return {
        sidebarShow: action.val,
      }
    default:
      return state
  }
}
