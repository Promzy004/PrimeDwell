import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import { BiSolidDashboard, BiSolidUser } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { useContext, useState } from "react";
import { BuyerContext } from "../../context/buyerContext";
import PropertyImagePreview from "./components/propertyImagePreview";

const BuyerDashboard = () => {

    const [activePage, setActivePage] = useState('Dashboard')

    //get the proprty image preview value so as to show preview if true and close preview if false
    const { propertyImagePreview } = useContext(BuyerContext)

    const sidebar_menu = [
        {
            icon: BiSolidDashboard,
            title: 'Dashboard',
            href: '/buyer-dashboard'
        },
        {
            icon: FaUserFriends,
            title: 'Contacts',
            href: '/buyer-dashboard/contact'
        },
        {
            icon: BiSolidUser,
            title: 'Favorite',
            href: '/buyer-dashboard/favorite'
        },
        {
            icon: BiSolidUser,
            title: 'Agents',
            href: '/buyer-dashboard/agent-details'
        },
        {
            icon: BiSolidUser,
            title: 'Profile',
            href: '/buyer-dashboard/profile'
        },
    ]

    return (
        <div className="pl-72">
            {propertyImagePreview.length > 0 && (
                <PropertyImagePreview />
            )}
            <SideBar menu={sidebar_menu} setActivePage={setActivePage} />
            <NavBar activePage={activePage} />
            <div className="px-14 mt-[96px]">
                <Outlet />
            </div>
        </div>
    );
}
 
export default BuyerDashboard;