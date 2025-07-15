import { useContext, useEffect, useState } from "react";
import { MdHomeWork, MdOutlineFileUpload } from "react-icons/md";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import BuyerPropertyCard from "../components/PropertyCard";
import BuyerPropertyPreview from "../components/propertyPreview";
// import { properties } from "../../../assets/data/data";
import { BuyerContext } from "../../../context/buyerContext";
import { motion, AnimatePresence } from "framer-motion";

const DashboardContent = () => {

    //state used to store the select property id, so as to reference it to what specific property
    //would be shown in the preview
    const [selectedId, setSelectedId] = useState(null)


    //state that handles property modal preview of the selected property
    const [showProperty, setShowProperty] = useState(false)

    //state that handle the modal property upload
    const [showUploadd, setShowUpload] = useState(false)

    //gets the set property image preview so as to set it true when images is clicked, then displays the previews
    const { setPropertyImagePreview, properties, handleFavorite, favoriteMessage, fetching, page, setPage, perPage, totalPage, from, to } = useContext(BuyerContext)

    //opens the modal property preview
    const showPreview = (id) => {
        setShowProperty(true);
        setSelectedId(id)
    }

    //store the property of the clicked items in a property variable
    const property = properties.find(p => p.id === selectedId)

    console.log(property)

    // function added to the prop created in the property preview, gets the gallery image passed as parameter 
    // through the funtion prop in property preview and gets it here as images argument, which is then used to set
    // the propertyImagesPreview state
    const handlePreviewImages = (images) => {
        setPropertyImagePreview(images)
    }

    const handleFavoriteClick = (e, id) => {
        e.stopPropagation()
        handleFavorite(id)
    }

    //useEfect use to th body overflow
    useEffect(() => {
        if(showProperty) {
            //makes the body not scrollable when the modal preview is active
            document.body.style.overflow = 'hidden';
        } else {
            //makes the body scrollable when the modal preview is not active
            document.body.style.overflow = '';
        }

        //clean up funtion that runs when component unmout
        return () => {
            document.body.style.overflow = '';
        }
    }, [showProperty])

     //funtion used to get the number of pagination that would be required based on the total items and item per page
    const pagination = (totalnumber, number) => {
        const result = []
        for (let s=1; totalnumber >= 1; s++) {
            //push numbers according to how many times number will be subtracted from totalnumber to get less than 1
            result.push(s)
            totalnumber = totalnumber - number
        }

        //return the values pushed, would be like [1,2,3,4, ...]
        return result
    }

    //stores the pagination funtion returned values to a variable
    const paginate_values = pagination(totalPage,perPage)

    //funtion to handle prev button for pagination
    const handlePrev = () => {
        if (page > 1) {
            setPage(prev => prev - 1)
        }
    }

    //funtion to handle next button for pagination
    const handleNext = () => {
        if (page < paginate_values.length) {
            setPage(prev => prev + 1)
        }
    }


    return (
        <div className="relative pb-10">
            <MenuBar handleUpload={() => setShowUpload(true)} />
            <AnimatePresence>
                {(favoriteMessage !== '') && (
                        <motion.div 
                            initial={{y: '-100%', opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: '-100%', opacity: 0}}
                            transition={{delay: 0.5, duration: 0.3, type:'tween', ease: 'easeOut'}}
                            className="fixed left-[48%] top-20 z-50 "
                        >
                            <span className="bg-neutral-200 drop-shadow-md rounded-md px-7 py-3 opacity-95 text-[#60B849] text-lg">{favoriteMessage}</span>
                        </motion.div>
                )}
            </AnimatePresence>
            {fetching ? 
                <div className="flex justify-center items-center my-32">
                    <ClipLoader color="#3498db" loading={fetching} size={30} />
                </div>
                :
                <>
                    {properties.length < 1 ?
                        <div>No Properties Found</div>
                        :
                        <>
                            <div className="grid grid-cols-3 2xl:grid-cols-4 gap-5 mx-5">
                                {properties.map((property, index) => (
                                    <BuyerPropertyCard key={index} image={property.thumbnail_url} title={property.title} desc={property.description} location={property.location} bed={property.bed} bath={property.bath} rooms={property.room} sq={property.square_meter} price={property.price} id={property.id} handleClick={() => showPreview(property.id)} favorite={property.favorited} handleFavorite={(e) => handleFavoriteClick(e, property.id)}   />
                                ))}
                            </div>
                            {showProperty && (
                                <div>
                                    {property.favorited ?
                                        <BuyerPropertyPreview id={selectedId} closePreview={() => setShowProperty(false)} favorited={property.favorited} handleImagesClick={handlePreviewImages} handleFavorite={(e) => handleFavoriteClick(e, property.id)}/>
                                        :
                                        <BuyerPropertyPreview id={selectedId} closePreview={() => setShowProperty(false)} favorited={property.favorited} handleImagesClick={handlePreviewImages} handleFavorite={(e) => handleFavoriteClick(e, property.id)}/>
                                    }
                                </div>
                            )}
                        </>
                    }
                </>
            }

            {totalPage > 15 && (
                <div className="flex justify-between items-center mb-12 mt-16">
                    <div className="text-[#444] text-sm">Showing {from} to {to} of {totalPage} results</div>
                    <div className="flex justify-center items-center drop-shadow-sm">
                        <button className={`px-5 py-1 border border-[#dadada] text-sm rounded-l-md text-center hover:bg-[#e0e0e0] duration-300 ${page < 2 ? 'bg-[#f9f9f9] text-[#AAAAAA] cursor-not-allowed' : 'text-[#444] bg-[#f1f1f1]' }`} onClick={handlePrev}>prev</button>
                        {paginate_values.map((paginate, index)=> (
                            <button key={index} className={`px-5 py-1 text-sm border border-[#dadada] duration-300 ${paginate === page ? 'bg-primaryColor text-white': 'bg-[#f1f1f1] hover:bg-[#e0e0e0] text-[#444]'}`} onClick={()=> setPage(paginate)}>{paginate}</button>
                        ))}
                        <button className={`px-5 py-1 border border-[#dadada] text-sm rounded-r-md text-center hover:bg-[#e0e0e0] duration-300 ${page === paginate_values.length ? 'bg-[#f9f9f9] text-[#AAAAAA] cursor-not-allowed' : 'text-[#444] bg-[#f1f1f1]' }`} onClick={handleNext}>next</button>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default DashboardContent;


export const MenuBar = () => {

    //state that handles the active menu link
    // const [isActive, setIsActive] = useState('all')

    // const { status, setStatus } = useContext(AgentContext)

    return (
        <div className="flex mb-10 justify-between">
            <div className="flex gap-2 items-center px-4 py-2 rounded-md">
                <MdHomeWork className="text-primaryColor text-xl mx-2 mb-1" />
                {/* <Link onClick={() => setStatus('all')} className={`px-2 pb-1 ${status == 'all' ? 'text-primaryColor border-b border-primaryColor bg-white text-sm ' : 'text-sm text-[#828B92]'}`}>All</Link> */}
                <div>All</div>
            </div>
        </div>
    )
}