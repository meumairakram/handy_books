import React, {Component} from 'react';
import {connect} from 'react-redux';

import {checkAuth} from '../actions';


export function Auth(ComposedClass,reload = false) {

    class Auth extends Component {

        constructor(props) {
            super(props);
            this.state = {
                loading:true
            }
        }

        componentDidMount() {
            this.props.dispatch(checkAuth());
        }


        componentDidUpdate(prevProps, prevState,snapshopt) {
            if(prevState.loading) {
                this.setState({
                    loading:false
                })
            }
            let user = this.props.user;
            if(user.login) {

                if(user.login.isAuth && reload == null) {
                    this.props.history.push('/');
                }

                if(!user.login.isAuth && reload == true){
                   this.props.history.push('/login')
                }
            }
        }


        render() {
            let user = this.props.user;

            if(this.state.loading) {                
                return <div className="loader">Loading...</div>
                
            } else {
                if(user.login.isAuth){
                    return <ComposedClass {...this.props} />    
                } else {
                    return <ComposedClass />    
                }
            }

            
        }
    }

    function mapStateToProps(state) {
        return {
            user:state.user
        }
    }
 

    return connect(mapStateToProps)(Auth);

}


