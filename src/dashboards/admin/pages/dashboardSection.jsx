import { useContext, useEffect, useState } from "react";
import { MdHomeWork, MdOutlineFileUpload } from "react-icons/md";
import { Link } from "react-router-dom";
import AdminPropertyCard from "../components/card/property";
import { AdminContext } from "../../../context/adminContext";
import { ClipLoader } from "react-spinners";
import AdminPropertyPreview from "../components/card/propertyPreview";


const DashboardSection = () => {

    //state used to store the select property id, so as to reference it to what specific property
    //would be shown in the preview
    const [selectedId, setSelectedId] = useState(null)

    //state that handles property modal preview of the selected property
    const [showProperty, setShowProperty] = useState(false)

    //destructure the admin context to get this information
    const { properties, fetching, handleUpdate } = useContext(AdminContext)


    //opens the modal preview
    const showPreview = (id) => {
        
        //shows the property preview to true
        setShowProperty(true);

        //store the id of the property been clicked
        setSelectedId(id)
    }

    //store the property of the clicked items in a property variable
    const property = properties.find(p => p.id === selectedId)
    

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

    //function that turns a property to approved if the approve button in preview is clicked
    const previewApprove = (e) => {

        //runs the handleUpadte funtion in the admin context so as to send a request to backend to update the
        //property status to approved
        handleUpdate(property.id, 'approve')

        //close preview if approve button is clicked
        setShowProperty(false)
    }

    //function that turns a property to declined if the decline button in preview is clicked
    const previewDecline = (e) => {

        //runs the handleUpadte funtion in the admin context so as to send a request to backend to update the
        //property status to declined
        handleUpdate(property.id, 'decline')

        //close preview if deline button is clicked
        setShowProperty(false)
    }

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
                                    return <AdminPropertyCard key={index} image={property.thumbnail_url} title={property.title} desc={property.description} location={property.location} bed={property.bed} bath={property.bath} rooms={property.room} sq={property.square_meter} price={property.price} id={property.id} pending={property.status} handleApprove={approve} handleDecline={decline} handleClick={() => showPreview(property.id)}  />
                                } else if (property.status === 'declined') {
                                    return <AdminPropertyCard key={index} image={property.thumbnail_url} title={property.title} desc={property.description} location={property.location} bed={property.bed} bath={property.bath} rooms={property.room} sq={property.square_meter} price={property.price} id={property.id} declined={property.status} handleClick={() => showPreview(property.id)}  />
                                } else {
                                    return <AdminPropertyCard key={index} image={property.thumbnail_url} title={property.title} desc={property.description} location={property.location} bed={property.bed} bath={property.bath} rooms={property.room} sq={property.square_meter} price={property.price} id={property.id} approved={property.status} handleClick={() => showPreview(property.id)}  />
                                }
                            })}
                        </div>
                    }
                </>
            }

            {/* preview property that is clicked, conditionally rendering to know what button to display in  */}
            {/* in the preview e.g approve and decline button if status pending  */}
            {showProperty && (
                <div>
                    {property.status === 'pending' ?
                        <AdminPropertyPreview id={selectedId} handleApprove={previewApprove} handleDecline={previewDecline} pending={property.status} closePreview={() => setShowProperty(false)}/>
                        : property.status === 'declined' ?
                        <AdminPropertyPreview id={selectedId} declined={property.status} closePreview={() => setShowProperty(false)}/>
                        : property.status === 'approved' ?
                        <AdminPropertyPreview id={selectedId} approved={property.status} closePreview={() => setShowProperty(false)}/>
                        :
                        null    
                    }
                </div>
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
        </div>
    )
}