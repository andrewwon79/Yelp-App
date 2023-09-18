import axios from "axios";
//axios makes apis return look nice, must npm install axios

//when deploying, our production won't know what localhost api is
//We're going to have a variable telling us if we're in prod or not
// NODE_ENV = 'development'
// NODE_EVN = 'production'

// if we are in production baseurl = "/api/v1/restaurants"
// else baseurl = "http://localhost:3006/api/v1/restaurants"


const baseURL = process.env.NODE_ENV === 'production' ? "api/v1/restaurants" : "http://localhost:3006/api/v1/restaurants";
//const baseURL = "/api/v1/restaurants";
export default axios.create({
    //equivalent to baseURL: baseURL
    baseURL,
});