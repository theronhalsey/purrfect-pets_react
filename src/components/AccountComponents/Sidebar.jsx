import React from "react";
import './Account.scss'
import ProfilePic from '../../assets/ProfilePic.png'
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';




function SideBar(){


    const sideBarItems = [
        {
            title: "Home",
            icon: <HomeIcon/>,
            link: "/App"

        },
        {
            title: "Account",
            icon : <AccountBoxIcon/>,
            link: "/Account"

        },
        
        {
            title: "Likes",
            icon: <FavoriteIcon/>,
            link: '/Likes'

        },
        {
            title: "Help",
            icon: <HelpIcon/>,
            link:'/Help'

        },
        {
            title: "Logout",
            icon: <LogoutIcon/>,
            link: '/'

        }

    ]

    return(
        <div className="sideBar">

            <ul className="list-group">
                {sideBarItems.map((val,key)=>{
                    return(
                        <li key = {key} 
                        className="list-item"
                        id = {window.location.pathname == val.link? "active": ""}
                        onClick={() => {
                            window.location.pathname = val.link
                            //logs the user out
                            if (val.link == '/'){
                                sessionStorage.clear()
                            }
                        }}>

                            <div id="icon">{val.icon}</div>
                            <div id = 'title'>{val.title}</div>
                            </li>
                    )
                })}
            </ul>
            
        </div>
    )
}

export default SideBar