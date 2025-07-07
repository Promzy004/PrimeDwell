import { useContext, useEffect, useState } from "react";
import { MdHomeWork, MdOutlineFileUpload } from "react-icons/md";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import BuyerPropertyCard from "../components/PropertyCard";
import BuyerPropertyPreview from "../components/propertyPreview";
import { properties } from "../../../assets/data/data";
import { BuyerContext } from "../../../context/buyerContext";

const DashboardContent = () => {

    //state used to store the select property id, so as to reference it to what specific property
    //would be shown in the preview
    const [selectedId, setSelectedId] = useState(null)


    //state that handles property modal preview of the selected property
    const [showProperty, setShowProperty] = useState(false)

    //state that handle the modal property upload
    const [showUploadd, setShowUpload] = useState(false)

    //gets the set property image preview so as to set it true when images is clicked, then displays the previews
    const { setPropertyImagePreview } = useContext(BuyerContext)

    //opens the modal preview
    const showPreview = (id) => {
        setShowProperty(true);
        setSelectedId(id)
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


    return (
        <div className="relative">
            <MenuBar handleUpload={() => setShowUpload(true)} />
            <div className="grid grid-cols-3 gap-5 mx-5">
                {properties.map((property, index) => (
                    <BuyerPropertyCard key={index} image={property.image} title={property.title} desc={property.desc} location={property.location} bed={property.bed} bath={property.bath} rooms={property.rooms} sq={property.sq} price={property.price} id={property.id} handleClick={() => showPreview(property.id)}  />
                ))}
            </div>
            {showProperty && (
                <BuyerPropertyPreview id={selectedId} closePreview={() => setShowProperty(false)} handleImagesClick={() => setPropertyImagePreview(true)}/>
            )}
        </div>
    );
}
 
export default DashboardContent;


export const MenuBar = ({handleUpload}) => {

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