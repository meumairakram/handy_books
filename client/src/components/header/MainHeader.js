import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import {Link } from 'react-router-dom';
import HeaderSideNav from './nav/HeaderSideNav';


class MainHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showNav:false
        }
    }


    onChange = () => {
        this.setState({
            showNav: false
        })
    }


    openNav = function() {
        this.setState({
            showNav:true
        })
    }

    linkedClicked = () => {
        this.setState({
            showNav:false
        })

    }

  
    render() {
        return (
            <header>
                <div className="open_nav">
                    <FontAwesome name="bars" onClick={() => this.openNav()} style={{
                        color:'#FFF',
                        padding:'10px',
                        cursor:"pointer"
                    }} />
                   
                </div>

                <HeaderSideNav showNav={this.state.showNav} linkedClicked={this.linkedClicked}  hideNav={this.onChange} />

                <Link to="/" className="logo">
                        Books Project
                </Link>


            </header>
        )
    }
}


export default MainHeader
