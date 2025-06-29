import { useParams } from "react-router-dom";
import hero from "../assets/images/pageshero.png";

const PagesHero = ({title, page}) => {

    return (
            <>
                <div className="test relative md:py-20 sm:py-20 py-12 sm:mt-[105px] mt-[100px] flex justify-center items-center gap-7 before:content-[''] before:absolute before:h-full before:w-full before:bg-[#33485C] before:opacity-80" style={{background: `url(${hero})`, backgroundPosition: 'Center', backgroundSize: 'cover', backgroundRepeat : 'no-repeat'}}>
                    <div className="z-20 flex flex-col sm:gap-2 gap-1">
                        <h2 className="text-white lg:text-4xl sm:text-3xl text-xl font-semibold">{title}</h2>
                        <div className="text-color2 md:text-base sm:text-sm text-xs flex justify-center items-center md:gap-3 gap-2 py-1">
                            <h3>Home</h3>
                            <div className="w-[1px] md:h-4 h-3 bg-neutral-200"></div>
                            <h3 className="text-primaryColor">{page}</h3>
                        </div>
                    </div>
                    
                </div>
            </>
    );
}
 
export default PagesHero;