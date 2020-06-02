import React, { Component } from 'react'

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        console.log(this.props);
        let user = this.props.user.login;
        return (
            <div className="user_container">
                <div className="avatar">
                    <img alt="avatar" src="/images/avatar.png" />
                </div>
                <div className="nfo">
                    <div><span>Firstname:</span> {user.name} </div>
                    <div><span>Email:</span> {user.email} </div>
                </div>
            </div>
        )
    }
}


export default User;
