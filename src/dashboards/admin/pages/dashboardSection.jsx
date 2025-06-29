import { useContext, useEffect, useState } from "react";
import { MdHomeWork, MdOutlineFileUpload } from "react-icons/md";
import { Link } from "react-router-dom";
import PropertyPreview from "../../agent/components/cards/propertyPreview";
import AdminPropertyCard from "../components/card/property";
import { AdminContext } from "../../../context/adminContext";
import { ClipLoader } from "react-spinners";


const DashboardSection = () => {

    //state used to store the select property id, so as to reference it to what specific property
    //would be shown in the preview
    const [selectedId, setSelectedId] = useState(null)

    //state that handles property modal preview of the selected property
    const [showProperty, setShowProperty] = useState(false)

    const { properties, fetching, handleUpdate } = useContext(AdminContext)


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

    // if (fetching) return <ClipLoader color="#3498db" loading={loading} size={30} />

    return (
        <div className="relative">
            <MenuBar/>
            {fetching ? 
                <div className="flex justify-center items-center my-32">
                    <ClipLoader color="#3498db" loading={fetching} size={40} />
                </div>
                :
                <>
                    {properties.length < 1 ? 
                        <div>No Properties Found</div>
                        :
                        <div className="grid grid-cols-3 gap-5">
                            {properties.map((property, index) => {
                                if (property.status === 'pending') {
                                    const approve = (e) => {
                                        e.stopPropagation()
                                        handleUpdate(property.id, 'approve')
                                    }

                                    const decline = (e) => {
                                        e.stopPropagation()
                                        handleUpdate(property.id, 'decline')
                                    }
                                    return <AdminPropertyCard key={index} image={property.image} title={property.title} desc={property.desc} location={property.location} bed={property.bed} bath={property.bath} rooms={property.room} sq={property.square_meter} price={property.price} id={property.id} pending={property.status} handleApprove={approve} handleDecline={decline} handleClick={() => showPreview(property.id)}  />
                                } else if (property.status === 'declined') {
                                    return <AdminPropertyCard key={index} image={property.image} title={property.title} desc={property.desc} location={property.location} bed={property.bed} bath={property.bath} rooms={property.room} sq={property.square_meter} price={property.price} id={property.id} declined={property.status} handleClick={() => showPreview(property.id)}  />
                                } else {
                                    return <AdminPropertyCard key={index} image={property.image} title={property.title} desc={property.desc} location={property.location} bed={property.bed} bath={property.bath} rooms={property.room} sq={property.square_meter} price={property.price} id={property.id} approved={property.status} handleClick={() => showPreview(property.id)}  />
                                }
                            })}
                        </div>
                    }
                </>
            }
            {showProperty && (
                <PropertyPreview id={selectedId} closePreview={() => setShowProperty(false)}/>
            )}
        </div>
    );
}
 
export default DashboardSection;


export const MenuBar = ({handleUpload}) => {

    //state that handles the active menu link
    const { status, setStatus } = useContext(AdminContext)

    return (
        <div className="flex mb-10 justify-between">
            <div className="flex gap-2 items-center px-4 py-2 rounded-md">
                <MdHomeWork className="text-primaryColor text-xl mx-2 mb-1" />
                <Link onClick={() => setStatus('all')} className={`px-2 pb-1 ${status == 'all' ? 'text-primaryColor border-b border-primaryColor bg-white text-sm ' : 'text-sm text-[#828B92]'}`}>All</Link>
                <Link onClick={() => setStatus('approved')} className={`px-2 pb-1 ${status == 'approved' ? 'text-[#60B849] border-b border-[#60B849] bg-white text-sm ' : 'text-sm text-[#828B92]'}`}>Approved</Link>
                <Link onClick={() => setStatus('pending')} className={`px-2 pb-1 ${status == 'pending' ? 'text-[#FF9800] border-b border-[#FF9800] bg-white text-sm  ' : 'text-sm text-[#828B92]'}`}>Pending</Link>
                <Link onClick={() => setStatus('declined')} className={`px-2 pb-1 ${status == 'declined' ? 'text-[#B41C11] border-b border-[#B41C11] bg-white text-sm  ' : 'text-sm text-[#828B92]'}`}>Declined</Link>
            </div>
            {/* <button className="flex px-6 py-2 items-center gap-1 text-white bg-primaryColor rounded-md" onClick={handleUpload}>
                <MdOutlineFileUpload className="text-xl" />
                <span>Upload</span>
            </button> */}
        </div>
    )
}