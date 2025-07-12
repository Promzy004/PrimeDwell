import { IoBed, IoLocationSharp } from "react-icons/io5";
// import img from "../../assets/images/feature1.png";
import { FaBath } from "react-icons/fa6";
import { RiSofaFill } from "react-icons/ri";
import { BiArea } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";


const BuyerPropertyCard = ({ image, title, desc, location, bed, bath, rooms, sq, price, id, handleClick, favorite, handleFavorite }) => {



    return (
        <div className="grid relative grid-cols-1 cursor-pointer bg-white drop-shadow-md break-words whitespace-normal rounded-md hover:scale-105 duration-500" style={{hyphens: 'auto'}} onClick={handleClick}>
            {favorite ? 
                <button className="absolute z-50 right-4 top-4 bg-white p-1 hover:text-black">
                    <MdFavorite className="text-[#DA5C5C] text-xl hover:scale-125 duration-200" onClick={handleFavorite} />
                </button>
                :
                <button className="absolute z-50 right-4 top-4 bg-white p-1 hover:text-black">
                    <MdFavoriteBorder className="text-[#DA5C5C] text-xl hover:scale-125 duration-200" onClick={handleFavorite} />
                </button>
            }
            <div className="h-[8rem] rounded-tr-md rounded-tl-md relative" style={{background: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="bg-primaryColor text-xs absolute left-3 bottom-3 text-white px-2 py-1">
                    {'\u0024'}{price}
                </div>
            </div>
            <div className="px-3 md:py-2 py-4 flex flex-col md:gap-3 gap-2">
                <h3 className="sm:text-base text-base font-medium">{title}</h3>
                <p className="sm:text-xs text-xs font-light">{desc}</p>
                <span className="flex items-center gap-2">
                    <IoLocationSharp className="text-primaryColor text-lg" />
                    <span className="sm:text-xs text-xs font-light">
                        {location}
                    </span>
                </span>
                <div className="w-full h-[1px] bg-neutral-300"></div>
                <div className="flex flex-wrap lg:gap-x-3 lg:gap-y-2 md:gap-2 gap-3">
                    <span className="flex justify-center items-center gap-2">
                        <IoBed className="text-primaryColor text-base" />
                        <span className="sm:text-xs text-xs font-light">
                            {bed} Bed
                        </span>
                        <div className="h-full w-[1px] bg-neutral-300 md:ml-0 ml-3 md:mr-0 mr-2"></div>
                    </span>
                    <span className="flex justify-center items-center gap-2">
                        <FaBath className="text-primaryColor" />
                        <span className="sm:text-xs text-xs font-light">
                            {bath} Bath
                        </span>
                        <div className="h-full w-[1px] bg-neutral-300 md:ml-0 ml-3 md:mr-0 mr-2"></div>
                    </span>
                    <span className="flex justify-center items-center gap-2">
                        <RiSofaFill className="text-primaryColor" />
                        <span className="sm:text-xs text-xs font-light">
                            {rooms} Rooms
                        </span>
                        <div className="h-full w-[1px] bg-neutral-300 md:ml-0 ml-3 md:mr-0 mr-2"></div>
                    </span>
                    <span className="flex justify-center items-center gap-2">
                        <BiArea className="text-primaryColor" />
                        <span className="sm:text-xs text-xs font-light">
                            {sq} sq
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}
 
export default BuyerPropertyCard;