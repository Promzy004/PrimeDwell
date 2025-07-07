import axios from "axios";
import { Children, createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";

export const BuyerContext = createContext()

const BuyerContextProvider = ({children}) => {

    const [ propertyImagePreview, setPropertyImagePreview ] = useState(false)
    // const [status, setStatus] = useState('all')
    // const [update, setUpdate] = useState('')
    // const [properties, setProperties] = useState([])

    // const { loading, user } = useContext(AuthContext);
    // const [ fetching, setFetching ] = useState(true)

    // //state to a particular page that would be used to request from backend
    // const [ page, setPage ] = useState(1)

    // //state to store the limit range for each page
    // const [ perPage, setPerPage ] = useState(1)

    // //state to store the total items in of all page
    // const [ totalPage, setTotalPage ] = useState(0)

    // //state to store the beginning of each page
    // const [ from, setFrom ] = useState(0)
    
    // //state to store the total count for each page
    // const [ to, setTo ] = useState(0)



    // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    // // Fetching agent properties individually
    // const fetchProperties = async (signal) => {
        
    //     setFetching(true)
    //     const agentId = user.id
    //     await delay(2000)
    //     try{
    //         const response = await axios.get(`http://127.0.0.1:8000/api/agent-properties/${agentId}?status=${status}&page=${page}`, {
    //             signal: signal
    //         })
    //         setProperties(response?.data?.property?.data)
    //         setTotalPage(response.data.property.total)
    //         setPerPage(response.data.property.per_page)
    //         setFrom(response.data.property.from)
    //         setTo(response.data.property.to)
    //         setFetching(false)
    //     } catch (error) {
    //         console.log(error)
    //         setFetching(false)
    //     }
    // }

    // //useEffect for fetch properties
    // useEffect(() => {
    //     const controller = new AbortController()
    //     if(loading == 100) {
    //         fetchProperties(controller.signal)
    //     }

    //     return () => controller.abort()

    // }, [status, update, loading])

    // setStatus, status, properties, setUpdate, fetching, setPage, page, perPage, totalPage, from, to, 


    return (
        <BuyerContext.Provider value={{ propertyImagePreview, setPropertyImagePreview }}>
            {children}
        </BuyerContext.Provider>
    );
}
 
export default BuyerContextProvider;