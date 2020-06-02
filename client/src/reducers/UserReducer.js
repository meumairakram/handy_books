

export default function user(state = {},action) {

    switch(action.type) {

        case 'LOGIN_USER':
            return {...state,login:action.payload}
        case 'AUTH_USER':
            return {...state,login:action.payload}
        default:
            return state;
    }
} 