import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import { BiSolidDashboard, BiSolidUser } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { useState } from "react";

const AgentDashboard = () => {

    const [activePage, setActivePage] = useState('Dashboard')

    const sidebar_menu = [
        {
            icon: BiSolidDashboard,
            title: 'Dashboard',
            href: '/agent-dashboard'
        },
        {
            icon: FaUserFriends,
            title: 'Buyers',
            href: '/agent-dashboard/buyers'
        },
        {
            icon: BiSolidUser,
            title: 'Profile',
            href: '/agent-dashboard/profile'
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
 
export default AgentDashboard;