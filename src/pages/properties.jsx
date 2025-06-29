import { useState } from "react";
import { properties } from "../assets/data/data";
import PagesHero from "../components/pagesHero";
import PropertyCard from "../components/cards/propertyCard";

const Properties = () => {

    const [propertyIndex, setPropertyIndex] = useState(6);
        
    const handlePropertyShowMore = () => {
        setPropertyIndex((prev) => prev + 2);
    }

    const handlePropertyShowLess = () => {
        setPropertyIndex((prev) => prev - 2);
    }

    return (
        <>
            <PagesHero title='Property Listing' page='Property' />
            <div className="md:py-20 py-14 lg:w-[70%] md:w-[80%] sm:w-[75%] w-[90%] flex flex-col items-center gap-12 mx-auto">
                <form action="" className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-x-2 md:gap-x-3 gap-x-5 lg:gap-y-5 md:gap-y-3 gap-y-3 text-sm border p-5">
                    <label className="flex flex-col gap-1">
                        Looking For
                        <input type="text" className="hero-input" placeholder="Property Type" />
                    </label>
                    <label className="flex flex-col gap-1">
                        Property Size
                        <input type="text" className="hero-input" placeholder="Property Size" />
                    </label>
                    <label className="flex flex-col gap-1">
                        Property Location
                        <input type="text" className="hero-input" placeholder="Type Location" />
                    </label>
                    <label className="flex flex-col gap-1">
                        Property Size
                        <input type="text" className="hero-input" placeholder="Property Size" />
                    </label>
                    <label className="flex flex-col gap-1">
                        Total Bed
                        <input type="text" className="hero-input" placeholder="Bed" />
                    </label>
                    <label className="flex flex-col gap-1">
                        Total Bath
                        <input type="text" className="hero-input" placeholder="Bath" />
                    </label>
                    <input type="Submit" value='Search' className=" w-[50%] bg-primaryColor px-7 py-2 flex self-end text-sm text-white" />
                </form>
                <div className="grid md:grid-cols-2 grid-cols-1 md:gap-7 gap-10">
                    {properties.slice(0, propertyIndex).map((property, index) => (
                        <PropertyCard key={index} id={property.id} image={property.image} title={property.title} desc={property.desc} bed={property.bed} bath={property.bath} rooms={property.rooms} sq={property.sq} price={property.price} />
                    ))}
                </div>
                <div className="flex gap-10">
                    {(propertyIndex < properties.length)&& (
                        <button className="bg-primaryColor duration-300 hover:text-white/70 text-white px-6 py-3 text-sm" onClick={handlePropertyShowMore}>See More Property</button>
                    )}
                    {propertyIndex > 2 && (
                        <button className="bg-gray-400 duration-300 hover:text-white/70 text-white px-6 py-3 text-sm" onClick={handlePropertyShowLess}>Show less</button>
                    )}
                </div>

            </div>
        </>
    );
}
 
export default Properties;