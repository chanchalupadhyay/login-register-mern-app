const express = require("express");
const router = express.Router();
const Users = require("../model/User");
const bcrypt = require("bcrypt");




router.post("/register", (req, res) => {

    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone_number,

    };

    Users.findOne({

        email: req.body.email,

    })
        .then(async (user) => {

            if (!user) {

                const hash = bcrypt.hashSync(req.body.password, 10);

                userData.password = hash;

                Users.create(userData)

                    .then((user) => {

                        console.log(`${user.email} is register`);
                        res.json({ status: `${user.email} is register` });
                    })

                    .catch((err) => {
                        console.log(`error1:${err}`);
                        res.send(`error:${err}`);
                    });


            } else {
                console.log(`user exist`);
                res.json({ status: `user already exist` });
            }
        })

        .catch((err) => {
            res.send(`error2:${err}`);
        });



});


router.post("/login", (req, res) => {

    console.log("login", req.body);
    Users.findOne({
        email: req.body.email,
    })
        .then((user) => {
            if (user) {

                if (bcrypt.compareSync(req.body.password, user.password)) {

                    const payload = {
                        _id: user._id,
                        name: user.name,
                        phone_number: user.phone_number,
                        email: user.email,

                    };
                    res.send(payload)

                } else {

                    res.json({ error: `Incorrect Id or pasword ` });
                }

            } else {
                res.json({ error: `User does not exist` });
            }
        })
        .catch((err) => {
            console.log(`error1 ${err}`);

            res.send(err);
        });
});


router.put("/user/:id", async (req, res) => {
    console.log(req.body);
    if(req.body.password){

        const hash = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hash;
    }

    Users.findByIdAndUpdate(req.params.id, req.body, (err, UpdatedData) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            
            res.send(`${UpdatedData._id} is updated`);
        }

    })
})

router.get("/alldata", async (req, res) => {
    const data = await Users.find({});
    res.send(data)
})


module.exports = router