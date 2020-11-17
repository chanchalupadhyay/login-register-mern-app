import React from "react";

import axios from "axios";
import Card from "./Card";
import Modal from "./modal";


class Dashboard extends React.Component {

    state = {
        userData: [],
        open: false,
        profileData: this.props.location.state,
    }

    onModalOpen = () => {
        this.setState({ open: true });
    };

    onModalClose = () => {
        this.setState({ open: false });
    };

    onCardDelete = email => {

        let data = [...this.state.userData];
        let FilterData = data.filter(data => data.email !== email);
        console.log(FilterData)
        this.setState({ userData: FilterData });

    };

    onModalHandler = (id, name, email, contact) => {
        console.log(name, email);
        this.setState({
            open: true,

            selectedId: id,
            selectedName: name,
            selectedEmail: email,
            selectedContact: contact,
        });
    };

    onChangeHandler = event => {
        let textbox = event.target.value;
        console.log(textbox)

        this.setState({
            [event.target.name]: textbox
        });
    };



    onConfirmModalHandler = async () => {
        let newName = this.state.selectedName;
        let newEmail = this.state.selectedEmail;
        let newContact = this.state.selectedContact;
        let id = this.state.selectedId;
        let pId = this.props.location.state._id;
        console.log(id, pId);
        let updatedData;

        if (id === pId) {
            const newData = {
                _id: id,
                email: newEmail,
                phone_number: newContact,
                name: newName
            }
            const { data } = await axios.put(`http://localhost:1000/user/${id}`, newData);

            console.log(data)
            alert(data)

            this.setState({ profileData: newData, open: false });
            console.log(this.state.profileData)
        }
        else {
            let oldData = [...this.state.userData];
            updatedData = oldData.map(data => {
                if (data._id === id) {
                    data.name = newName;
                    data.email = newEmail;
                    data.phone_number = newContact;

                }

                return data;
            });
            this.setState({
                userData: updatedData,
                open: false
            });

        }
    }

    handleProfileUpdate = async () => {

    }




    componentDidMount() {

        axios.get("http://localhost:1000/alldata")

            .then(res => {
                this.setState({
                    userData: res.data
                });
                console.log(this.state.userData)
            })
            .catch((err) => console.log(err));
    }




    render() {
        console.log(this.state.profileData);
        const { _id, email, phone_number, name } = this.state.profileData;
        console.log(email, _id, name);
        return (
            <>
                <div className="container" >

                    <button onClick={() => this.onModalHandler(_id, email, name, phone_number)} className="btn btn-block text-white text-right">Profile</button>
                    <h1>Users List</h1>
                    <div className="card-columns">
                        {this.state.userData && this.state.userData.map(user => (

                            <Card
                                id={user._id}
                                name={user.name}
                                email={user.email}
                                contact={user.phone_number}
                                onCardDelete={email => this.onCardDelete(email)}
                                onCardEdit={(id, name, email, contact) =>
                                    this.onModalHandler(id, name, email, contact)}
                            />
                        ))}
                    </div>
                    <Modal
                        open={this.state.open}
                        onClose={this.onModalClose}
                        id={this.state.selectedId}
                        name={this.state.selectedName}
                        email={this.state.selectedEmail}
                        contact={this.state.selectedContact}
                        onUpdate={this.onChangeHandler}
                        onButtonClick={this.onConfirmModalHandler}

                    />

                </div>



            </>

        )
    }
}








export default Dashboard