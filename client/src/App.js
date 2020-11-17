import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import Register from "./component/Register";
import Navigation from "./component/Navigation";
import Logout from "./component/LogOut";


import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';


export const UserContext = React.createContext();


function App() {

  const [loginStatus, setLoginStatus] = React.useState(null);


  React.useEffect(() => {
    setLoginStatus(sessionStorage.getItem("email"));
  }, [loginStatus]);



  return (
    <>
      <UserContext.Provider value={[loginStatus, setLoginStatus]}>

        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
        </Router>
      </UserContext.Provider>

    </>
  );
}

export default App;
