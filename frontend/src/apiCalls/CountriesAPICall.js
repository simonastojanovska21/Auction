import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://countries-cities.p.rapidapi.com/location/country/list',
    headers: {
        'X-RapidAPI-Key': 'da2116014fmsh7bf9b086f7c7c10p10b977jsn5049119b7b87',

    }
};


const CountriesAPICall = {
    getAllCountries:()=>{
        console.log("called")
        return axios.request(options);
    }
}

export default CountriesAPICall;
