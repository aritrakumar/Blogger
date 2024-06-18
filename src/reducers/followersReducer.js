import { FETCH_FOLLOWERS } from '../actions/types'

const INITIAL_STATE = []

const createNewState = action => {
    if (action.payload.length > 0) {
        return [...action.payload]
    }

    return []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_FOLLOWERS:
            return createNewState(action)
        default:
            return state
    }
}
