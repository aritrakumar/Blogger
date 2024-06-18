import { TAB_CHANGE } from '../actions/types'

const INITIAL_STATE = { index: 0 }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TAB_CHANGE:
            return { ...action.payload }
        default:
            return state
    }
}
