import axios from "axios";
import { Children, createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";

export const BuyerContext = createContext()

const BuyerContextProvider = ({children}) => {

    const [ updateFetch, setUpdateFetch ] = useState(0)

    const [ propertyImagePreview, setPropertyImagePreview ] = useState([])
    const { loading } = useContext(AuthContext);
    const [fetching, setFetching] = useState(true)
    const [ properties, setProperties ] = useState([])

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

    const [ favoriteMessage, setFavoriteMessage ] = useState('')

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))


    const fetchProperties = async (signal) => {
        setFetching(true)

        await delay(2000)

        try{
            //request to get all properties for buyer
            const response = await axios.get(`http://127.0.0.1:8000/api/buyer-all-properties`,{
                signal: signal
            })
            setProperties(response?.data?.data)
            setTotalPage(response?.data?.data?.total)
            setPerPage(response?.data?.data?.per_page)
            setFrom(response?.data?.data?.from)
            setTo(response?.data?.data?.to)
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
    }, [loading, page, updateFetch ])


    const handleFavorite = async (property_id) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/favorite/${property_id}`)

            setUpdateFetch(prev => prev + 1)
            setFavoriteMessage(response?.data?.message)
            setTimeout(() => {
                setFavoriteMessage('')
            }, 2000)

            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <BuyerContext.Provider value={{ propertyImagePreview, setPropertyImagePreview, properties, fetching, handleFavorite, favoriteMessage, page, setPage, perPage, totalPage, from, to }}>
            {children}
        </BuyerContext.Provider>
    );
}
 
export default BuyerContextProvider;