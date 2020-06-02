import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../actions';


class LoginUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            password:'',
            error:''
        }
    }


    onChangeHandler = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })

    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.dispatch(loginUser(this.state));
       
    }

    componentDidUpdate(prevProps,prevState,snapshot) {

        if(this.props.user.login) {
            if(this.props.user.login.isAuth) {
                this.props.history.push('/user');
            }
            
        }
    }

    render() {
        // console.log(this.props);
        let user = this.props.user;
        return (
           <div className="rl_container">
               <form onSubmit={this.submitHandler}>
                    <h2>Login Here</h2>
                    
                    <div className="form_element">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={this.state.email}
                            onChange={this.onChangeHandler}
                        />
                    </div>


                    <div className="form_element">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChangeHandler}
                        />
                    </div>

                    <button>Login</button>

                    <div className="error">
                        {
                            user.login ? 
                            <div>{user.login.error}</div> 
                            : null
                        } 
                    </div>


               </form>
           </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        user: state.user
    }

}

export default connect(mapStateToProps)(LoginUser);
