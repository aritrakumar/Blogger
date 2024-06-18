import {
    USERNAME_EXISTS,
    EMAIL_EXISTS,
    USERNAME_VALID,
    EMAIL_VALID,
    PASSWORD_VALID,
} from '../actions/types'

const INITIAL_STATE = {
    usernameExists: false,
    emailExists: false,
    usernameValid: false,
    emailValid: false,
    passwordValid: false,
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USERNAME_EXISTS:
            return {
                ...state,
                usernameExists: action.payload,
            }
        case EMAIL_EXISTS:
            return {
                ...state,
                emailExists: action.payload,
            }

        case USERNAME_VALID:
            return {
                ...state,
                usernameValid: action.payload,
            }
        case EMAIL_VALID:
            return {
                ...state,
                emailValid: action.payload,
            }
        case PASSWORD_VALID:
            return {
                ...state,
                passwordValid: action.payload,
            }
        default:
            return state
    }
}
