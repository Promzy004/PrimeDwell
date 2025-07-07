import { href, Link, useLocation } from 'react-router-dom';
import logo from '../../assets/icons/brand_icon.svg'
import { MdLogout } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { BiSolidDashboard, BiSolidUser } from 'react-icons/bi';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';

const SideBar = ({menu, setActivePage}) => {

    const { user, logout } = useContext(AuthContext)

    //click event that handles each menu been clicked
    const handleClick = (page) => {

        // set the active page so as to use it in the dashboard to show name of active page on navbar
        setActivePage(page)

        //save title for clicked in item in menu to session storage
        sessionStorage.getItem('currentPage', page)
    }

    useEffect(() => {
        //retrieve title for last clicked item in the menu, so as to use that in the navbar
        const savedPage = sessionStorage.getItem('currentPage')
        if(savedPage) {
            //add saved page to the set state
            setActivePage(savedPage)
        }
    },[])

    //get the path name of the location 
    const { pathname } = useLocation()

    const sidebar_menu = menu


    return (
        <div className='w-72 h-screen z-20 fixed left-0 top-0 bg-white drop-shadow-md flex flex-col justify-between py-10 px-8'>
            <div className='flex flex-col gap-16'>
                <img src={logo} alt="" className='w-48 self-center' />
                <div className='flex flex-col gap-1'>
                    {sidebar_menu.map((menu,index) => {
                        const Icon = menu.icon
                        return(
                            <Link to={menu.href} onClick={() => handleClick((menu.title).toUpperCase())} key={index} className={`flex gap-2 px-4 duration-100 py-2 rounded-md ${pathname == menu.href ? 'bg-active-navlink text-white items-center' : 'text-[#828B92] hover:bg-primaryColor/15'}`}>
                                <Icon className='text-2xl'/>
                                <span className='text-lg'>{menu.title}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <button onClick={logout} className='flex gap-2 items-center text-[#B41C11]'>
                <MdLogout />
                Log out
            </button>
        </div>
    );
}
 
export default SideBar;