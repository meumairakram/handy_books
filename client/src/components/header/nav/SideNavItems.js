import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const SideNavItems = props => {
    
    const items = [
        {
            type:"navItem",
            icon:"home",
            text:"Home",
            link:"/",
            restricted:false
        },
        {
            type:"navItem",
            icon:"user-circle",
            text:"My Profile",
            link:"/user",
            restricted:false
        },
        {
            type:"navItem",
            icon:"address-card-o",
            text:"Add Admins",
            link:"/user/register",
            restricted:false
        },
        {
            type:"navItem",
            icon:"sign-in",
            text:"Login",
            link:"/login",
            restricted:false
        },
        {
            type:"navItem",
            icon:"user-o",
            text:"My Reviews",
            link:"/user/my_reviews",
            restricted:false
        },
        {
            type:"navItem",
            icon:"plus-square-o",
            text:"Add Reviews",
            link:"/user/add",
            restricted:false
        },
        {
            type:"navItem",
            icon:"sign-out",
            text:"Logout",
            link:"/logout",
            restricted:false
        }
    ];

    const Element = (item,i) => {
        return (

        
        <div key={i} className={item.type}>
            <Link to={item.link} onClick={props.linkClicked}>
                <FontAwesome name={item.icon} /> 
                {item.text}
            </Link>
            
        </div>

        )       

    }


    const renderSideNavItems = () => {
        return items.map((item,i) => {
            return Element(item,i);
        });
    }



    return (
        <div>
            {renderSideNavItems()}
        </div>
        
    )

}


export default SideNavItems;
