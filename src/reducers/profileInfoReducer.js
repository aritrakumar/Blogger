import {
    FETCH_PROFILE_INFO,
    START_FOLLOWING,
    STOP_FOLLOWING,
} from '../actions/types'

const INITIAL_STATE = {}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_PROFILE_INFO:
            return { ...state, ...action.payload }
        case START_FOLLOWING:
            return { ...state, ...action.payload }
        case STOP_FOLLOWING:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
