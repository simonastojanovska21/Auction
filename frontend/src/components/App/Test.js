import React, {useEffect, useState} from "react";
import CountriesAPICall from "../../apiCalls/CountriesAPICall.js";
import { Country, State, City }  from 'country-state-city';


const Test=(props)=>{
    const [countries, setCountries] = useState([])
    const getCountries=async () => {
        console.log(Country.getAllCountries())
        console.log(State.getAllStates())
    }
    useEffect(()=>{
        getCountries()
    },[])
    return(
        <div>
            {countries}
        </div>
    )
}

export default Test;