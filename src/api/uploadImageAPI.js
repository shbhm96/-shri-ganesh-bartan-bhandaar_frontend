import axios from "axios"

const BACKEND_API = process.env.REACT_APP_BACKEND_SERVER_API
const uploadImageApi = async(formdata)=>{
await axios.post(
    `${BACKEND_API}/api/images`,
    formdata,
    {
      headers:
        {
          "Content-Type": "multipart/form-data"
        }
    }
  ).then(result=>result)
  .then(data=>
    {
    console.log(data["data"]["imageUrl"])
    return (data["data"]["imageUrl"])
    }
  )
}

export default uploadImageApi;