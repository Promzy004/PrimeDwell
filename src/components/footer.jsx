import { HiMiniChevronRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import img4 from "../assets/images/img4.png";
import img5 from "../assets/images/img5.png";
import img6 from "../assets/images/img6.png";


// export const Footer1 = () => {
//     return (
//         <footer>
//             <div className="relative bg-red-500">
//                 <div className="bg-color2 grid grid-cols-1 justify-items-center items-center gap-5">
//                     <div>
//                         <h2 className="text-xl font-semibold">Brand name</h2>
//                         <p className="text-sm">There are many variations of passages Lorem Ipsum available, but the majority is have suffered alteration.</p>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <h2 className="text-xl font-semibold">About Us</h2>
//                             <div className="flex flex-col gap-1">
//                                 <Link className="flex items-center gap-1 text-sm">How It Works</Link>
//                                 <Link className="flex items-center gap-1 text-sm">Meet Our Team</Link>
//                                 <Link className="flex items-center gap-1 text-sm">Help Desk</Link>
//                                 <Link className="flex items-center gap-1 text-sm">plans & Pricing</Link>
//                             </div>
//                         </div>
//                         <div>
//                             <h2 className="text-xl font-semibold">Quick Links</h2>
//                             <div className="flex flex-col gap-1">
//                                 <Link className="flex items-center gap-1 text-sm">How It Works</Link>
//                                 <Link className="flex items-center gap-1 text-sm">Meet Our Team</Link>
//                                 <Link className="flex items-center gap-1 text-sm">Help Desk</Link>
//                                 <Link className="flex items-center gap-1 text-sm">plans & Pricing</Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="flex justify-end py-10 bg-white/50">
//                     <img src={icon1} alt="company" loading="lazy" className="h-10" />
//                     <img src={icon2} alt="company" loading="lazy" className="h-10" />
//                     <img src={icon3} alt="company" loading="lazy" className="h-10" />
//                     <img src={icon4} alt="company" loading="lazy" className="h-10" />
//                 </div>
//                 <div className="absolute bottom-[20%] left-[20%] py-12 flex flex-col bg-white w-[20%] gap-7 drop-shadow-md">
//                     <div className="flex flex-col gap-5">
//                         <a href="tel:+">
//                             <span>Call Now</span>
//                             <span>+234 7058149298</span>
//                         </a>
//                         <a href="tel:+">
//                             <span>Call Now</span>
//                             <span>+234 7058149298</span>
//                         </a>
//                     </div>
//                     <p>There are many variations of passages of Loem Ipsum available</p>
//                 </div>
//             </div>
//             <Footer />
//         </footer>
//     );
// }


const Footer = () => {
    return (
        <footer className="xl:px-56 lg:px-44 md:px-24 sm:px-10 px-5 bg-color4">
            <div className="relative text-white grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:justify-items-center py-10 md:gap-7 sm:gap-y-10 sm:gap-x-10 gap-10">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <h2 className="md:text-xl text-lg font-semibold">Brand name</h2>
                        <p className="md:text-sm text-xs text-neutral-300">There are many variations of passages Lorem Ipsum available, but the majority is have suffered alteration.</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="md:text-base text-sm font-medium">Business Hour</h3>
                        <p className="md:text-sm text-xs text-neutral-300">Monday - Friday 10:00am - 06:00pm</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="md:text-xl text-base font-semibold">Important Links</h2>
                    <div className="md:text-sm text-xs flex flex-col gap-1 text-neutral-300">
                        <Link className=" flex items-center gap-1">
                            <HiMiniChevronRight />
                            Our Services
                        </Link>
                        <Link className="flex items-center gap-1">
                            <HiMiniChevronRight />
                            Privacy
                        </Link>
                        <Link className="flex items-center gap-1">
                            <HiMiniChevronRight />
                            Contact
                        </Link>
                        <Link className="flex items-center gap-1">
                            <HiMiniChevronRight />
                            Meet Our Teams
                        </Link>
                        <Link className="flex items-center gap-1">
                            <HiMiniChevronRight />
                            Help Desk
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="md:text-xl text-lg font-semibold">Follow Instagram</h2>
                    <a href="" className="grid grid-cols-3 place-self-start gap-2">
                        <img src={img1} alt="image" loading="lazy" className="md:h-12 h-9" />
                        <img src={img2} alt="image" loading="lazy" className="md:h-12 h-9" />
                        <img src={img3} alt="image" loading="lazy" className="md:h-12 h-9" />
                        <img src={img4} alt="image" loading="lazy" className="md:h-12 h-9" />
                        <img src={img5} alt="image" loading="lazy" className="md:h-12 h-9" />
                        <img src={img6} alt="image" loading="lazy" className="md:h-12 h-9" />
                    </a>
                </div>
                <div className="bg-color5 h-[1px] w-full absolute bottom-0 left-0"></div>
            </div>
            <div className="bg-color4 flex justify-center items-center py-3 text-neutral-300 md:text-sm text-xs">
                <p>All Right Reserve By Edwin Promise 2025</p>
            </div>
        </footer>
    );
}

export default Footer;