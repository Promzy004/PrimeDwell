const SeeMoreButton = ({index, data_length, handleShowMore, handleShowLess}) => {
    // console.log(data);
    // console.log(index)
    // console.log(typeof(data_length) + ' data')
    // console.log(typeof(index) + ' index')
    console.log({index})
    return (
        <div className="flex gap-10">
            <div className="flex gap-10">
                {(index < data_length) && (
                    <button className="bg-primaryColor duration-300 hover:text-white/70 text-white px-6 py-3 text-sm" onClick={handleShowMore}>See More Property</button>
                )}
                {index > 2 && (
                    <button className="bg-gray-400 duration-300 hover:text-white/70 text-white px-6 py-3 text-sm" onClick={handleShowLess}>Show less</button>
                )}
            </div>
        </div>
    );
}
 
export default SeeMoreButton;