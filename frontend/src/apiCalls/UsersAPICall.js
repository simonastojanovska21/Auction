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
    },

    getUserDetails:(username)=>{
        return axios.get(`http://localhost:3001/authentication/userDetails/${username}`)
    },

    editUserDetails:(username, firstName,lastName,imageUrl, phoneNumber)=>{
        return axios.post('http://localhost:3001/authentication/editUserDetails',{
            username:username,
            firstName:firstName,
            lastName:lastName,
            imageUrl:imageUrl,
            phoneNumber:phoneNumber
        })
    },

    getUsernames:()=>{
        return axios.get('http://localhost:3001/authentication/getUsernames')
    },

    manageUserRoles:(username, userRole)=>{
        return axios.post('http://localhost:3001/authentication/updateUserRole',{
            username:username,
            userRole:userRole
        })
    }
}

export default UsersAPICall;