import { LiaTimesSolid } from "react-icons/lia";
import gallery1 from "../../../assets/images/gallery/gallery1.png";
import gallery2 from "../../../assets/images/gallery/gallery2.png";
import gallery3 from "../../../assets/images/gallery/gallery3.png";
import gallery4 from "../../../assets/images/gallery/gallery4.png";
import gallery5 from "../../../assets/images/gallery/gallery5.png";
import gallery6 from "../../../assets/images/gallery/gallery6.png";
import { useState } from "react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";


const ImagePreview = () => {

    const [image, setImage] = useState(0)
    const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6]
    console.log(images)

    const handleNext = () => {
        setImage(prev => prev + 1)
    }

    const handlePrev = () => {
        setImage(prev => prev - 1)
    }

    return (
        <div className="fixed left-0 top-0 bg-[rgba(0,0,0,0.97)] w-screen h-screen z-50 flex flex-col justify-center items-center">
            <div className="h-full w-auto bg-green-200 flex justify-center gap-2 items-center">
                <button onClick={handlePrev} >
                    <GrCaretPrevious className="text-2xl hover:text-primaryColor" />
                </button>
                <div className="h-full w-auto bg-red-200 flex flex-col justify-center items-center">
                    <button title="close" className="text-white self-end mr-8">
                        <LiaTimesSolid className="text-lg font-extrabold text-[#B41C11]" />
                    </button>
                    <img src={images[image]} alt="" className="object-contain h-auto w-auto min-h-[95%] min-w-[95%] max-h-[95%] max-w-[95%]" />
                </div>
                <button onClick={handleNext} >
                    <GrCaretNext className="text-2xl hover:text-primaryColor" />
                </button>
            </div>
        </div>
    );
}
 
export default ImagePreview;