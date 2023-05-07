import React, {useEffect, useState} from "react";
import Select from 'react-select'
import UsersAPICall from "../../apiCalls/UsersAPICall";

const ManageUserRoles=(props)=>{

    const [usernames,setUsernames]=useState([])
    const [selectedUsername, setSelectedUsername] = useState("")
    const [selectedUserRole, setSelectedUserRole] = useState("")

    const getUsernames = async ()=>{
        try {
            await UsersAPICall.getUsernames()
                .then((response)=>{
                    const tmp = []
                    response.data.usernames.map(username=>{
                        tmp.push({value:username, label:username})
                    })
                    setUsernames(tmp)
                })
        }catch (e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getUsernames()
    },[])

    const handleUsernameChange=(selectedOption)=>{
        setSelectedUsername(selectedOption.value)
    }

    const handleUserRoleChange=(selectedOption)=>{
        setSelectedUserRole(selectedOption.value)
    }

    const onSaveChanges=async (e) => {
        console.log(selectedUsername)
        console.log(selectedUserRole)
        await UsersAPICall.manageUserRoles(selectedUsername, selectedUserRole);
    }

    return(
        <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded text-start">
            <span className={"subtitles p-5"}>Manage user roles</span>
            <div className={"row gy-2 pt-3"}>
                <div className={"col-4 text-end fw-bold"}>
                    <div className={"p-2"}>Username</div>
                </div>
                <div className={"col-8"}>
                    <Select options={usernames} onChange={handleUsernameChange}   />
                </div>

                <div className={"col-4 text-end fw-bold"}>
                    <div className={"p-2"}>Role</div>
                </div>
                <div className={"col-8"}>
                    <Select options={props.userRoleOptions} onChange={handleUserRoleChange} />
                </div>

                <div className={"d-flex justify-content-center pt-3"}>
                    <button className={"btn w-75 redButton text-white"} onClick={()=>onSaveChanges()} >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ManageUserRoles;