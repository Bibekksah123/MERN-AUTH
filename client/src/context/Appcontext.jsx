import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
  export const Appcreatecontext=createContext()

  
  function Appcontext({children}) {
    const backendUrl="http://localhost:3000"
    const [isloggedin, setIsloggedin] = useState(false)
    const [userData, setUserData] = useState(false)
    const getuerdata=async()=>{
      try{
        const {data}=await axios.get("http://localhost:3000/data/api/user")
        data.Success?setUserData(data.userData):toast(data.message)
      }catch(error){
        toast(error.message)
      }
    }
    
  const value={
    backendUrl,
    isloggedin,setIsloggedin,
    userData,setUserData,
    getuerdata,


    }
    return (
      <Appcreatecontext.Provider value={value}>
  {children}
      </Appcreatecontext.Provider>
    )
  }
  
  export default Appcontext