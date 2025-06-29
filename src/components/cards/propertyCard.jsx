import { IoBed, IoLocationSharp } from "react-icons/io5";
import img from "../../assets/images/feature1.png";
import { FaBath } from "react-icons/fa6";
import { RiSofaFill } from "react-icons/ri";
import { BiArea } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ image=img, title, desc, location, bed, bath, rooms, sq, price, id}) => {

    const navigate = useNavigate()
    console.log(id)

    const handleClick = () => {
        navigate(`/property-details/${id}`);
        window.scrollTo(0, 0);
    }

    return (
        <div className="grid grid-cols-1 bg-white drop-shadow-md rounded-md hover:scale-105 duration-500 cursor-pointer" onClick={handleClick}>
            <div className="h-[12rem] rounded-tr-md rounded-tl-md relative" style={{background: `url(${image})`, backgroundSize: 'cover',}}>
                <div className="bg-primaryColor absolute left-3 bottom-3 text-white px-2 py-1">
                    {'\u0024'}{price}
                </div>
            </div>
            <div className="px-4 md:py-6 py-4 flex flex-col md:gap-4 gap-2">
                <h3 className="sm:text-xl text-base font-medium">{title}</h3>
                <p className="sm:text-sm text-xs font-light">{desc}</p>
                <span className="flex items-center gap-2">
                    <IoLocationSharp className="text-primaryColor text-xl" />
                    <span className="sm:text-sm text-xs font-light">
                        {location}
                    </span>
                </span>
                <div className="w-full h-[1px] bg-neutral-300"></div>
                <div className="flex flex-wrap lg:gap-3 md:gap-2 gap-3">
                    <span className="flex justify-center items-center gap-2">
                        <IoBed className="text-primaryColor" />
                        <span className="sm:text-sm text-xs font-light">
                            {bed} Bed
                        </span>
                        <div className="h-full w-[1px] bg-neutral-300 md:ml-0 ml-3 md:mr-0 mr-2"></div>
                    </span>
                    <span className="flex justify-center items-center gap-2">
                        <FaBath className="text-primaryColor" />
                        <span className="sm:text-sm text-xs font-light">
                            {bath} Bath
                        </span>
                        <div className="h-full w-[1px] bg-neutral-300 md:ml-0 ml-3 md:mr-0 mr-2"></div>
                    </span>
                    <span className="flex justify-center items-center gap-2">
                        <RiSofaFill className="text-primaryColor" />
                        <span className="sm:text-sm text-xs font-light">
                            {rooms} Rooms
                        </span>
                        <div className="h-full w-[1px] bg-neutral-300 md:ml-0 ml-3 md:mr-0 mr-2"></div>
                    </span>
                    <span className="flex justify-center items-center gap-2">
                        <BiArea className="text-primaryColor" />
                        <span className="sm:text-sm text-xs font-light">
                            {sq} sq
                        </span>
                    </span>
                </div>
                <div>
                    <h3>Property Gallery</h3>
                </div>
            </div>
        </div>
    );
}
 
export default PropertyCard;