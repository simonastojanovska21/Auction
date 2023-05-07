import React, {useEffect, useState} from "react";
import UsersAPICall from "../../apiCalls/UsersAPICall";
import profileImage from "../../images/profile.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPen, faUserLock} from "@fortawesome/free-solid-svg-icons";
import UserDetails from "./userDetails";
import {useCookies} from "react-cookie";
import ManageUserRoles from "./manageUserRoles";

const AccountInfo=(props)=>{

    const [userDetails, setUserDetails] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [editUserDetails, setEditUserDetails] = useState(false)
    const [cookies, setCookies] = useCookies(["userRole"])
    //if the value is true than the component for managing roles should be displayed, if the value is false
    //than information about the users are displayed
    const [displayManageRoles, setDisplayManageRoles] = useState(false)

    const getUserDetails= async ()=>{
        const username = localStorage.getItem("username")
        try{
            await UsersAPICall.getUserDetails(username)
                .then((response)=>{
                    setUserDetails(response.data.userDetails)
                    // console.log(username)
                    // console.log(response.data.userDetails)
                })
            setIsLoaded(true)
        }catch (e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getUserDetails();
    },[])
    return(
        <div className={"lightBackground pt-5"}>
            {isLoaded ?
                <div className={"container pt-3 text-center"}>
                    <span className={"titles pb-5"}>My profile</span>
                    <div className={"row"}>
                        <div className={"col-4 pt-5"}>
                            <div className={"d-flex justify-content-center"}>
                                {userDetails.imageUrl.length !== 0 ?
                                    <img style={{width:'200px', height:'200px'}}
                                         src={userDetails.imageUrl} alt={"profile"}/> :
                                    <img src={profileImage} style={{width:'200px', height:'200px'}}
                                         alt={"profile"}/>}
                            </div>
                            <div className={"d-flex justify-content-center pt-3"}>
                                <div className="d-grid gap-2 w-50">
                                    <button className="btn blueButton text-white" type="button"
                                            onClick={()=>setEditUserDetails(!editUserDetails)}>
                                        <FontAwesomeIcon icon={faUserPen} /> Edit
                                    </button>
                                    {cookies.userRole === "Admin" ?
                                        <button className={"btn redButton text-white"} type="button"
                                                onClick={()=>setDisplayManageRoles(!displayManageRoles)}>
                                            <FontAwesomeIcon icon={faUserLock} /> Manage user roles
                                        </button>
                                        : <></>}
                                </div>
                            </div>
                        </div>
                        <div className={"col-8 pt-5 pb-5"}>
                            {displayManageRoles ?
                                <ManageUserRoles userRoleOptions={props.userRoleOptions}/> :
                                <UserDetails userDetails={userDetails} editUserDetails={editUserDetails}
                                             setEditUserDetails={setEditUserDetails} />
                            }
                        </div>
                    </div>
                </div>
            : <></>}
        </div>
    )
}

export default AccountInfo;