import newsletter from "../assets/images/newsletter.png";
import { PiArrowRightBold } from "react-icons/pi";

const NewsLetter = () => {
    return (
        <>
            <div className="relative md:py-16 sm:py-12 py-8 flex justify-center items-center gap-7 before:content-[''] before:absolute before:h-full before:w-full before:bg-color3 before:opacity-85" style={{background: `url(${newsletter})`, backgroundPosition: 'Center', backgroundSize: 'cover', backgroundRepeat : 'no-repeat'}}>
                <div className="z-10 grid lg:grid-cols-[5fr_6fr] md:grid-cols-2 grid-cols-1 justify-items-center items-center xl:gap-16 lg:gap-10 md:gap-8 sm:gap-8 gap-5 xl:w-[55%] lg:w-[60%] md:w-[75%] sm:w-[60%] w-[90%]">
                    <h3 className="text-white lg:text-xl sm:text-xl text-lg font-medium">Subscribe Your Email Address For Future Latest News & Updates</h3>
                    <form method="" action='' className="flex justify-center items-center gap-2 bg-white w-full h-10">
                        <input type="text" placeholder="Type your email address" className="focus:outline-none bg-transparent w-full pl-[5%] py-2 md:placeholder:text-base placeholder:text-sm" />
                        <button className="flex justify-center items-center cursor-pointer duration-500 hover:bg-primaryColor text-primaryColor h-full w-[20%] hover:text-white">
                            <PiArrowRightBold  className="text-xl"/>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
 
export default NewsLetter;