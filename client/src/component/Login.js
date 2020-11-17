import React from "react";
import ApiHelper from "./ApiHelper";
import { UserContext } from "../App";


const validEmailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

class Login extends React.Component {

    state = {
        email: null,
        password: null,
        userData: {},
        errors: {
            email: '',
            password: '',
        }
    }

    onChange = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;


        errors.email =
            validEmailRegex.test(value)
                ? ''
                : 'Enter correct Email Id !';

        this.setState({ errors, [name]: value });
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const userInputData = {
            email: this.state.email,
            password: this.state.password,
        }
        if (!this.state.email || !this.state.password)
            throw alert("Enter all fields");



        const responseFromServer = await ApiHelper.userLogin(userInputData);

        if (responseFromServer.error) {
            alert(responseFromServer.error);

        }
        else {
            this.setState({ userData: responseFromServer });
            this.props.history.push({
                pathname: '/dashboard',
                state: this.state.userData
            });
            const { email } = responseFromServer
            sessionStorage.setItem("email", email)
        }

    }
    render() {
        const { email } = this.state;

        const { errors } = this.state;
        return (

            <div className="container">
                <UserContext.Consumer >{loginStatus => {
                    let temp = loginStatus[1];
                    temp(sessionStorage.setItem("email", email))
                }}</UserContext.Consumer>
                <div className=" row  mt-5">
                    <div className="col-md-4 col-sm-4 col-xs-12"></div>
                    <div className="col-md-4 col-sm-4 col-xs-12">
                        <div className=" form-container">

                            <h1>SignIn</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group mt-4">
                                    <input className="form-control mt-2" type="email" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange} />

                                    {errors.email.length > 0 &&
                                        <span className='error text-red'>{errors.email}</span>}
                                    <input className="form-control mt-2" type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.onChange} />
                                    <input className=" btn btn-success btn-block" type="submit" name="submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}


export default Login