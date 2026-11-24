import { useEffect } from "react"
import api from "../Api/api"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"

const getCurrentUser = () => {
    let dispatch = useDispatch()
    const userData = useSelector(state => state.user.userData)
    useEffect(()=>{
        const fetchUser = async ()=>{
             try {
                let result = await api.get('/user/current')
                dispatch(setUserData(result.data))
                // console.log("Get Current User", result.data);       
             } catch (error) {      
                console.log(error.response.data);
             }
        }
        fetchUser()
    }, [userData])

}
export default getCurrentUser