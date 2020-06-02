import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';

// calling reducers
import rootReducer from './reducers';

// Call routes
import Routes from './Routes';


const createStoreWithMiddleware = applyMiddleware(reduxThunk,promiseMiddleware)(createStore);

const App = function() {

    return (
        <Provider store={createStoreWithMiddleware(rootReducer)}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>

    )

}

ReactDOM.render(<App />, document.getElementById('root'));