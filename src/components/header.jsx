import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaPhone } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { pages } from "../assets/data/data";
import brand_logo from "../assets/icons/brand_icon.svg"
import { AuthContext } from "../context/authContext";
import { MdLogout } from "react-icons/md";

const Header = () => {

    const [breakPoint, setBreakPoint] = useState(window.innerWidth < 768);
    const [navlinks, setNavLinks] = useState(false);

    const { user, logout } = useContext(AuthContext)
    console.log(user)

    useEffect(() => {

        const handleResize = () => {
            if(window.innerWidth < 768){
                setBreakPoint(true);
            } else {
                setBreakPoint(false);
            }
        }

        window.addEventListener('resize', handleResize)
    })

    let start = 0
    const handleTouchStart = (e) => {
        start = e.touches[0].clientX
    }

    const handleTouchMove = (e) => {
        const stop = e.touches[0].clientX
        const total = stop - start
        console.log(total)
        if(total < 50) setNavLinks(false)
    }

    return (
        <header className="fixed top-0 w-full bg-white z-40">
            {
                !breakPoint && (
                    <>
                        <div className="flex justify-between py-2 lg:px-36 px-10 bg-primaryColor text-white">
                            <div className="flex justify-center items-center gap-5">
                                <a href="mailto:" className="flex justify-center items-center gap-2">
                                    <FaTelegramPlane className="text-2xl" />
                                    <span className="font-light">mail.uremail.com</span>
                                </a>
                                <a href="tel:+" className="flex justify-center items-center gap-2">
                                    <FaPhone className="text-xl" />
                                    <span className="font-light">mail.uremail.com</span>
                                </a>
                            </div>
                            <div>
                                {user ? 
                                    <span className="flex justify-center items-center gap-2">
                                        <img src={user.profile_image} alt="" className="h-8 rounded-full" />
                                        <span>Hi, {user.firstname}</span>
                                    </span>
                                    :
                                    <Link to="/register" className="flex justify-center items-center gap-2">
                                        <FaUser className="text-xl" />
                                        <span className="font-light">Login/Signup</span>
                                    </Link>
                                }
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-4 lg:px-36 px-10">
                            <Link to='/'>
                                <img src={brand_logo} alt="" className="w-40" />
                            </Link>
                            <nav className="flex lg:gap-7 gap-4 items-center justify-center">
                                <Link to="/" className="hover:text-primaryColor duration-300" onClick={() => setNavLinks(false)}>Home</Link>
                                {/* <Link to="/about" className="hover:text-primaryColor duration-300" onClick={() => setNavLinks(false)}>About Us</Link> */}
                                {/* <Link to="/agent-dashboard" className="hover:text-primaryColor duration-300" onClick={() => setNavLinks(false)}>Dashboard</Link> */}
                                <Link to="/properties" className="hover:text-primaryColor duration-300" onClick={() => setNavLinks(false)}>Properties</Link>
                                <Link to="/agents" className="hover:text-primaryColor duration-300" onClick={() => setNavLinks(false)}>Agents</Link>
                                {/* <Link to="/pages" className="hover:text-primaryColor duration-300" onClick={() => setNavLinks(false)}>Pages</Link>
                                <Link to="/contact" className="hover:text-primaryColor duration-300" onClick={() => setNavLinks(false)}>Contact Us</Link> */}
                                <div className="bg-primaryColor p-2 cursor-pointer" onClick={() => setNavLinks(!navlinks)}>
                                    <FiMenu className="text-xl text-white"/>
                                </div>
                            </nav>
                        </div>
            

                        <AnimatePresence>
                            {
                                navlinks && (
                                    <motion.div 
                                        className="pl-5 pr-32 py-5 absolute lg:right-36 right-10 flex flex-col gap-5 bg-white"
                                        initial={{scaleY: 0, opacity: 0, originY: 0}}
                                        animate={{scaleY: 1, opacity: 1}}
                                        transition={{type: 'tween'}}
                                        exit={{scaleY: 0, opacity: 0, originY: 0}}
                                    >
                                        <div className="h-[2px] absolute top-0 left-0 w-full bg-primaryColor"></div>
                                        <div className="flex flex-col gap-1">
                                            {/* {pages.filter(page => (page.name !== 'Home') && (page.name !== 'Property') && (page.name !== 'Contact Us') && (page.name !== 'About Us')).map((page, index) => (
                                                <Link to={`/${page.path}`} onClick={() => setNavLinks(false)} key={index} className="hover:text-primaryColor py-3 hover:pl-3 hover:pr-0 pr-3 duration-300" >{page.name}</Link>
                                            ))} */}
                                            <Link to='/agents' onClick={() => setNavLinks(false)} className="hover:text-primaryColor py-3 hover:pl-3 hover:pr-0 pr-3 duration-300" >Agency</Link>
                                            <Link to='/testimonials' onClick={() => setNavLinks(false)} className="hover:text-primaryColor py-3 hover:pl-3 hover:pr-0 pr-3 duration-300" >Testimonials</Link>
                                            <Link to='/blogs' onClick={() => setNavLinks(false)} className="hover:text-primaryColor py-3 hover:pl-3 hover:pr-0 pr-3 duration-300" >Blogs</Link>
                                            <Link to='/pricing' onClick={() => setNavLinks(false)} className="hover:text-primaryColor py-3 hover:pl-3 hover:pr-0 pr-3 duration-300" >Pricing</Link>
                                            <Link to='/services' onClick={() => setNavLinks(false)} className="hover:text-primaryColor py-3 hover:pl-3 hover:pr-0 pr-3 duration-300" >Services</Link>
                                            <Link to='/faqs' onClick={() => setNavLinks(false)} className="hover:text-primaryColor py-3 hover:pl-3 hover:pr-0 pr-3 duration-300" >FAQs</Link>

                                            {user ? 
                                                <button onClick={logout} className='flex gap-2 items-center text-[#B41C11] py-3 pt-5 pr-3 duration-300'>
                                                    <MdLogout />
                                                    Log out
                                                </button>
                                                :
                                                <span className="flex flex-col gap-1">
                                                    <Link to='/login' onClick={() => setNavLinks(false)} className="hover:text-primaryColor py-3 hover:pl-3 hover:pr-0 pr-3 duration-300" >login</Link>
                                                    <Link to='/register' onClick={() => setNavLinks(false)} className="hover:text-primaryColor py-3 hover:pl-3 hover:pr-0 pr-3 duration-300" >SignUp</Link>
                                                </span>
                                            }
                                        </div>
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </>
                )
            }

            {
                breakPoint && (
                    <>
                        <div className="flex justify-between py-2 sm:px-20 px-5 bg-primaryColor text-white">
                            <a href="mailto:promiseedwin242@gmail.com" className="flex justify-center items-center gap-2">
                                <FaTelegramPlane className="sm:text-2xl text-lg" />
                                <span className="font-light sm:text-sm text-xs">mail.uremail.com</span>
                            </a>
                            <a href="tel:" className="flex justify-center items-center gap-2">
                                <FaPhone className="sm:text-xl text-base" />
                                <span className="font-light sm:text-sm text-xs">mail.uremail.com</span>
                            </a>
                        </div>
                        <div className="flex justify-between items-center py-4 sm:px-20 px-5">
                            <Link to="/">Brand name</Link>
                            <nav className="flex lg:gap-7 gap-4 items-center justify-center">
                                <div className="bg-primaryColor p-2 cursor-pointer" onClick={() => setNavLinks(!navlinks)}>
                                    <FiMenu className="text-xl text-white"/>
                                </div>
                            </nav>
                        </div>


                        <AnimatePresence>
                            {
                                navlinks && (
                                    <motion.div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} className="pl-5 py-5 sm:w-[40%] w-[60%] absolute sm:h-auto h-[calc(100vh-90px)] scrol sm:right-20 right-0 flex flex-col gap-5 bg-white"
                                        initial={{x: '100vw', opacity: 0}}
                                        animate={{x: 0, opacity: 1}}
                                        transition={{type: 'tween', duration: 0.4}}
                                        exit={{x: '100vw', opacity: 0}}
                                    >
                                        <div className="h-[2px] absolute top-0 left-0 w-full bg-primaryColor"></div>
                                        <div className="flex flex-col gap-1 overflow-y-auto">
                                            {pages.map((page, index) => {
                                                return <Link to={`/${page.path}`} onClick={() => setNavLinks(false)} key={index} className="hover:text-primaryColor hover:pl-3 py-3 hover:pr-0 pr-3 duration-300" >{page.name}</Link>
                                            })}
                                        </div>
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </>
                )
            }
        </header>
    );
}
 
export default Header;