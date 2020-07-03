import Axios from "axios"
import { API_URL } from './../../supports/ApiUrl'

export const Userdata = (data) => {
    let { nama, usia, pekerjaan } = data
    return(dispatch) => {
        Axios.post(API_URL + `/users?nama=${nama}&usia=${usia}&pekerjaan=${pekerjaan}`,{
            nama,
            usia,
            pekerjaan
        })
        .then((res) =>{
            dispatch({
                payload: res.data
            })
        })
        .catch((err) =>{
            dispatch({
                type: 'ERROR'
            })
        })
    }
}


export const addToData = (data) => {
    return{
        type: 'ADD_TO_DATA',
        payload: data
    }
}