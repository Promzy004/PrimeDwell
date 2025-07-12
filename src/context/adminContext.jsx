import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";

export const AdminContext = createContext()

const AdminContextProvider = ({children}) => {

    const [status, setStatus] = useState('all')
    const [update, setUpdate] = useState('')
    const [properties, setProperties] = useState([])
    const [fetching, setFetching] = useState(true)

    const { loading } = useContext(AuthContext);
    const [ updateTrigger, setUpdateTrigger ] = useState(0)

    //state to a particular page that would be used to request from backend
    const [ page, setPage ] = useState(1)

    //state to store the limit range for each page
    const [ perPage, setPerPage ] = useState(1)

    //state to store the total items in of all page
    const [ totalPage, setTotalPage ] = useState(0)

    //state to store the beginning of each page
    const [ from, setFrom ] = useState(0)
    
    //state to store the total count for each page
    const [ to, setTo ] = useState(0)

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    const fetchProperties = async (signal) => {
        setFetching(true)

        await delay(2000)

        try{
            //request to get all properties for admin
            const response = await axios.get(`http://127.0.0.1:8000/api/admin-all-properties?page=${page}`,{
                params: {
                    status: status
                },
                signal: signal
            })
            setProperties(response?.data?.property?.data)
            setTotalPage(response.data.property.total)
            setPerPage(response.data.property.per_page)
            setFrom(response.data.property.from)
            setTo(response.data.property.to)
            setFetching(false);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        //returns null when loading is not equal to 100
        if(loading !== 100) return;

        const controller = new AbortController()
        //runs immediately loading is equal to 100, can't be added to the conditional statement so as to prevent
        //fetching api cancels, which would be done by return controller.abort()
        fetchProperties(controller.signal)

        return () => controller.abort()
    }, [status, update, loading, updateTrigger, page ])


    //update Properties function
    const handleUpdate = async (property_id, update_status) => {
        try{
            const res = await axios.patch(`http://127.0.0.1:8000/api/property/${property_id}`, {
                status: update_status
            });
            setUpdateTrigger(prev => prev + 1)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AdminContext.Provider value={{setStatus, status, properties, setUpdate, fetching, handleUpdate , setPage, page, perPage, totalPage, from, to}}>
            {children}
        </AdminContext.Provider>
    );
}
 
export default AdminContextProvider;