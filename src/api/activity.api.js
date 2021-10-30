import axios from "axios";

const host = "localhost:8080";




export const addActivity=(activity)=>{
    console.log(activity)
    return axios.post(`http://${host}/addactivity`,activity)
}

export const getAllActivity = (idUser) => {


    return  axios.get(`http://${host}/api/users`,{ data:{id:idUser}, headers:{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
        .then((response) => {
            return response
        })
        .catch((error) => {
            alert("no ok")

        })


}

export default {
    getAllActivity,addActivity
   };