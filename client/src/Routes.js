import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom';

import Home from './components/home';
import SingleBook from './components/single-book/SingleBook';
import PageLayout from './hoc/Layout';
import LoginUser from './containers/LoginUser';
import User from './components/Admin/User';
import AddReviews from './components/Admin/AddReviews';
import MyReviews from './components/Admin/MyReviews';
import EditBook from './components/Admin/EditBook';
import Logout from './components/Logout';
import {Auth} from './hoc/Auth';


class Routes extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <PageLayout>
                <Switch>
                    <Route path="/" exact component={Auth(Home)} />
                    <Route path="/login" exact component={Auth(LoginUser,null)} />
                    <Route path="/logout" exact component={Auth(Logout,true)} />
                    <Route path="/books/:id" exact component={Auth(SingleBook,true)} />
                    <Route path="/user" exact component={Auth(User,true)} />
                    <Route path="/user/add" exact component={Auth(AddReviews,true)} />
                    <Route path="/user/my_reviews" exact component={Auth(MyReviews,true)} />
                    <Route path="/user/edit/:id" exact component={Auth(EditBook,true)} />
                </Switch>
            </PageLayout>
        )
    }
}


export default Routes;
