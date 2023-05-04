import axios from "axios";

const UsersAPICall={
    loginUser:(username, password)=>{
        return axios.post('http://localhost:3001/authentication/login',{
            username:username,
            password:password
        })
    },

    registerUser:(username, password, repeatedPassword)=>{
        return axios.post('http://localhost:3001/authentication/register',{
            username:username,
            password:password,
            repeatedPassword:repeatedPassword
        }).then(response=>{
            console.log(response)
        })
    }
}

export default UsersAPICall;