import axios from "axios";

const host = "localhost:8080";



export const getTransaction = () => {


    return  axios.get(`http://${host}/transaction`,{  headers:{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
        .then((response) => {
            return response
        })
        .catch((error) => {
            alert("no ok")

        })


}

export const getTransactionUser = (user) => {


    return  axios.get(`http://${host}/usertransaction`,{ data:{id:1}, headers:{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
        .then((response) => {
            return response
        })
        .catch((error) => {
            alert("no ok")

        })


}


export default {
    getTransaction,
    getTransactionUser
};