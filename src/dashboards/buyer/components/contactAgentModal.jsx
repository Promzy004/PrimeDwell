import axios from "axios";
import { useContext, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { AuthContext } from "../../../context/authContext";
import { motion, AnimatePresence } from "framer-motion";
import { BeatLoader } from "react-spinners";

const ContactAgentModal = ({propertyClicked, closeContactModal}) => {

    const { user } = useContext(AuthContext);
    //destructuring so as to get the object value in the array
    const [ property ] = propertyClicked

    const [ buyerMessage, setBuyerMesssage ] = useState('')
    const [ messageSuccessful, setMessageSucceful ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const property_id = property.id;
    const buyer_name = user.firstname + ' ' + user.lastname
    const buyer_email = user.email

    const handleSubmitMessage = async () => {
        setLoading(true)
        const response = await axios.post(`http://127.0.0.1:8000/api/buyer/message-agent/${property_id}`,{
            buyer_email: buyer_email,
            buyer_name: buyer_name,
            buyer_message: buyerMessage,
        })

        setLoading(false)
        setMessageSucceful(response?.data?.message)

        console.log(response)
    }

    const handleCloseMessage = () => {
        closeContactModal()
        setMessageSucceful('')
    }

    return (
        <>
            {!messageSuccessful ? 
                <div className="pl-[calc(288px+15%)] fixed z-20 top-0 left-0 flex items-center w-full h-screen bg-black bg-opacity-20 backdrop-blur-sm">
                    <div className="flex flex-col  gap-6 w-[80%] rounded-2xl bg-white px-5 py-5">
                        <button onClick={closeContactModal} title="close" className="self-end">
                            <LiaTimesSolid className="text-lg font-extrabold text-[#B41C11]" />
                        </button>
                        <div className="w-full flex flex-col gap-1">
                            <textarea onChange={(e) => setBuyerMesssage(e.target.value)} value={buyerMessage} name="message" rows='7' id="" className="w-full focus:outline-none border-2 border-primaryColor rounded-md px-3 py-2" placeholder="Input your message"></textarea>
                            <span className="text-xs text-[#B41C11] self-end">You will get a follow up email from the agent.</span>
                        </div>
                        {loading ? 
                            <button onClick={handleSubmitMessage} className="self-end flex cursor-progress items-center justify-center border-[1.5px] text-white border-none bg-primaryColor w-32 h-8 rounded-md text-sm mt-4">
                                <BeatLoader color="#fff" loading={loading} size={10} />
                            </button>
                            :
                            <button onClick={handleSubmitMessage} className="self-end flex items-center justify-center border-[1.5px] text-white border-none bg-primaryColor w-32 h-8 rounded-md text-sm mt-4">
                                Send Email
                            </button>
                        }
                    </div>
                </div>
                :
                <AnimatePresence>
                    {messageSuccessful && (
                        <motion.div
                        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm w-full"
                                initial={{ y: "-100vh", opacity: 0 }}
                                animate={{ y: "0",opacity: 1}}
                                transition={{ delay: 0.2 }}
                                exit={{ y: "-100vh",opacity: 0}}
                            >
                                <h2 className="text-2xl font-semibold mb-2">✅ Email Sent!</h2>
                                <p className="text-gray-600 mb-4">{messageSuccessful}</p>
                                <button
                                    onClick={handleCloseMessage}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Close
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            }
        </>
    );
}
 
export default ContactAgentModal;