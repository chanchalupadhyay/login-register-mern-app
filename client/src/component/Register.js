import React from "react";
import ApiHelper from "./ApiHelper";


const validEmailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
class Register extends React.Component {

    state = {
        name: null,
        email: null,
        password: null,
        phone_number: null,
        errors: {

            email: '',
            password: '',
            name: '',
            phone_number: '',

        }
    }


    onChange = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'name':
                errors.name =
                    value.length < 5
                        ? ' Name must be at least 3 characters long!'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Enter correct Email Id !';
                break;

                case 'password':
                    errors.password =
                        value.length < 8
                            ? 'Password must be at least 8 characters long!'
                            : '';
                    break;
                case 'phone_number':
                    errors.phone_number =
                        value.length < 8
                            ? 'Phone Nmber must be at least 10 characters long!'
                            : '';
                    break;
                default:
                break;
        }
        this.setState({ errors, [name]: value });
    }


    onSubmit = async (event) => {

        event.preventDefault();
        if (!this.state.email || !this.state.password || !this.state.name || !this.state.phone_number)
            throw alert("Enter all fields");

        const temp = this.state;
        const status = await ApiHelper.userRegistration(temp);

        if (status) {
            alert(status);
            // redirect to login page
            this.props.history.push("/");
            return

        }
        else alert("Invaid Input")

    }

    render() {
        const { errors } = this.state;


        return (
            <div className="container ">

                <div className="row mt-3">
                    <div className="col-md-4 col-sm-4 col-xs-12 "></div>
                    <div className="col-md-4 col-sm-4 col-xs-12">
                        <div className=" form-container">

                            <h1>SignUp</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group mt-2">

                                    <input className="form-control mt-2" type="text" placeholder="Enter Username" name="name" value={this.state.name} onChange={this.onChange} />
                                    {errors.name.length > 0 &&
                                        <span className='error text-red'>{errors.name}</span>}

                                    <input className="form-control mt-2" type="email" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange} />
                                    {errors.email.length > 0 &&
                                        <span className='error text-red'>{errors.email}</span>}

                                    <input className="form-control mt-2" type="password" placeholder="Enter password" name="password" value={this.state.password} onChange={this.onChange} />
                                    {errors.password.length > 0 &&
                                        <span className='error text-red'>{errors.password}</span>}

                                    <input className="form-control mt-2" type="text" placeholder="Enter Contact" name="phone_number" value={this.state.phone_number} onChange={this.onChange} />
                                    {errors.phone_number.length > 0 &&
                                        <span className='error text-red'>{errors.phone_number}</span>}
                                    <input className="btn btn-success btn-block" type="submit" name="submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register