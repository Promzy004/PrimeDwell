import Hero from "../components/hero";
import img1 from "../assets/images/section1-img.png";
import { FaHome } from "react-icons/fa";
import { MdAddHome } from "react-icons/md";
import ServiceCard from "../components/cards/serviceCard";
import { agents, services } from "../assets/data/data";
import Headings from "../components/headings";
import { properties } from "../assets/data/data";
import { useState } from "react";
import NewsLetter from "../components/newsletter";
import AgentCard from "../components/cards/agentCard";
import { useNavigate } from "react-router-dom";
import SeeMoreButton from "../components/seeMoreButton";
import PropertyCard from "../components/cards/propertyCard";
import Header from "../components/header";
import Footer from "../components/footer";

const Home = () => {

    const [featureIndex, setFeatureIndex] = useState(2);

    const handleFeatureShowMore = () => {
        setFeatureIndex((prev) => prev + 2);
    }

    const handleFeatureShowLess = () => {
        setFeatureIndex((prev) => prev - 2);
    }

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/agents')
        window.scrollTo(0,0)
    }

    const headings = [
        {
            title: 'Our Feature Property',
            desc: 'There are many variations of passages of Lorem Ipsum available but the this is in majority have suffered alteration in some'
        },
        {
            title: 'Meet Our Popular Agents',
            desc: 'There are many variations of passages of Lorem Ipsum available but the this is in majority have suffered alteration in some'
        }
    ]

    return (
        <>
            <Header />
            <Hero />
            <section className="flex justify-center items-center md:py-20 py-20">
                <div className="lg:w-[70%] md:w-[80%] sm:w-[75%] w-[90%] flex flex-col gap-14 justify-center items-center">
                    <div className="w-full grid md:grid-cols-2 grid-cols-1 md:gap-20 gap-14 justify-items-center items-center mb-6">
                        <div className="relative lg:h-full  justify-center items-center bg-red-300 md:row-start-auto row-start-2 md:mr-0 mr-6">
                            <div className="h-full w-full absolute border-8 border-primaryColor top-6 left-6">
                                <div className="absolute w-[45%] h-[45%] p-2 bg-primaryColor right-0 bottom-0 text-white flex flex-col justify-center items-center text-center gap-2">
                                    <span className="lg:text-4xl md:text-3xl text-2xl font-semibold">38+</span>
                                    <span className="lg:text-xl md:text-lg text-base">Years of experience</span>
                                </div>
                            </div>
                            <img src={img1} alt="" className="h-full w-full" />
                        </div>
                        <div className="flex flex-col lg:gap-5 md:gap-3 gap-4 md:row-start-auto row-start-1">
                            <h3 className="lg:text-2xl md:text-xxl text-lg font-semibold">Are You Looking Best Property Near You? Contact Us</h3>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-primaryColor lg:text-lg text-base">Who We Are</h4>
                                <div className="lg:text-base text-sm font-light flex flex-col gap-2">
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page When looking at its layout. The point of using Lorem Ipsum is that it has normal distribution.</p>
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex justify-center items-center gap-3">
                                    <MdAddHome  className="text-5xl text-primaryColor p-2 bg-primaryColor/10"/>
                                    <div className="flex flex-col">
                                        <span className="text-base font-medium">332+</span>
                                        <span className="text-xs font-light">Property Listed</span>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center gap-3">
                                    <FaHome className="text-5xl text-primaryColor p-2 bg-primaryColor/10" />
                                    <div className="flex flex-col">
                                        <span className="text-base font-medium">158+</span>
                                        <span className="text-xs font-light">Property Sold</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-neutral-300"></div>
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-7 gap-10">
                        {services.map((service, index) => (
                            <ServiceCard key={index} title={service.title} body={service.body} Icon={service.icon} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-12 justify-center items-center md:py-20 py-14 bg-color2">
                <Headings title={headings[0]['title']} desc={headings[0]['desc']} />
                <div className="lg:w-[70%] md:w-[80%] sm:w-[75%] w-[90%] grid md:grid-cols-2 grid-cols-1 md:gap-7 gap-10">
                    {properties.slice(0, featureIndex).map((feature, index) => (
                        <PropertyCard key={index} id={feature.id} image={feature.image} title={feature.title} desc={feature.desc} bed={feature.bed} bath={feature.bath} rooms={feature.rooms} sq={feature.sq} price={feature.price} />
                    ))}
                </div>
                <div className="flex gap-10">
                    {(featureIndex < properties.length)&& (
                        <button className="bg-primaryColor duration-300 hover:text-white/70 text-white sm:px-6 px-4 sm:py-3 py-2 text-sm" onClick={handleFeatureShowMore}>See More Property</button>
                    )}
                    {featureIndex > 2 && (
                        <button className="bg-gray-400 duration-300 hover:text-white/70 text-white sm:px-6 px-4 sm:py-3 py-2 text-sm" onClick={handleFeatureShowLess}>Show less</button>
                    )}
                </div>
                {/* <SeeMoreButton index={featureIndex} data_length={features.length} handleShowMore={handleFeatureShowMore} handleShowLess={handleFeatureShowLess} /> */}
            </section>

            <section className="">
                <NewsLetter />
            </section>

            <section className="flex flex-col gap-12 justify-center items-center md:py-20 py-14">
                <Headings title={headings[1]['title']} desc={headings[1]['desc']} />
                <div className="lg:w-[70%] md:w-[80%] sm:w-[75%] w-[90%] grid md:grid-cols-3 sm:grid-cols-2 lg:gap-7 grid-cols-1 justify-items-center items-center sm:gap-4 gap-8">
                    {agents.slice(0, 3).map((agent, index) => (
                        <AgentCard id={agent.id} key={index} image={agent.image} name={agent.name} instagram={agent.instagram} linkendIn={agent.linkedIn} pinterest={agent.pinterest} />
                    ))}
                </div>
                <button className="bg-primaryColor duration-300 hover:text-white/70 text-white px-6 py-3 text-sm" onClick={handleClick}>See All Agents</button>
            </section>
            <Footer />
        </>
    );
}
 
export default Home;