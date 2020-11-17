import axios from "axios"

const URL = "http://localhost:1000";

const userRegistration = async (registrationUserData) => {
    const { data } = await axios.post(`${URL}/register`, registrationUserData)
    console.log(data)
    return data.status
}



const userLogin = async (userInputData) => {
    const { data } = await axios.post(`${URL}/login`, userInputData)

    console.log(data)
    return data
}




export default { userRegistration, userLogin } 