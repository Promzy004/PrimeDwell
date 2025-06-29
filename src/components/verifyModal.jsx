import { useState } from "react";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyModal = ({fetchEmail}) => {

    const [loading, setLoading] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')
    const [errors, setErrors] = useState('')
    const [success, setSuccess] = useState('')

    const email = fetchEmail

    const navigate = useNavigate()

    const validate_input = () => {
        const regex = /[0-9]{6}/

        let error = '';
        if(!verificationCode){
            error = 'verification code is required'
            // setErrors('verification code is required')
        } else if (!regex.test(verificationCode)){
            error = 'Code must be 6 digits only'
            // setErrors('Code must be 6 digits only')
        } else{
            error = ''
        }

        return error;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validatedError = validate_input();
        setErrors(validatedError)

        console.log(errors)

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

        if(validatedError === ''){
            console.log('triggered')
            setLoading(true)
            await delay(3000)

            try{
                const response = await axios.post('http://127.0.0.1:8000/api/verify', {
                    otp: verificationCode,
                    email: email
                })
                setSuccess(response.data.message);
                console.log(response.data.message)
                setTimeout(() => {
                    navigate('/login')
                    setSuccess('')
                }, 5000)
                setLoading(false)
                console.log(response)
            } catch(error) {
                setErrors(error.response.data.message)
                setLoading(false)
                console.log(error)
            }
        }

    }

    return (
        <div className="fixed z-20 top-0 left-0 flex items-center justify-center w-full h-screen bg-black/30 backdrop-blur-sm">
            <div className="flex flex-col  gap-5 w-96 rounded-2xl bg-white px-5 py-5">
                <form action="" method="post" className="flex flex-col gap-5 py-4 items-center justify-center" onSubmit={handleSubmit}  >
                    <div className="flex flex-col justify-center items-center gap-4 mb-8 text-center">
                        <h2 className="text-4xl font-semibold">Email Verification</h2>
                        <p>A six digits code have been sent to your email (<span className="text-primaryColor">{email}</span>), input the code below to verify</p>
                    </div>
                    {!success ?
                        <div className="flex flex-col gap-2 items-center duration-200">
                            <div className="flex flex-col">
                                <input type="text" name="otp" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} className={`focus:outline-none border px-2 py-1 ${errors ? 'border-red-400' : 'border-primaryColor'}`} />
                                <span className={errors ? 'text-xs text-red-400': 'text-xs'} >{errors}</span>
                            </div>
                            {loading ? 
                                <button disabled className="bg-primaryColor flex justify-center items-center self-center px-5 py-2  text-base text-white mt-4 duration-200 cursor-wait">
                                    <BeatLoader color="#fff" loading={loading} size={10} />
                                </button>
                                :
                                <input type="Submit" value='Verify' className="bg-primaryColor flex justify-center items-center self-center px-5 py-1 text-base text-white mt-4 duration-200 hover:bg-[#067bc9] hover:scale-105 cursor-pointer" />
                            }
                        </div>
                        :
                        <div className="flex flex-col gap-1 items-center">
                            <span className="text-green-500 text-3xl mb-2">{success}</span>
                            <p>Redirecting to login page</p>
                            <button disabled className="flex justify-center items-center self-center px-5 py-2  text-base text-white mt-4 duration-200 cursor-wait">
                                <BeatLoader color="#0984E3" loading={true} size={10} />
                            </button>
                        </div>
                    }
                </form>
            </div>
        </div>
    );
}
 
export default VerifyModal;