import axios from "axios";

const host = "localhost:8080";



export const getQuotes = () => {


    return  axios.get(`http://${host}/api/cryptoassets`,{  headers:{'Authorization': 'Bearer ' + localStorage.getItem("token")}})
        .then((response) => {
            return response
        })
        .catch((error) => {
            alert("no ok")

        })


}
export const postRegister=(user)=>{
    console.log(user)
    return axios.post(`http://${host}/register`,user)
}

export const postLogin=(user)=>{
    console.log(user)
    return axios.post(`http://${host}/authenticate`,user)
}
export default {
    postRegister,
    getQuotes,
    postLogin,

};