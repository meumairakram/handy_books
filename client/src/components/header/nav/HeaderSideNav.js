

import React,{Component} from 'react'
import SideNav from 'react-simple-sidenav';
import SideNavItems from './SideNavItems';
class HeaderSideNav extends Component {



    render() {
        return (
            <SideNav showNav={this.props.showNav} navStyle={{backgroundColor:'#222222'}} titleStyle={{backgroundColor:' #0495a8'}}  title="BookShelf Menu" onHideNav={this.props.hideNav}>
                <SideNavItems linkClicked={this.props.linkedClicked} />
            </SideNav>
            
        )
    }

}

export default HeaderSideNav
