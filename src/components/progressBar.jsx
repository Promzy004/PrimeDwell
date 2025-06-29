import { AnimatePresence, motion } from "framer-motion";

const ProgressBar = ({progress, style}) => {

    const showProgress = progress < 110

    return (
        <>
            <motion.div
                initial={{width: 0}}
                animate={{width: `${progress}%`}}
                transition={{type: 'tween', ease: 'linear'}}
                className={`h-[2px] bg-red-400 absolute top-0 left-0 z-50 transition-all duration-1000 ${style}`}
            ></motion.div>
        </>
    );
}
 
export default ProgressBar;