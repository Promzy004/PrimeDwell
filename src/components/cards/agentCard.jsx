import { FaInstagram, FaLinkedin, FaPinterest } from "react-icons/fa";
import agent1 from "../../assets/images/agents/agent1.png";
import { useNavigate } from "react-router-dom";

const AgentCard = ({image = agent1, name, instagram, linkendIn, pinterest, id}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/agent-details/${id}`);
        window.scrollTo(0, 0);
    }

    return (
        <div onClick={handleClick} className="sm:w-full w-[90%] hover:border-primaryColor bg-white border rounded-md cursor-pointer drop-shadow-md flex flex-col items-center gap-3 py-10 hover:scale-105 duration-500">
            <img src={image} alt="agent image" loading="lazy" className="h-20 w-20 rounded-full" />
            <div className="flex flex-col items-center gap-1">
                <h2 className="text-base font-medium">{name}</h2>
                <p className="mb-1 text-xs text-neutral-400">Agents</p>
                <span className="flex gap-2 text-lg">
                    <a href={instagram} target="_blank" className="hover:text-red-600">
                        <FaInstagram />
                    </a>
                    <a href={linkendIn} target="_blank" className="hover:text-primaryColor">
                        <FaLinkedin />
                    </a>
                    <a href={pinterest} target="_blank" className="hover:text-[#E60023]">
                        <FaPinterest />
                    </a>
                </span>
            </div>
        </div>
    );
}
 
export default AgentCard;