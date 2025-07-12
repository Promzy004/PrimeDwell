import { IoBed, IoLocationSharp } from "react-icons/io5";
import { FaBath } from "react-icons/fa6";
import { RiSofaFill } from "react-icons/ri";
import { BiArea } from "react-icons/bi";
import { LiaTimesSolid } from "react-icons/lia";
import { useContext } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { BuyerContext } from "../../../context/buyerContext";

const BuyerPropertyPreview = ({closePreview, id, handleImagesClick, favorited}) => {

    //passed a prop that get the id of the property been cicked
    const item_id = id

    const { properties } = useContext(BuyerContext)

    //get all information of the item been clicked using the id
    const property = properties.filter(property => property.id === item_id)

    return (
        <div className="pl-[calc(288px+15%)] fixed z-20 top-0 left-0 flex items-center w-full h-screen bg-black/30 backdrop-blur-sm">
            <div className="flex flex-col  gap-5 w-[80%] min-h-[60%] rounded-2xl bg-white px-5 py-5">
                <button onClick={closePreview} title="close" className="self-end">
                    <LiaTimesSolid className="text-lg font-extrabold text-[#B41C11]" />
                </button>
                <div className="">
                    {property.map((prop, index) => {

                        //store all property images in a new variable
                        const gallery = prop.property_images

                        console.log(gallery)
                        
                        return (
                            <div className="flex flex-col gap-5" key={index}>
                                <div className="flex gap-2 cursor-pointer h-40 overflow-auto hover:border-2 hover:border-primaryColor" onClick={() => handleImagesClick(gallery)}>
                                    {gallery.map((gal, index) => (
                                        <img key={index} src={gal.image_url} alt="" className="rounded-md" />
                                    ))}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <h3 className="text-xl font-semibold">{prop.title}</h3>
                                        <div className="bg-primaryColor rounded-md text-xs left-3 bottom-3 text-white px-2 py-1">
                                            {'\u0024'}{prop.price}
                                        </div>
                                    </div>
                                    <p className="sm:text-sm text-sm font-light">{prop.description}</p>
                                    <span className="flex items-center gap-2">
                                        <IoLocationSharp className="text-primaryColor text-lg" />
                                        <span className="sm:text-sm text-sm font-light">
                                            {prop.location}
                                        </span>
                                    </span>
                                    <div className="w-full h-[1px] bg-neutral-300"></div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-wrap lg:gap-3 md:gap-2 gap-3">
                                            <span className="flex justify-center items-center gap-2">
                                                <IoBed className="text-primaryColor text-base" />
                                                <span className="sm:text-xs text-xs font-light">
                                                    {prop.bed} Bed
                                                </span>
                                                <div className="h-full w-[1px] bg-neutral-300 md:ml-0 ml-3 md:mr-0 mr-2"></div>
                                            </span>
                                            <span className="flex justify-center items-center gap-2">
                                                <FaBath className="text-primaryColor" />
                                                <span className="sm:text-xs text-xs font-light">
                                                    {prop.bath} Bath
                                                </span>
                                                <div className="h-full w-[1px] bg-neutral-300 md:ml-0 ml-3 md:mr-0 mr-2"></div>
                                            </span>
                                            <span className="flex justify-center items-center gap-2">
                                                <RiSofaFill className="text-primaryColor" />
                                                <span className="sm:text-xs text-xs font-light">
                                                    {prop.room} Rooms
                                                </span>
                                                <div className="h-full w-[1px] bg-neutral-300 md:ml-0 ml-3 md:mr-0 mr-2"></div>
                                            </span>
                                            <span className="flex justify-center items-center gap-2">
                                                <BiArea className="text-primaryColor" />
                                                <span className="sm:text-xs text-xs font-light">
                                                    {prop.square_meter} sq
                                                </span>
                                            </span>
                                        </div>
                                        {favorited ?
                                            <button className="right-4 top-4 hover:text-black">
                                                <MdFavorite className="text-[#DA5C5C] text-3xl hover:scale-125 duration-200" />
                                            </button>
                                            :
                                            <button className="right-4 top-4 hover:text-black">
                                                <MdFavoriteBorder className="text-[#DA5C5C] text-3xl hover:scale-125 duration-200" />
                                            </button>
                                        
                                    }
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <button onClick={closePreview} className="self-end border-[1.5px] text-white border-none bg-primaryColor px-7 py-[3px] rounded-md text-sm mt-4">
                    Contact Agent
                </button>
            </div>
        </div>
    );
}
 
export default BuyerPropertyPreview;