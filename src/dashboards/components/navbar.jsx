import { CiSearch } from "react-icons/ci";

const NavBar = ({activePage}) => {
    return (
        <nav className="fixed z-10 pl-[344px] top-0 left-0  w-full h-14 px-[56px] bg-white drop-shadow-md flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{activePage}</h2>
            <label className="w-72 px-3 py-1 border-[1.5px] border-primaryColor flex items-center gap-2 rounded-md ">
                <CiSearch className="text-primaryColor text-lg font-bold" />
                <input type="search" name="" id="" placeholder="Serach Property" className="focus:outline-none" />
            </label>
        </nav>
    );
}
 
export default NavBar;