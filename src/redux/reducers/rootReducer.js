import { combineReducers } from 'redux'

import { authentication } from './auth'
import { sliderState } from './slider'
import { unfoldableState } from './unfoldable'

const rootReducer = combineReducers({
  authentication,
  sliderState,
  unfoldableState,
})

export default rootReducer
