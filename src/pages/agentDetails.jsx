import { useParams } from "react-router-dom";
import PagesHero from "../components/pagesHero";
import { agents } from "../assets/data/data";
import { FaPhone, FaTelegramPlane } from "react-icons/fa";
import { useEffect, useState } from "react";

const AgentDetails = () => {

    const { id } = useParams()
    const agent = agents.filter(agent => agent.id === Number(id));

    //state that shows image if true, but don't show image preview if false
    const [previewImage, setPreviewImage] = useState(false)

    //state where the image to be previewed would be passed in
    const [currentImage, setCurrentImage] = useState('')


    //function that runs when the image to be previewed is clicked
    const handleShowImage = (src) => {
        setPreviewImage(true);
        setCurrentImage(src)
    }

    //funcion that runs when the cancel preview is clicked, closes the preview image
    const closePreview = () => {
        setPreviewImage(false)
        setCurrentImage('')
    }

    //useEffect that runs when there is a change in state of the previewImage state
    useEffect(() => {

        //gives the body an overflow hidden, i.e stop the body from scrolling when the image is been previewed.
        //else gives the body an overflow of none, i.e allows it to scroll when the image preview is canceled 
        if(previewImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        //A cleanup that runs when the component is unmount
        return () => {
            document.body.style.overflow = '';
        }
    }, [previewImage])
    
    return (
        <div>

            {previewImage && (
                <div className="fixed flex flex-col justify-center items-center box-border top-0 left-0 right-0 z-50 w-screen h-screen bg-[rgba(0,0,0,0.91)]">
                    <button className="text-white self-end md:pr-7 pr-2 mb-4" onClick={closePreview}>cancel</button>
                    <img src={currentImage} alt="" className="max-h-[90vh] max-w-[90vw] lg:min-h-[80%] lg:min-w-[80%] sm:min-h-[70%] sm:min-w-[70%] min-w-[100%] w-auto h-auto object-contain"/>
                </div>
            )}

            <PagesHero title='Agent Details' page='Agent' />
            <div className="md:py-20 py-14 lg:w-[90%] md:w-[90%] sm:w-[75%] w-[90%] mx-auto">
                {agent.map((agent, index) => (
                    <div key={index} className="grid lg:grid-cols-2 md:grid-cols-[3fr_4fr] gap-10 border sm:p-5 p-3">
                        <div className="flex flex-col md:gap-5 gap-7">
                            <div className="flex sm:gap-5 gap-3 items-center">
                                <img src={agent.image} onClick={() => handleShowImage(agent.image)} alt="agent image" className="lg:h-44 md:h-36 h-36" />
                                <div className="flex flex-col gap-4 items-start">
                                    <div className="relative flex flex-col gap-1 pb-4 before:content-[''] before:h-[2px] before:w-12 before:bg-gray-300 before:absolute before:left-0 before:bottom-0">
                                        <h2 className="lg:text-2xl md:text-xl text-lg font-medium">{agent.name}</h2>
                                        <p className="lg:text-base text-sm text-gray-500">Designation</p>
                                    </div>
                                    <div className="flex flex-col items-start gap-2">
                                        <a href="mailto:promiseedwin242@gmail.com" className="flex justify-center items-center lg:gap-3 md:gap-2 gap-2">
                                            <FaTelegramPlane className="lg:text-xl md:text-lg sm:text-base text-primaryColor" />
                                            <span className="font-light lg:text-base md:text-sm text-xs">mail.uremail.com</span>
                                        </a>
                                        <a href="tel:+2347058149298" className="flex justify-center items-center lg:gap-3 md:gap-2 gap-2">
                                            <FaPhone className="lg:text-lg md:text-base text-sm text-primaryColor" />
                                            <span className="font-light lg:text-base text-xs">Mobile</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:gap-3 gap-5">
                                <h3 className="relative pb-2 lg:text-xl text-base font-medium before:content-[''] before:h-[3px] before:w-12 before:bg-primaryColor before:absolute before:left-0 before:bottom-0">About {agent.name}</h3>
                                <p className="lg:text-base md:text-sm text-sm font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolores tempore nemo exercitationem beatae consectetur. Eos quae aut autem similique, dolorum, nam aliquid culpa a facilis nobis, enim suscipit at?</p>
                            </div>
                        </div>

                        <form action="" method="post" className="flex flex-col gap-8 border p-5">
                            <h3 className="relative pb-2 lg:text-xl text-base font-medium before:content-[''] before:h-[3px] before:w-12 before:bg-primaryColor before:absolute before:left-0 before:bottom-0">Contact with {agent.name}</h3>
                            <div className="flex flex-col gap-4">
                                <label className="flex flex-col gap-1 lg:text-base md:text-sm text-sm">
                                    Full Name
                                    <input type="text" className="hero-input focus:border-primaryColor/50" placeholder="Type Full Name" />
                                </label>
                                <label className="flex flex-col gap-1 lg:text-base md:text-sm text-sm">
                                    Email
                                    <input type="text" className="hero-input focus:border-primaryColor/50" placeholder="Your Email" />
                                </label>
                                <label className="flex flex-col gap-1 lg:text-base md:text-sm text-sm">
                                    Subject
                                    <input type="text" className="hero-input focus:border-primaryColor/50" placeholder="Type Subject" />
                                </label>
                                <label className="flex flex-col gap-1 lg:text-base md:text-sm text-sm">
                                    Message
                                    <textarea name="" id="" className="hero-input focus:border-primaryColor/50" placeholder="Type Message"></textarea>
                                </label>
                                <input type="Submit" value='Send Message' className="bg-primaryColor sm:px-7 sm:py-2 px-4 py-2 flex self-start text-sm text-white mt-3 hover:text-color3 cursor-pointer" />
                            </div>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default AgentDetails;