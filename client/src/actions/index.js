import axios from 'axios';


export function getBooks(
    limit = 10,
    offset = 0 ,
    currentProps = ''
) {

    const request = axios.get(`/api/getAllBooks?limit=${limit}&offset=${offset}`)
                    .then((response) => { 
                        if(currentProps === '') {
                            return    response.data ;
                        } else {
                            return [...currentProps,...response.data];
                        }
                        
                    
                    })

    return {
        type: "GET_ALL_BOOKS",
        payload:request
    }
}



export function getBookWithReviewer(
        book_id = ''
) {

    if(book_id !== '') {
        const request = axios.get(`/api/getBook?id=${book_id}`)
        return (dispatch) => {
            
            request.then((response) => {
               let book = response.data;

            
                let userRequest = axios.get(`/api/getReviewer/?user=${book.ownerId}`);

                userRequest.then((reviewer) => {
                
                let user = reviewer.data;
                dispatch({
                        type:'GET_BOOK_WITH_REVIEWER',
                        payload:{book,user}
                    });

                })

            });
            

        }


    }


}


export function clearBookEdit() {

    return {
        type:'GET_BOOK_WITH_REVIEWER',
        payload:{book:{},user:{}}
    }


}


export function updateBook(updatedValues) {

    const request = axios.post(`/api/updateBook`,updatedValues);

    return (dispatch) => {
        request.then(({data}) => {
            dispatch({
                type:"UPDATE_BOOK",
                payload:data
            })
        })
    }


} 



/*===================== USER FUNTIONS ==============*/

export function loginUser({email,password}) {

    const request = axios.post(`/api/login`,{email,password})
    
                    .then(({data}) => {
                        return data;
                    });

    return {
        type:"LOGIN_USER",
        payload: request
    }


}



export function checkAuth() {

    const request = axios('/api/auth')
                    .then(({data}) => {
                        return data;
                    })

    return {
        type:'AUTH_USER',
        payload:request
    }
    

}




export function addBook(values) {

    const request = axios.post('/api/book',values)
                    .then(({data}) => {
                        return data;
                    })

    return {
        type:'ADD_BOOK',
        payload:request
    }
    
}


export function getReviews(ownerId) {

    const request = axios.post('/api/getBooksByOwner',{ownerid:ownerId})

    return (dispatch) => {

        request.then((response) => {

            dispatch({
                type:'REVIEWS_BY_OWNER',
                payload:response.data
            });

        });
        
       

    }


}