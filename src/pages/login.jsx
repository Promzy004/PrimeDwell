import { Link, useNavigate } from "react-router-dom";
import PagesHero from "../components/pagesHero";
import { useContext, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "../context/authContext";
import Header from "../components/header";
import Footer from "../components/footer";

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const { fetchUser } = useContext(AuthContext)

    const handleChange = (e) => {
        console.log(formData.password)
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const validate_form = () => {
        const validate_errors = {}

        //validate email
        if(!formData.email.trim()) {
            validate_errors.email = 'Email is required'
        } 

        //validate password
        if(!formData.password.trim()){
            validate_errors.password = 'Password is required'
        } 

        return validate_errors
    }

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation_errors = validate_form()
        setErrors(validation_errors)

        if(Object.keys(validation_errors).length === 0){
            setLoading(true)
            await delay(5000)
            try{
                const response = await axios.post('http://127.0.0.1:8000/api/login', {
                    email: formData.email.trim().toLowerCase(),
                    password: formData.password.trim()
                })
                localStorage.setItem('token', response.data.access_token)

                //fetch user information using AuthContext when logged in
                await fetchUser()

                //reset form data when form is submitted correctly
                setFormData({
                    email: '',
                    password: '',
                })
                setLoading(false)
            } catch (error) {
                setErrors(error?.response?.data || {});
                if(error.status == 422){
                    setErrors(error?.response?.data?.errors)
                }
                setLoading(false)
            }
        }
    }

    return (
        <>
            <Header />
            <PagesHero title='Account Login' page='Login' />
            <div className="md:py-20 py-14 lg:w-[60%] md:w-[70%] sm:w-[75%] w-[90%] mx-auto">
                <form action="" method="post" onSubmit={handleSubmit} className="flex flex-col justify-center items-center md:gap-5 gap-3 border rounded-sm shadow-md shadow-blue-50 md:py-14 sm:py-12 py-8">
                    <h3 className="relative md:pb-7 pb-5 lg:text-4xl md:text-3xl text-2xl font-medium">Login Your Account</h3>
                    <div className="flex flex-col gap-5 sm:w-[80%] w-[90%]">
                        <label className="flex flex-col gap-1 lg:text-base md:text-sm text-sm font-light">
                            Email Address
                            <input type="email" className={(errors.email || errors.message )? 'hero-input border-red-500 focus:border-red-500' : 'hero-input border-gray-300 focus:border-primaryColor/50'} name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email Address" />
                            <span className="text-red-500 text-xs">{errors.email || errors.message}</span>
                        </label>
                        <label className="flex flex-col gap-1 lg:text-base md:text-sm text-sm font-light">
                            Password
                            <div className="flex items-center gap-3 ">
                                <input type={showPassword ? 'text' : "password"} className={(errors.password || errors.message) ? 'hero-input border-red-500 focus:border-red-500' : 'hero-input border-gray-300'} name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" />
                                {showPassword ? 
                                    <BsEye className="text-xl" onClick={() => setShowPassword(!showPassword)} />
                                    :
                                    <BsEyeSlash className="text-xl" onClick={() => setShowPassword(!showPassword)} />
                                }
                            </div>
                            <span className="text-red-500 text-xs">{errors.password || errors.message}</span>
                        </label>
                        {loading ? 
                            <button disabled className="bg-primaryColor flex justify-center items-center self-center w-52 h-10 text-base text-white mt-4 duration-200 cursor-wait">
                                <BeatLoader color="#fff" loading={loading} size={10} />
                            </button>
                            :
                            <input type="Submit" value='Login Account' className="bg-primaryColor flex justify-center items-center self-center w-52 h-10 text-base text-white mt-4 duration-200 hover:bg-[#067bc9] hover:scale-105 cursor-pointer" />
                        }
                    </div>
                    <p className="md:text-sm text-xs">Don't have an account? <Link to='/register' className="text-primaryColor hover:underline">Sign Up</Link> </p>
                </form>
            </div>
            <Footer />
        </>
    );
}
 
export default Login;