import { LiaTimesSolid } from "react-icons/lia";

const ContactAgentModal = ({propertyClicked, closeContactModal}) => {

    //destructuring so as to get the object value in the array
    const [ propertyy ] = propertyClicked

    const handleSubmitMessage = async () => {
        // const response = await 
    }

    return (
        <div className="pl-[calc(288px+15%)] fixed z-20 top-0 left-0 flex items-center w-full h-screen bg-black/30 backdrop-blur-sm">
            <div className="flex flex-col  gap-6 w-[80%] rounded-2xl bg-white px-5 py-5">
                <button onClick={closeContactModal} title="close" className="self-end">
                    <LiaTimesSolid className="text-lg font-extrabold text-[#B41C11]" />
                </button>

                <div className="w-full flex flex-col gap-1">
                    <textarea name="message" rows='7' id="" className="w-full focus:outline-none border-2 border-primaryColor rounded-md px-3 py-2" placeholder="Input your message"></textarea>
                    <span className="text-xs text-[#B41C11] self-end">You will get a follow up email from the agent.</span>
                </div>
                
                <button onClick={handleSubmitMessage} className="self-end border-[1.5px] text-white border-none bg-primaryColor px-7 py-[3px] rounded-md text-sm mt-4">
                    Send Email
                </button>
            </div>
        </div>
    );
}
 
export default ContactAgentModal;