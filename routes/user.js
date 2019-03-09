/* eslint-disable prefer-destructuring */
import express from 'express';
import User from '../models/user';

const router = express.Router();

router.post('/login', (req, res) => {
  const {email, password} = req.body;
  User.findOne({email}).then(user => {
    if (!user) {
      res.status(400).json({errors: {emailErrorText: 'Email does not exist'}, LoggedIn: 'Failed'});
    } else if (!user.comparePassword(password)) {
      res.status(400).json({errors: {passwordErrorText: 'You entered a wrong password'}, LoggedIn: 'Failed'});
    } else {
      res.json({profile: user.toAuthToken()});
    }
  });
});

router.post('/signup', (req, res) => {
  const {firstName, lastName, email, password} = req.body;
  const user = new User({firstName, lastName, email, password});
  user.encryptPassword(password);
  user
    .save()
    .then(() => res.json({firstName, lastName, email, SignedUp: 'Success'}))
    .catch(error => res.json({error, SignedUp: 'Failed'}));
});

export default router;
