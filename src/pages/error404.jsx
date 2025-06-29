import { useNavigate } from "react-router-dom";

const Error404 = () => {


    const navigate = useNavigate()

    return (
        <div className="sm:mt-[105px] mt-[100px] md:py-20 py-14 bg-primaryColor/10">
            <div className="flex flex-col gap-7 justify-center items-center sm:w-[22rem] w-[14rem] mx-auto">
                <div className="relative w-full flex justify-center items-end">
                    <h3 className="sm:text-[10rem] sm:leading-none text-8xl font-semibold">404</h3>
                    <div className="bg-primaryColor w-full sm:h-16 h-10 absolute left-0 bottom-0 -z-10"></div>
                </div>
                <div className="flex flex-col justify-center gap-2 items-center">
                    <h4 className="sm:text-xl tex-lg font-medium">Sorry Page Not Found</h4>
                    <p className="text-center sm:text-sm text-xs font-light">
                        We are sorry. The page you are looking for does not exist. <br />
                        It might have been moved or deleted.
                    </p>
                </div>
                <button onClick={() => navigate('/')} className="bg-primaryColor text-white py-2 px-4 hover:text-white/70">Back To Home Page</button>
            </div>
        </div>
    );
}
 
export default Error404;