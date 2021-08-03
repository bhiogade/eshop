const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
   // validate a requests,if its not valid return 400 otherwise create a new user and save to db
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // validation if user is not already registered
    let user = await User.findOne({email:req.body.email});// looking up by the prop. i.e. email
    if(user) return res.status(400).send('User already registered.');

    // At this point we have a valid user object, hence save this into db
    user = new User({
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNumber: req.body.contactNumber
    });

    await user.save();

  res.send(user);   // return this new user to client
});

module.exports = router;
