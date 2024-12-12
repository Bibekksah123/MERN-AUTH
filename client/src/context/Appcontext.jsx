import { createContext, useState } from "react";
  export const Appcreatecontext=createContext()

  
  function Appcontext({children}) {
    const backendUrl="http://localhost:3000"
    const [isloggedin, setIsloggedin] = useState(false)
    const [userData, setUserData] = useState(false)
  const value={
    backendUrl,
    isloggedin,setIsloggedin,
    userData,setUserData,


    }
    return (
      <Appcreatecontext.Provider value={value}>
  {children}
      </Appcreatecontext.Provider>
    )
  }
  
  export default Appcontext