import axios from "axios";
//axios makes apis return look nice, must npm install axios
export default axios.create({
    baseURL: "http://localhost:3006/api/v1/restaurants",
});