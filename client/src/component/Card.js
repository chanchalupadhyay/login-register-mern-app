import React from "react";
import "./styles/card.css";

function Card(props) {
    return (

        <div className="card">
            <img className="img-container"
                src={"https://robohash.org/" + props.id + "?200*200"} // generate ramdom pics from robo..url
                alt="" />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">


                    <span className="fas fa-envelope-open"> {"  "}{props.email}</span><br />
                    <span className="fas fa-phone">{"  "}{props.contact}</span>


                </p>
            </div>

            <div className="card-footer">
                <small className="text-muted">

                <button className="btn btn-success pt-2 " onClick={() => props.onCardEdit(props.id, props.name, props.email, props.contact)}>Edit</button>
                <button className="btn btn-danger pt-2 " onClick={() => props.onCardDelete(props.email)} >Delete</button>
                </small>
            </div>
        </div>


    )
}

export default Card;
