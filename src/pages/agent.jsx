import { useState } from "react";
import { agents } from "../assets/data/data";
import AgentCard from "../components/cards/agentCard";
import PagesHero from "../components/pagesHero";
import SeeMoreButton from "../components/seeMoreButton";

const Agents = () => {

    const [agentIndex, setAgentIndex] = useState(9);
    
    const handleAgentsShowMore = () => {
        setAgentIndex((prev) => prev + 3);
    }

    const handleAgentsShowLess = () => {
        setAgentIndex((prev) => prev - 3);
    }
    
    return (
        <div>
            <PagesHero title='Our Talented Agents' page='Agents' />
            <div className="flex flex-col gap-12 justify-center items-center md:py-20 py-14">
                <div className="lg:w-[70%] md:w-[80%] sm:w-[75%] w-[90%] grid md:grid-cols-3 sm:grid-cols-2 lg:gap-7 grid-cols-1 justify-items-center items-center sm:gap-4 gap-8">
                    {agents.slice(0, agentIndex).map((agent, index) => (
                        <AgentCard id={agent.id} key={index} image={agent.image} name={agent.name} instagram={agent.instagram} linkendIn={agent.linkedIn} pinterest={agent.pinterest} />
                    ))}
                </div>
                <div className="flex gap-10">
                    {(agentIndex < agents.length)&& (
                        <button className="bg-primaryColor duration-300 hover:text-white/70 text-white px-6 py-3 text-sm" onClick={handleAgentsShowMore}>See More Agents</button>
                    )}
                    {agentIndex > 9 && (
                        <button className="bg-gray-400 duration-300 hover:text-white/70 text-white px-6 py-3 text-sm" onClick={handleAgentsShowLess}>Show less</button>
                    )}
                </div>
                {/* <SeeMoreButton index={agentIndex} data_length={agents.length} handleShowMore={handleAgentsShowMore} handleShowLess={handleAgentsShowLess} /> */}
            </div>
        </div>
    );
}
 
export default Agents;