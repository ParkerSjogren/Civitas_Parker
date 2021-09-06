import { useState } from 'react';
import {Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
import { useContext } from "react"
import AuthenticationContext from "../../AuthenticationContext"
import './Navbar.css';

const Navbar = () => {
    const authContext = useContext(AuthenticationContext)

    console.log("Navbar authContext: ",authContext)
    
    const sidebarItems = [
        {
            title:'Home',
            path:'/',
            icon: <AiIcons.AiFillHome />,
            class_name:'nav-text'
        },
        {
            title:'Users',
            path:'/users',
            icon: <FiIcons.FiUsers/>,
            class_name:'nav-text'
        },
        {
            title:'User Level',
            path:'/user-level',
            icon: < FaIcons.FaUserCog  />,
            class_name:'nav-text'
        },
        {
            title:'Communities',
            path:'/communities',
            icon: <FiIcons.FiUsers />,
            class_name:'nav-text'
        }, 
        {
            title:'Members',
            path:'/members',
            icon: <FiIcons.FiUsers />,
            class_name:'nav-text'
        }  ,
        {
            title:'Pay For Membership',
            path:'/Pay',
            icon: <FaIcons.FaCcVisa />,
            class_name:'nav-text'
        },
        {   
            title:'Add Events',
            path:'/events',
            icon: < FaIcons.FaRegCalendarPlus />,
            class_name:'nav-text'
        },
        {   
            title:'Event Registration',
            path:'/eventRegistration',
            icon: < FaIcons.FaRegCalendarPlus />,
            class_name:'nav-text'
        },
        {   
            title:'Community Calendar',
            path:'/calendar',
            icon: <FaIcons.FaCalendar/>,
            class_name:'nav-text'
        },
        // {   
        //     title:'Upload Event Images',
        //     path:'/photos',
        //     icon: <FaIcons.FaRegImages/>,
        //     class_name:'nav-text'
        // },
    ]

    const [sidebar, setSidebar] = useState(false)

    const showSidebar = (e)=>{
        // console.log('click', e)
        setSidebar(!sidebar)
    }

    return (authContext.navbarAccess) ? 
        <div>
            <div className="navbar">
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active': 'nav-menu'}>
                <ul className= 'nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {sidebarItems.map((item, index)=> {
                        return(
                            <li key= {index} className={item.class_name}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
         
        </div>
        : null
}
 
export default Navbar;