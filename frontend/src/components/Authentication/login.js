import React, {useState} from "react";
import loginImage from "../../images/login.png";
import UsersAPICall from "../../apiCalls/UsersAPICall";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const Login = (props)=>{

    const navigate = useNavigate();

    const [,setCookies] = useCookies(["access_token","userRole"])

    const[loginData, updateLoginData] = useState({
        username:"",
        password:""
    })

    const handleChange=(e)=>{
        updateLoginData({
            ...loginData,
            [e.target.name] : e.target.value.trim()
        })
    }

    const onFormSubmit = async (e)=>{
        e.preventDefault();
        //console.log(loginData)
        const response = await UsersAPICall.loginUser(loginData.username,loginData.password)
        //console.log(response)

        setCookies("access_token",response.data.token)
        setCookies("userRole",response.data.userRole)
        navigate("/")
    }
    return(
        <div className={"lightBackground"}>
            <div className={"container pt-3"}>
                <div className={"row"}>
                    <div className={"col-7 "}>
                        <img src={loginImage} alt={"auction icon"} className={"d-block w-100"} />
                    </div>

                    <div className={"col-5 ps-3 pt-5 mt-5"}>
                        <span className={"titles pt-5"}>Sign in</span>
                        <br/>
                        <br/>
                        <span className={"ps-3"}>Don't have an account?
                            <a href={"/register"}>Create one now</a>
                        </span>
                        <br/>
                        <form className={"mt-5"} onSubmit={onFormSubmit}>
                            <div className="form-floating mb-3 ">
                                <input type="email" className="form-control" id="email"
                                       placeholder="name@example.com"
                                       name="username"
                                       onChange={handleChange}/>
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="password"
                                       placeholder="Password"
                                       name="password"
                                       onChange={handleChange}/>
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="d-grid gap-2 mt-5">
                                <button className="btn redButton btn-lg text-white" type="submit">
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;