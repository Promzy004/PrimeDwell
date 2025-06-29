import PagesHero from "../components/pagesHero";

const Contact = () => {
    return (
        <>
            <PagesHero title='Contact Us' page='Contact' />
            <div className="md:py-20 py-14 lg:w-[70%] md:w-[80%] sm:w-[75%] w-[90%] flex flex-col items-center gap-14 mx-auto">
                <div className="flex flex-col items-center gap-8">
                    <h3 className="relative pb-2 lg:text-3xl text-2xl font-medium before:content-[''] before:h-[3px] before:w-12 before:bg-primaryColor before:absolute before:left-[calc(50%-1.5rem)] before:bottom-0">Get In Touch</h3>
                    <p className="md:text-base text-sm text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum illo optio perferendis quaerat hic dolorum labore incidunt voluptatum facilis, libero numquam velit magni suscipit blanditiis.</p>
                </div>
                <div className="w-full">
                    <form action="" method="post" className="w-full flex flex-col justify-center items-center md:gap-5 gap-3 border rounded-sm md:py-14 sm:py-12 py-8">
                        <div className="flex flex-col gap-8 sm:w-[80%] w-[90%]">
                            <label className="flex flex-col gap-1 lg:text-base md:text-sm text-sm font-light">
                                Full Name
                                <input type="text" className="hero-input focus:border-primaryColor/50" placeholder="Type Full Name" />
                            </label>
                            <label className="flex flex-col gap-1 lg:text-base md:text-sm text-sm font-light">
                                Email Address
                                <input type="text" className="hero-input focus:border-primaryColor/50" placeholder="Email Adreess" />
                            </label>
                            <label className="flex flex-col gap-1 lg:text-base md:text-sm text-sm font-light">
                                Subject
                                <input type="password" className="hero-input focus:border-primaryColor/50" placeholder="Password" />
                            </label>
                            <label className="flex flex-col gap-1 lg:text-base md:text-sm text-sm">
                                Message
                                <textarea name="" id="" rows='15' className="hero-input focus:border-primaryColor/50" placeholder="Type Message"></textarea>
                            </label>
                            <input type="Submit" value='Send Message' className="bg-primaryColor self-start sm:px-7 sm:py-2 px-4 py-2 flex text-sm text-white mt-4 hover:text-color3 cursor-pointer" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
 
export default Contact;