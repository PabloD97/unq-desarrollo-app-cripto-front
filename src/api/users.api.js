import axios from "axios";

const host = "localhost:8080";



export const getUsers = () => {


    return  axios.get(`http://${host}/api/users`,{  headers:{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
        .then((response) => {
            return response
        })
        .catch((error) => {
            alert("no ok")

        })


}

export default {
    getUsers,
   };