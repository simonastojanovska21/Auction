import React, {useState} from "react";
import UsersAPICall from "../../apiCalls/UsersAPICall";

const UserDetails=(props)=>{

    const[userData,updateUserData]=useState({
        firstName:"",
        lastName:"",
        phoneNumber:"",
        imageUrl:""
    })

    const handleChange=(e)=>{
        updateUserData({
            ...userData,
            [e.target.name] : e.target.value.trim()
        })
    }

    const onSaveChanges=async (e)=>{
        //e.preventDefault();
        const firstName = userData.firstName !== "" ? userData.firstName : props.userDetails.firstName
        const lastName = userData.lastName !== "" ? userData.lastName : props.userDetails.lastName
        const phoneNumber = userData.phoneNumber !== "" ? userData.phoneNumber : props.userDetails.phoneNumber
        const imageUrl = userData.imageUrl !== "" ? userData.imageUrl : props.userDetails.imageUrl

        await UsersAPICall.editUserDetails(props.userDetails.username, firstName, lastName,imageUrl,phoneNumber);
        props.setEditUserDetails(false)
        console.log("edited")
    }

    return(
        <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded text-start">
            <span className={"subtitles p-5"}>User information</span>
            <div className="row gy-2 pt-3">
                <div className="col-4 text-end fw-bold">
                    <div className="p-2">First Name</div>
                </div>
                <div className="col-8">
                    <input type="text" className="form-control" name={"firstName"} onChange={handleChange}
                           placeholder={props.userDetails.firstName}
                           disabled={!props.editUserDetails}/>
                </div>

                <div className="col-4 text-end fw-bold">
                    <div className="p-2">Last Name</div>
                </div>
                <div className="col-8">
                    <input type="text" className="form-control" name={"lastName"} onChange={handleChange}
                           placeholder={props.userDetails.lastName}
                           disabled={!props.editUserDetails}/>
                </div>

                <div className="col-4 text-end fw-bold">
                    <div className="p-2">Email/Username</div>
                </div>
                <div className="col-8">
                    <input type="text" className="form-control"
                           placeholder={props.userDetails.username}
                           disabled={true}/>
                </div>

                <div className="col-4 text-end fw-bold">
                    <div className="p-2">Phone Number</div>
                </div>
                <div className="col-8">
                    <input type="text" className="form-control" name={"phoneNumber"} onChange={handleChange}
                           placeholder={props.userDetails.phoneNumber}
                           disabled={!props.editUserDetails}/>
                </div>

                <div className="col-4 text-end fw-bold">
                    <div className="p-2">Image url</div>
                </div>
                <div className="col-8">
                    <input type="text" className="form-control" name={"imageUrl"} onChange={handleChange}
                           placeholder={props.userDetails.imageUrl}
                           disabled={!props.editUserDetails}/>
                </div>

                <div className={"d-flex justify-content-center pt-3"}>
                    {props.editUserDetails ?
                        <button className={"btn w-75 redButton text-white"} onClick={()=>onSaveChanges()} >
                        Save changes
                        </button> : <></>}

                </div>
            </div>
        </div>
    )
}

export default UserDetails;