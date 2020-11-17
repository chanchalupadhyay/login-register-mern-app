import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";


const navigationAfterLogin = () => (
    <div className="container ">
        <ul className="nav justify-content-center">
            <li className="nav-item"><Link className="nav-link text-white" to="/logout">SignOut</Link></li>
        </ul>
    </div>
)


const navigationBeforeLogin = () => (
    <div className="container">
        <ul className="nav justify-content-center">
            <li className="nav-item"><Link className="nav-link text-white" to="/register">SignUp</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/">SignIn</Link></li>
        </ul>
    </div>
)


const Navigation = () => {
    const loginStatus = useContext(UserContext)[0];
    return (
        !loginStatus==null ? navigationAfterLogin() : navigationBeforeLogin()

    )
}

export default Navigation