import { useEffect } from "react"
import api from "../Api/api"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers, setUserData } from "../redux/userSlice"

const getOtherUsers = () => {
    let dispatch = useDispatch()
    const { userData, otherUsersData } = useSelector(state => state.user)
    useEffect(() => {
        const fetchUser = async () => {
            let result
            try {
                result = await api.get('/user/others')
                dispatch(setOtherUsers(result?.data))
            } catch (error) {
                console.log(error.response.data);
                dispatch(setOtherUsers(null))
            }
        }
        fetchUser()
    }, [])

}
export default getOtherUsers