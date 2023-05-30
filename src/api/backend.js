import axios from "axios"

const BACKEND_API = process.env.REACT_APP_BACKEND_SERVER_API
const backendApi = axios.create({baseURL:`${BACKEND_API}/api`})

export default backendApi;