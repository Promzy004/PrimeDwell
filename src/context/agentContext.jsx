import axios from "axios";
import { Children, createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";

export const AgentContext = createContext()

const AgentContextProvider = ({children}) => {

    const [status, setStatus] = useState('all')
    const [update, setUpdate] = useState('')
    const [properties, setProperties] = useState([])

    const { loading, user } = useContext(AuthContext);
    const [ fetching, setFetching ] = useState(true)



    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    // Fetching agent properties individually
    const fetchProperties = async (signal) => {
        
        setFetching(true)
        const agentId = user.id
        await delay(2000)
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/agent-properties/${agentId}?status=${status}`, {
                signal: signal
            })
            setProperties(response?.data?.property?.data)
            console.log(properties)
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    //useEffect for fetch properties
    useEffect(() => {
        const controller = new AbortController()
        if(loading == 100) {
            fetchProperties(controller.signal)
        }

        return () => controller.abort()

    }, [status, update, loading])


    return (
        <AgentContext.Provider value={{setStatus, status, properties, setUpdate, fetching}}>
            {children}
        </AgentContext.Provider>
    );
}
 
export default AgentContextProvider;