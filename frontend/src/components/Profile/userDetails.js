import React, {useEffect, useState} from "react";
import UsersAPICall from "../../apiCalls/UsersAPICall";
import { Country, State }  from 'country-state-city';

const UserDetails=(props)=>{
    //console.log(props.userDetails)

    const[userData,updateUserData]=useState({
        firstName:"",
        lastName:"",
        phoneNumber:"",
        imageUrl:"",
        country:"",
        city:"",
        address:""
    })
    const [countries, setCountries] = useState([])
    const [citiesInCountry, setCitiesInCountry] = useState([])

    const handleChange=(e)=>{
        updateUserData({
            ...userData,
            [e.target.name] : e.target.value.trim()
        })
    }

    const onSaveChanges=async (e)=>{
        const firstName = userData.firstName !== "" ? userData.firstName : props.userDetails.firstName
        const lastName = userData.lastName !== "" ? userData.lastName : props.userDetails.lastName
        const phoneNumber = userData.phoneNumber !== "" ? userData.phoneNumber : props.userDetails.phoneNumber
        const imageUrl = userData.imageUrl !== "" ? userData.imageUrl : props.userDetails.imageUrl
        //const countryCode = userData.countryCode !== "" ? userData.countryCode : props.userDetails.countryCode
        const country = userData.country !== "" ? Country.getCountryByCode(userData.country).name : props.userDetails.location.country
        const city = userData.city !== "" ? userData.city : props.userDetails.location.city
        const address = userData.address !== "" ? userData.address : props.userDetails.location.address

        await UsersAPICall.editUserDetails(props.userDetails.username, firstName, lastName,imageUrl,phoneNumber,
            country,city,address);
        props.setEditUserDetails(false)
    }

    const getCountries=() => {
        let countriesList = []
        Country.getAllCountries().map((item) => {
            countriesList.push({name: item.name, countryCode:item.isoCode})
           if(props.userDetails.location.country===item.name){
               getCitiesInCountry(item.isoCode)
           }
        })
        setCountries(countriesList)
    }

    const handleCountriesChange = (e)=>{
        const selectedCountry = e.target.value.trim();
        getCitiesInCountry(selectedCountry)
    }

    const getCitiesInCountry=(selectedCountry)=>{
        let citiesList = []
        State.getStatesOfCountry(selectedCountry).map((item)=>{
            citiesList.push(item.name)
        })
        setCitiesInCountry(citiesList)
    }

    useEffect(()=>{
        getCountries()
    },[])

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

                <div className="col-4 text-end fw-bold">
                    <div className="p-2">Country</div>
                </div>
                <div className="col-8">
                    <select className={"form-select"} name={"country"}
                            onChange={e=> {handleChange(e); handleCountriesChange(e) }} disabled={!props.editUserDetails}>
                        {props.userDetails.location.country ? <option>{props.userDetails.location.country}</option> :
                            <option>Select country</option> }
                        {countries.map((item)=>{
                            return(
                                <option value={item.countryCode}>{item.name}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="col-4 text-end fw-bold">
                    <div className="p-2">City</div>
                </div>
                <div className="col-8">
                    <select className={"form-select"} name={"city"} onChange={handleChange} disabled={!props.editUserDetails}>
                        {props.userDetails.location.city ? <option>{props.userDetails.location.city}</option> :
                            <option>Select city</option> }
                        {citiesInCountry.map((item)=>{
                            return(
                                <option value={item}>{item}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="col-4 text-end fw-bold">
                    <div className="p-2">Address</div>
                </div>
                <div className="col-8">
                    <input type="text" className="form-control" name={"address"} onChange={handleChange}
                           placeholder={props.userDetails.location.address}
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