import axios from "axios";
import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";
import { AgentContext } from "../../../context/agentContext";
import ProgressBar from "../../../components/progressBar";

const UploadModal = ({closeUpload, setUploaded}) => {

    const [formData, setFormData] = useState({
        title: '',
        property_type: '',
        location: '',
        price: '',
        description: '',
        bed: '',
        room: '',
        bath: '',
        square_meter: ''
    })

    const { setUpdate } = useContext(AgentContext)
    const [ progress, setProgress ] = useState(0)

    const [imagesPath, setImagesPath] = useState([])
    const [images, setImages] = useState([])
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
        console.log(formData)
    }
    
    const handleImageChange = (e) => {
        const files = e.target.files
        const file_paths = [...files].map((file) => (
            URL.createObjectURL(file)
        ))
        setImagesPath(file_paths)
        setImages([...files])
    }

    const validate = () => {

        const validate_errors = {}

        if(images.length < 1){
            validate_errors.images = 'You need to enter at least 1 image'
        }

        if(!formData.title) {
            validate_errors.title = 'Title is required'
        }

        if(!formData.property_type) {
            validate_errors.property_type = 'Property type is required'
        }

        if(!formData.location) {
            validate_errors.location = 'location is required'
        }

        if(!formData.price) {
            validate_errors.price = 'price is required'
        }

        if(!formData.description) {
            validate_errors.description = 'description is required'
        }

        if(!formData.bed) {
            validate_errors.bed = 'bed is required'
        }
        
        if(!formData.room) {
            validate_errors.room = 'room is required'
        }

        if(!formData.bath) {
            validate_errors.bath = 'bath is required'
        }

        if(!formData.square_meter) {
            validate_errors.square_meter = 'square meter is required'
        }

        return validate_errors;
    }

    const handleSubmit = async () => {
        const validated_errors = validate()
        setErrors(validated_errors)

        if (Object.keys(validated_errors) == 0) {
            const data = new FormData()
            data.append('title', formData.title);
            data.append('property_type', formData.property_type);
            data.append('location', formData.location);
            data.append('price', Number(formData.price));
            data.append('description', formData.description);
            data.append('bed', Number(formData.bed));
            data.append('room', Number(formData.room));
            data.append('bath', Number(formData.bath));
            data.append('square_meter', formData.square_meter);
            images.forEach((image) => {
                data.append('images[]', image)
            });

            const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

            try{
                setProgress(30)
                await delay (3000)
                const response = await axios.post('http://127.0.0.1:8000/api/upload', data , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                setProgress(100)
                console.log(response)
                // alert(response.data.message)
                // setFormData(prev => ({
                //     ...prev,
                //     title: '',
                //     property_type: '',
                //     location: '',
                //     price: '',
                //     description: '',
                //     bed: '',
                //     room: '',
                //     bath: '',
                //     square_meter: ''
                // }))
                setUpdate(`${Math.random()}`)
                closeUpload()

                setUploaded(response?.data?.message) 
                setTimeout(() => {
                    setUploaded('')
                }, 2000);
                setImages(prev => [...prev, []])
            } catch (error) {
                setProgress(0)
                setErrors(error?.response?.data?.errors)
                // console.log(error.response.data.message)
            }
        }
    }

    return (
        <div className="pl-[calc(288px+15%)] box-border fixed z-20 top-0 left-0 flex items-center w-full h-screen bg-black/30 backdrop-blur-sm">
            <ProgressBar progress={progress}/>
            <div className="flex flex-col  gap-5 w-[75%] min-h-[60%] rounded-2xl bg-white px-5 py-5">
                <button onClick={closeUpload} title="close" className="self-end">
                    <LiaTimesSolid className="text-lg font-extrabold text-[#B41C11]" />
                </button>
                <form action="" method="post" encType="multipart/form-data" className="flex flex-col gap-7">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 h-44 bg-gray-200 rounded-lg overflow-auto">
                            {imagesPath.length > 0 ? 
                                (imagesPath.map((imagePath, index) => (
                                    <img src={imagePath} alt="property images" key={index} className="h-full rounded-lg" />
                                )))
                                :
                                (<div className="w-[45%] bg-red-50 opacity-50 h-full rounded-lg"></div>)
                            }
                            <div className="h-full w-64 px-2 box-border bg-blue-50 rounded-lg opacity-70 flex justify-center items-center">
                                <label className="hover:cursor-pointer inline-flex items-center gap-2 text-primaryColor border-[1.5px] border-primaryColor px-7 py-[2px] rounded-md text-sm">
                                    <FaPlus />
                                    <span className='w-[73px]'>Add image</span>
                                    <input type="file" hidden name="images" accept="image/png, image/jpeg, image/jpg" id="" className="" onChange={handleImageChange} multiple required />
                                </label>
                            </div>
                        </div>
                        <span className="text-[#60B849] text-xs">Your first image will be used as your list thumbnail</span>
                        <span className="text-red-500 text-xs">{errors?.images}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <label className="flex flex-col">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm">Title</span>
                                <input type="text" name="title" value={formData.title} className="border border-primaryColor/50 text-xs py-1 px-2 focus:outline-none rounded-md" onChange={handleChange} />
                            </div>
                            <span className="text-red-500 text-[9px]">{errors?.title}</span>
                        </label>
                        <label className="flex flex-col">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm">Property Type</span>
                                <input type="text" name="property_type" value={formData.property_type} className="border border-primaryColor/50 text-xs py-1 px-2 focus:outline-none rounded-md" onChange={handleChange} />
                            </div>
                            <span className="text-red-500 text-[9px]">{errors?.property_type}</span>
                        </label>
                        <label className="flex flex-col">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm">Location</span>
                                <input type="text" name="location" value={formData.location} className="border border-primaryColor/50 text-xs py-1 px-2 focus:outline-none rounded-md" onChange={handleChange} />
                            </div>
                            <span className="text-red-500 text-[9px]">{errors?.location}</span>
                        </label>
                        <label className="flex flex-col">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm">Price</span>
                                <input type="number" name="price" value={formData.price} className="border border-primaryColor/50 text-xs py-1 px-2 focus:outline-none rounded-md" onChange={handleChange} />
                            </div>
                            <span className="text-red-500 text-[9px]">{errors?.price}</span>
                        </label>
                        <label className="flex flex-col col-span-2">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm">Description</span>
                                <textarea name="description" value={formData.description} id="" rows='7' className="border border-primaryColor/50 text-xs py-1 px-2 focus:outline-none rounded-md" onChange={handleChange}></textarea>
                            </div>
                            <span className="text-red-500 text-[10px]">{errors?.description}</span>
                        </label>
                        <div className="col-span-2 grid grid-cols-4 gap-3">
                            <label className="flex flex-col">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm">Bed</span>
                                    <input type="number" name="bed" value={formData.bed} className="border border-primaryColor/50 text-xs py-1 px-2 focus:outline-none rounded-md" onChange={handleChange} />
                                </div>
                                <span className="text-red-500 text-[8px]">{errors?.bed}</span>
                            </label>
                            <label className="flex flex-col">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm">Room</span>
                                    <input type="number" name="room" value={formData.room} className="border border-primaryColor/50 text-xs py-1 px-2 focus:outline-none rounded-md" onChange={handleChange} />
                                </div>
                                <span className="text-red-500 text-[8px]">{errors?.room}</span>
                            </label>
                            <label className="flex flex-col">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm">Bath</span>
                                    <input type="number" name="bath" value={formData.bath} className="border border-primaryColor/50 text-xs py-1 px-2 focus:outline-none rounded-md" onChange={handleChange} />
                                </div>
                                <span className="text-red-500 text-[8px]">{errors?.bath}</span>
                            </label>
                            <label className="flex flex-col">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm">Square meters</span>
                                    <input type="number" name="square_meter" value={formData.square_meter} className="border border-primaryColor/50 text-xs py-1 px-2 focus:outline-none rounded-md" onChange={handleChange} />
                                </div>
                                <span className="text-red-500 text-[8px]">{errors?.square_meter}</span>
                            </label>
                        </div>
                    </div>
                </form>
                <button className="self-end bg-primaryColor text-white px-7 py-[2px] rounded-md text-sm mt-4" onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
}
 
export default UploadModal;