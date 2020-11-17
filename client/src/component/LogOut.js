import React from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App"


function Logout() {

   const history = useHistory();
   
   const [loginStatus, setLoginStatus] = React.useContext(UserContext);

   (sessionStorage.removeItem("email", loginStatus));

   alert("Logout Successfully");
   history.push("/");


   return (<></>)


}

export default Logout;