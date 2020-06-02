

export default function books(state = {},action) {

    switch(action.type) {
        case 'GET_ALL_BOOKS':
            return action.payload;

        case 'GET_BOOK_WITH_REVIEWER':
            return {
                ...state,
                info:action.payload.book,
                reviewer:action.payload.user
            };
        case 'ADD_BOOK':            
            return {
                ...state,
                new_book:action.payload
            }
        case 'REVIEWS_BY_OWNER':
            return {
                ...state,
                reviews:action.payload
            }
        case 'UPDATE_BOOK':
            return {
                ...state,
                info:action.payload
            }

        
        default:
            return state;
        
    }
} 
