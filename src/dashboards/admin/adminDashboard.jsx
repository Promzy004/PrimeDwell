import { Outlet } from "react-router-dom";
import SideBar from "../components/sidebar";
import NavBar from "../components/navbar";
import { BiSolidDashboard, BiSolidUser } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { useState } from "react";

const AdminDashboard = () => {

    const [activePage, setActivePage] = useState('Dashboard')

    const sidebar_menu = [
        {
            icon: BiSolidDashboard,
            title: 'Dashboard',
            href: '/admin-dashboard'
        },
        {
            icon: FaUserFriends,
            title: 'Users',
            href: '/admin-dashboard/users'
        },
        {
            icon: BiSolidUser,
            title: 'Profile',
            href: '/admin-dashboard/profile'
        },
    ]

    return (
        <div className="pl-72">
            <SideBar menu={sidebar_menu} setActivePage={setActivePage} />
            <NavBar activePage={activePage} />
            <div className="px-14 mt-[96px]">
                <Outlet />
            </div>
        </div>
    );
}
 
export default AdminDashboard;