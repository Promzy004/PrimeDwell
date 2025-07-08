import { LiaTimesSolid } from "react-icons/lia";
import { useContext, useState } from "react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { AnimatePresence, motion } from "framer-motion";
import { BuyerContext } from "../../../context/buyerContext";


const PropertyImagePreview = () => {

    const [index, setIndex] = useState(0)
    const { propertyImagePreview, setPropertyImagePreview } = useContext(BuyerContext)

    //used to track the direction a next image enters from and prev image enters from
    const [direction, setDirection] = useState('next')

    //fetches the setpropertypreview from context so as to use it to close preview when close button is clicked 

    // gets the property images been added to the state in the BuyerContext from dashboardContent
    const images = propertyImagePreview

    const handleNext = () => {
        if(index < (images.length - 1)) {
            setIndex(prev => prev + 1)
            setDirection('next')
        }
    }

    const handlePrev = () => {
        if(index > 0){
            setIndex(prev => prev - 1)
            setDirection('prev')
        }
    }

    return (
        <div className="fixed left-0 top-0 bg-white w-screen h-screen z-50 flex flex-col justify-center items-center">
            <div className="h-full w-auto flex justify-center gap-2 items-center">
                <button onClick={handlePrev} className={index < 1 ? 'cursor-not-allowed text-[#AAAAAA]' : 'hover:text-primaryColor'} >
                    <GrCaretPrevious className="text-2xl" />
                </button>
                <div className="h-full w-auto flex flex-col justify-center overflow-hidden items-center">
                    <button title="close" className="text-white self-end mr-8" onClick={() => setPropertyImagePreview([])}>
                        <LiaTimesSolid className="text-lg font-extrabold text-[#B41C11]" />
                    </button>
                    
                    <AnimatePresence custom={index} initial={false} mode="wait" >
                        <motion.img
                            initial={{x: direction === 'next' ? 300 : -300}}
                            animate={{x: 0}}
                            exit={{x: direction === 'next' ? -300 : 300}}
                            transition={{duration: 0.3, type: 'spring', stiffness: 150, damping: 30}}
                            key={index}
                            src={images[index]} 
                            alt="property images" 
                            className="object-contain h-auto w-auto min-h-[95%] min-w-[95%] max-h-[95%] max-w-[95%]" 
                        />
                    </AnimatePresence>
                </div>
                <button onClick={handleNext} className={index === (images.length - 1) ? 'cursor-not-allowed text-[#AAAAAA]' : 'hover:text-primaryColor'} >
                    <GrCaretNext className="text-2xl" />
                </button>
            </div>
            <span>{index + 1}/{propertyImagePreview.length}</span>
        </div>
    );
}
 
export default PropertyImagePreview;