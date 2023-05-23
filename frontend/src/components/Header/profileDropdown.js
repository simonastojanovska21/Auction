import React, {useState} from "react";
import {Dropdown} from "react-bootstrap"

const ProfileDropdown=(props)=>{
    const [showDropDown, setShowDropDown] = useState(false)
    return(
        <Dropdown className={"me-3"}
                  onMouseEnter={()=>setShowDropDown(true)}
                  onMouseLeave={()=>setShowDropDown(false)}>
            <Dropdown.Toggle variant={"light"}>
                Profile
            </Dropdown.Toggle>
            <Dropdown.Menu show={showDropDown}>
                <Dropdown.Item href={"/itemsForUser"}>
                    My items
                </Dropdown.Item>
                <Dropdown.Item href={"/"}>
                    My bids
                </Dropdown.Item>
                <Dropdown.Item href={"/"}>
                    Items won
                </Dropdown.Item>
                <Dropdown.Item href={"/accountInfo"}>
                    Account info
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ProfileDropdown;