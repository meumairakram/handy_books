import React from 'react';
import axios from 'axios';

const Logout = props => {
    console.log(props);
    let request = axios.get('/api/logout')  
                    .then(({data}) => {
                        setTimeout(() => {
                            props.history.push('/');
                        },1000);
                    });

    return (
        <div className="logout_container">
            <h1> Good Bye! See you soon... </h1>            
        </div>
    )
    
    
}

export default Logout;
