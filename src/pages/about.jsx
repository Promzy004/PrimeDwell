import { useLocation } from "react-router-dom";
import PagesHero from "../components/pagesHero";

const About = () => {


    return (
        <>
            <PagesHero title='About Us' page='about' />
            <div className="md:py-20 py-14 flex justify-center items-center">About page</div>
        </>
    );
}
 
export default About;