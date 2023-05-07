import React from "react";
import logo from '../../images/logo.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useCookies} from "react-cookie";
import {Link, useNavigate} from "react-router-dom";
import ProfileDropdown from "./profileDropdown";

const Header = (props)=>{

    const navigate = useNavigate();

    const [cookies,setCookies] = useCookies(["access_token","userRole"])

    const logoutUser=()=>{
        setCookies("access_token","")
        setCookies("userRole","")
        navigate("/")
    }
    return(
        <header>
            <nav className="navbar navbar-expand-lg darkBackground">
                <div className="container">
                    <a className="navbar-brand text-white companyName col-4" href="/">
                        <img src={logo} alt={"auction logo"} className={"logoImage"}/>
                        Auction
                    </a>
                    <div className="col-3 ">

                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search item for auction"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>

                    </div>
                    <div className={"col-5"}>
                        <div className={"collapse navbar-collapse justify-content-end"}>
                            <ul className="nav navbar-nav navbar-right">
                                {cookies.access_token ?
                                    (<Link to={"/profile"} className={"btn redButton text-white me-3"}>Buy now!</Link>) : <></>}
                                {cookies.access_token ?
                                    (<Link to={"/profile"} className={"btn blueButton text-white me-3"}>Sell items!</Link>) : <></>}
                                {/*{cookies.access_token ?*/}
                                {/*    (<Link to={"/profile"} className={"btn btn-light me-3"}>AcountInfo</Link>) : <></>}*/}
                                {cookies.access_token ?
                                    (<ProfileDropdown />) : <></>}
                                {!cookies.access_token ?
                                    (<Link to={"/login"} className={"btn btn-light"}>
                                        <FontAwesomeIcon icon={faUser} /> Sign in
                                    </Link> ) :
                                    <button className={"btn btn-outline-light"} onClick={logoutUser}>Log out</button>
                                }
                            </ul>
                        </div>

                    </div>

                </div>
            </nav>
        </header>
    )
}

export default Header;