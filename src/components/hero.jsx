
const Hero = () => {
    return (
        <div className="hero sm:mt-[105px] mt-[100px] relative min-h-[35rem] flex flex-col gap-5 justify-center items-center">
            <h2 className="text-white md:text-4xl text-2xl font-semibold">Find Your Dream Properties</h2>
            <div className="bg-white lg:w-[65%] md:w-[80%] w-[80%] p-5 flex flex-col gap-5">
                <h3 className="relative pb-1 md:text-lg text-base font-medium before:content-[''] before:bg-primaryColor before:absolute before:left-0 before:bottom-0 before:h-1 before:w-10 ">Search Your Properties</h3>
                <form action="" className="grid lg:grid-cols-[4fr_4fr_4fr_2fr] md:grid-cols-2 grid-cols-1 lg:gap-2 md:gap-3 gap-5 text-sm">
                    <label className="flex flex-col gap-1">
                        Looking For
                        <input type="text" className="hero-input" placeholder="Property Type" />
                    </label>
                    <label className="flex flex-col gap-1">
                        Property Size
                        <input type="text" className="hero-input" placeholder="Property Size" />
                    </label>
                    <label className="flex flex-col gap-1">
                        Property Location
                        <input type="text" className="hero-input" placeholder="Type Location" />
                    </label>
                    <input type="Submit" value='Search' className="lg:w-full w-[50%] bg-primaryColor px-7 py-2 flex self-end text-sm text-white" />
                </form>
            </div>
        </div>
    );
}
 
export default Hero;