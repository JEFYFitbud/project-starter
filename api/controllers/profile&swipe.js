const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../middlewares/authentication');
const { Swipe } = db;
const { User } = db;
const { cloudinary } = require('../utils/cloudinary');

//populate the Swipe tab
router.get('/', (req, res) => {
  User.findAll({}).then((users) => res.json(users));
});

// Here you have to figure out what do you do when someone HAS Swiped!

// Are they friends or on the block list or buddies list....

// when someone swipes, what data do I send back

//for the user profile
router.get('/:me', (req, res) => {
  const { me } = req.params; //object that contains all variables in the URL
  User.findByPk(me).then((user) => {
    if (!user) {
      return res.sendStatus(404);
    }
    res.json(user);
  });
});

//CHANGE THESE URL here later for editing profiles
//for editing profile info
router.put('/:me', (req, res) => {
  // const image = req.body.image;
  // try {
  //   const uploadedResponse = cloudinary.uploader.upload(image, {
  //     upload_preset: 'mmppva7q',
  //   });
  //   console.log(uploadedResponse);
  //   res.json({ msg: 'UPLOADED TO CLOUDINARY' });
  // } catch (error) {
  //   console.log(error);
  //   res
  //     .status(500)
  //     .json({ err: 'Something went wrong with the upload to Cloudinary' });
  // }

  const { me } = req.params;
  User.findByPk(me).then((user) => {
    if (!user) {
      return res.sendStatus(404);
    }

    const newBio = req.body.bio ? req.body.bio : user.bio;
    const newFit = req.body.fitLevel ? req.body.fitLevel : user.fitLevel;
    const newHeight = req.body.height ? req.body.height : user.height;
    const newWeight = req.body.weight ? req.body.weight : user.weight;
    const newZip = req.body.zipCode ? req.body.zipCode : user.zipCode;
    const newCity = req.body.city ? req.body.city : user.city;
    const newState = req.body.state ? req.body.state : user.state;
    const newImage = req.body.image ? req.body.image : user.image;
    console.log('new image: ', newImage);

    user.update({
      bio: newBio,
      fitLevel: newFit,
      height: newHeight,
      weight: newWeight,
      zipCode: newZip,
      city: newCity,
      state: newState,
      image: newImage,
    });

    user
      .save()
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
});

module.exports = router;
