import { Link, useNavigate } from "react-router-dom";
import PagesHero from "../components/pagesHero";
import axios from "axios";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { BeatLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import VerifyModal from "../components/verifyModal";
import avatar from '../assets/images/avatar.jpeg'
import Header from "../components/header";
import Footer from "../components/footer";

const Register = () => {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        role: 'buyer',
        phone: '',
        password: '',
        cpassword: '',
    })

    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [showCpassword, setShowCpassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState({})
    const [verify, setVerify] = useState({
        modal: false,
        verification_email: '',
    })

    const [profileImage, setProfileImage] = useState(avatar)
    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        // const input = e.target.value
        // const capitalize = input.charAt(0).toUpperCase() + input.slice(1);
        setFormData({...formData, [e.target.name]:e.target.value})
        // console.log(capitalize)
        // console.log(e.target.value)
    }


    const handleRole = (e) => {
        console.log(e)
        if(e.target.checked == true){
            setFormData({...formData, role:'agent'})
        } else {
            setFormData({...formData, role:'buyer'})
        }
    }

    const handleImageChange = (e) => {
        // const files = e.target.files;
        // const temp_paths = [...files].map(file => (
        //     URL.createObjectURL(file)
        // ))
        // setProfileImage(temp_paths)

        const file = e.target.files[0];
        const temp_path = URL.createObjectURL(file)
        setProfileImage(temp_path)
        setImage(file)
    }

    const validate_form = () => {
        const validate_errors = {}

        //Phone number validation
        const phone_regex = /^(0[789][01]\d{8})$|^(\+234(\s)?[789][01]\d{8})$/
        const phone_test = phone_regex.test(formData.phone)

        if(!formData.phone.trim()){
            validate_errors.phone = 'Phone number required'
        } else if (!phone_test) {
            validate_errors.phone = 'Invalid Phone number enter'
        }

        //email validation
        const email_regex = /^([a-z]+(\.?)(\w+)?@[a-z]+(-?)(\w+)?(\.[a-z]+)+)$/i
        const email_test = email_regex.test(formData.email)

        if(!formData.email.trim()) {
            validate_errors.email = 'Email is required'
        } else if (!email_test) {
            validate_errors.email = 'Invalid Email Address'
        }

        //firstname validation
        if(!formData.firstname.trim()) {
            validate_errors.firstname = 'Firstname is required'
        }

        //lastname validation
        if(!formData.lastname.trim()) {
            validate_errors.lastname = 'Lastname is required'
        }

        //password validation
        const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@,%$#:])[a-zA-Z0-9@,%$#:]{8,}$/i
        const password_test = password_regex.test(formData.password)

        if(!formData.password.trim()){
            validate_errors.password = 'Password is required'
        } else if (!password_test) {
            validate_errors.password = 'Password must contain capital letter, small letter, number and special chars'
        } else if (formData.password !== formData.cpassword) {
            validate_errors.password = 'password and confirm password does not match'
            validate_errors.cpassword = 'password and confirm password does not match'
        }

        //confirm password validation
        if(!formData.cpassword.trim()){
            validate_errors.cpassword = 'Confirm password is required'
        }


        //returns all validate error, or empty array if none is found 
        return validate_errors;
    }

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    const handleSubmit = async(e) => {
        //prevent form refresh
        e.preventDefault();

        //add the retun value of the validate_form function in a variable
        const validation_errors = validate_form()

        //adding the errors in a setErrors state
        setErrors(validation_errors)
        console.log(errors)
        console.log(Object.keys(validation_errors).length)

        //condition statement, which state if there is no error then it should send a request to backend
        if(Object.keys(validation_errors).length === 0){
            setLoading(true)
            await delay(5000)
            // const data = new FormData()
            // data.append('firstname', formData.firstname.trim())
            // data.append('lastname', formData.lastname.trim())
            // data.append('phone_number', formData.phone.trim())
            // data.append('role', formData.role.trim())
            // data.append('email', formData.email.trim().toLowerCase())
            // data.append('password', formData.password.trim())
            // data.append('password', formData.password.trim())
            // data.append('profile_image', image)
            try{
                const response = await axios.post('http://127.0.0.1:8000/api/register', {
                    firstname: formData.firstname.trim(),
                    lastname: formData.lastname.trim(),
                    phone_number: formData.phone.trim(),
                    role: formData.role.trim(),
                    email: formData.email.trim().toLowerCase(),
                    password: formData.password.trim(),
                    profile_image: image,
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
                setLoading(false)
                console.log(response)

                //inserting the formData email into a variable, so it retains the
                // value when the formData email is set to empty string
                const email = formData.email
                console.log(email)
                
                //adding the user email in a state, so it could used in the verfication pop up modal
                setVerify(prev => ({
                    ...prev,
                    verification_email: email,
                    modal: true
                }))

                //passing the success response data to a success state
                setSuccess(response.data)
                // setTimeout(() => {
                //     setSuccess({})
                // },5000)

                //resetting form data after successful regestration
                setFormData(prev => ({
                    ...prev,
                    firstname: '',
                    lastname: '',
                    email: '',
                    role: 'buyer',
                    phone: '',
                    password: '',
                    cpassword: '',
                }))

                //makes the modal true so as to open the veification modal pop up
                // setVerify({...verify, modal:true})
                console.log(success.success)
                console.log(response);
            } catch (error) {
                setErrors(error?.response?.data?.errors || {})
                setLoading(false)
                console.log(error)
            }
        }
    }

    return (
        <>
            <Header />
            <PagesHero title='Account Register' page='Register' />
            <div className="md:py-20 py-14 lg:w-[60%] md:w-[70%] sm:w-[75%] w-[90%] mx-auto">
                <form action="" method="POST" className="relative flex flex-col justify-center items-center md:gap-5 gap-3 border rounded-sm shadow-md shadow-blue-50 md:py-14 sm:py-12 py-8" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <h3 className="relative md:pb-7 pb-5 lg:text-4xl md:text-3xl text-2xl font-medium">Create Your Account</h3>
                    <div className="flex flex-col gap-5 sm:w-[80%] w-[90%]">
                        <label className="w-full flex flex-col justify-center items-center gap-1 lg:text-base md:text-sm text-sm font-light">
                            <img src={profileImage} alt="" className="w-60" />
                            <div className="w-full flex flex-col gap-1 lg:text-base md:text-sm text-sm font-light">
                                Select Profile
                                <input type="file" accept="image/png,image/jpg,image/jpeg" className={(errors.firstname ) ? 'hero-input border-red-500 focus:border-red-500' : 'hero-input border-gray-300 focus:border-primaryColor/50'} placeholder="Enter First Name" name="firstname" onChange={handleImageChange} />
                                <span className="text-red-500 text-xs">{errors.firstname}</span>
                            </div>     
                        </label>
                        <div className="flex sm:flex-row gap-5 flex-col">
                            <label className="w-full flex flex-col gap-1 lg:text-base md:text-sm text-sm font-light">
                                First Name
                                <input type="text" className={(errors.firstname ) ? 'hero-input border-red-500 focus:border-red-500' : 'hero-input border-gray-300 focus:border-primaryColor/50'} placeholder="Enter First Name" name="firstname" value={formData.firstname} onChange={handleChange} />
                                <span className="text-red-500 text-xs">{errors.firstname}</span>
                            </label>
                            <label className="w-full flex flex-col gap-1 lg:text-base md:text-sm text-sm font-light">
                                Last Name
                                <input type="text" className={errors.lastname ? 'hero-input border-red-500 focus:border-red-500' : 'hero-input border-gray-300 focus:border-primaryColor/50'} placeholder="Enter Last Name" name="lastname" value={formData.lastname} onChange={handleChange} />
                                <span className="text-red-500 text-xs">{errors.lastname}</span>
                            </label>
                        </div>
                        <label className="flex flex-col gap-1 lg:text-base md:text-sm text-sm font-light">
                            Phone Number
                            <input type="tel" className={errors.phone ? 'hero-input border-red-500 focus:border-red-500' : 'hero-input border-gray-300 focus:border-primaryColor/50'} placeholder="Enter Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
                            <span className="text-red-500 text-xs">{errors.phone}</span>
                        </label>
                        <label className="flex flex-col gap-1 lg:text-base md:text-sm text-sm font-light">
                            Email Address
                            <input type="email" className={errors.email ? 'hero-input border-red-500 focus:border-red-500' : 'hero-input border-gray-300 focus:border-primaryColor/50'} placeholder="Email Adreess" name="email" value={formData.email} onChange={handleChange} />
                            <span className="text-red-500 text-xs">{errors.email}</span>
                        </label>
                        <label className="flex flex-col gap-1 lg:text-base md:text-sm text-sm font-light">
                            Password
                            <div className="flex items-center gap-3 ">
                                <input type={showPassword ? 'text' : "password"} className={errors.password ? 'hero-input border-red-500 focus:border-red-500' : 'hero-input border-gray-300'} placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                                {showPassword ? 
                                    <BsEye className="text-xl" onClick={() => setShowPassword(!showPassword)} />
                                    :
                                    <BsEyeSlash className="text-xl" onClick={() => setShowPassword(!showPassword)} />
                                }
                            </div>
                            <span className="text-red-500 text-xs">{errors.password}</span>
                        </label>
                        <label className="flex flex-col gap-1 lg:text-base md:text-sm text-sm font-light">
                            Confirm Password
                            <div className="flex items-center gap-3 ">
                                <input type={showCpassword ? 'text' : "password"} className={errors.cpassword ? 'hero-input border-red-500 focus:border-red-500' : 'hero-input border-gray-300'} placeholder="Confirm Password" name="cpassword" value={formData.cpassword} onChange={handleChange} />
                                {showCpassword ? 
                                    <BsEye className="text-xl" onClick={() => setShowCpassword(!showCpassword)} />
                                    :
                                    <BsEyeSlash className="text-xl" onClick={() => setShowCpassword(!showCpassword)} />
                                }
                            </div>
                            <span className="text-red-500 text-xs">{errors.cpassword}</span>
                        </label>
                        <label className="flex gap-2 lg:text-base md:text-sm text-sm font-light">
                            <input type="checkbox" className=" focus:border-primaryColor/50" placeholder="Confirm Password" name="role" onChange={handleRole}/>
                            select if registering as an agent
                        </label>
                        {loading ? 
                            <button disabled className="bg-primaryColor flex justify-center items-center self-center w-52 h-10 text-base text-white mt-4 duration-200 cursor-wait">
                                <BeatLoader color="#fff" loading={loading} size={10} />
                            </button>
                            :
                            <input type="Submit" value='Register Account' className="bg-primaryColor flex justify-center items-center self-center w-52 h-10 text-base text-white mt-4 duration-200 hover:bg-[#067bc9] hover:scale-105 cursor-pointer" />
                        }
                    </div>
                    <p className="md:text-sm text-xs">Have an account? <Link to='/login' className="text-primaryColor hover:underline">Sign in</Link> </p>

                    {/* <AnimatePresence>
                        {success.success && (
                            <motion.div 
                                className="absolute bg-[#e6ffed] py-7 px-12 flex flex-col gap-3 justify-center items-center"
                                initial={{opacity: 0, scale: 0}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{pacity: 0, scale: 0}}
                                transition={{duration: 1.5, type: 'spring', stiffness: 150}}
                            >
                                <h3 className="text-4xl text-[#2f855a]">{success.message}</h3>
                                <Link to='/login' className="text-primaryColor text-lg hover:underline">Login here</Link>
                            </motion.div>
                        )}
                    </AnimatePresence> */}
                </form>
                {verify.modal && <VerifyModal fetchEmail={verify.verification_email} /> }
            </div>
            <Footer />
        </>
    );
}
 
export default Register;