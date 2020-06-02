import React, { Component } from 'react'
import MainHeader from '../components/header/MainHeader';

class PageLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
           <div className="">
                <MainHeader />
                {this.props.children}

           </div>
        )
    }
}


export default PageLayout
