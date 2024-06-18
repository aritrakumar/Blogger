import { FETCH_POSTS, CREATE_POST } from '../actions/types'

const INITIAL_STATE = []

const createNewState = action => {
    if (action.payload.length > 0) {
        return [...action.payload]
    }

    return []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return createNewState(action)
        case CREATE_POST:
            return state
        default:
            return state
    }
}
