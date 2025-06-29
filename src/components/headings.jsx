const Headings = ({title, desc}) => {
    return (
        <div className="text-center lg:w-[50%] md:w-[60%] sm:w-[70%] w-[85%] flex flex-col gap-3">
            <h2 className="md:text-4xl text-2xl font-semibold">{title}</h2>
            <p className="md:text-base text-sm font-light">{desc}</p>
        </div>
    );
}
 
export default Headings;