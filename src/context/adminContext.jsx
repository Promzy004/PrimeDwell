import axios from "axios";
import { Children, createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";

export const AdminContext = createContext()

const AdminContextProvider = ({children}) => {

    const [status, setStatus] = useState('all')
    const [update, setUpdate] = useState('')
    const [properties, setProperties] = useState([])
    const [fetching, setFetching] = useState(true)

    const { loading } = useContext(AuthContext);
    const [ updateTrigger, setUpdateTrigger ] = useState(0)

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    const fetchProperties = async (signal) => {
        setFetching(true)

        await delay(2000)

        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/admin-all-properties`,{
                params: {
                    status: status
                },
                signal: signal
            })
            setProperties(response?.data?.property?.data)
            console.log(properties)
            setFetching(false);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const controller = new AbortController()
        if(loading == 100) {
            fetchProperties(controller.signal)
        }

        return () => controller.abort()
    }, [status, update, loading, updateTrigger ])


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
        <AdminContext.Provider value={{setStatus, status, properties, setUpdate, fetching, handleUpdate}}>
            {children}
        </AdminContext.Provider>
    );
}
 
export default AdminContextProvider;