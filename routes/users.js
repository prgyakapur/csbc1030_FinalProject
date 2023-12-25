//users.js
const express = require("express");
const router = express.Router();
// const app = express();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

router.get('/get', async (req, res) => {  //get all the users list
  try {
    // console.log("get");
    // const reqUserId = req.params.id;
    // const authUserId = req.user.userId;
    const users = await User.findAll();
    res.json(users);
    
  } catch (error) {
    res.status(500).json({ error: 'Server error (get)' });
  }
});

router.post('/login', async(req, res) => {  //login to generate token
  const { username, password } = req.body;
console.log(req.body);
  const user = await User.findOne({ where: { username, password } });
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
  }
  // console.log(process.env.SECRET_KEY);
  const token = jwt.sign({ userId: user.id }, 'myLongAndRandomSecretKey123!@#$');
  res.status(200).json({ token });
});


router.get('/:id', auth, async (req, res) => { //fetching particular ID
  try {
    const reqUserId = req.params.id;
    const authUserId = req.user.userId;

    if (reqUserId == authUserId) {
      const user = await User.findByPk(reqUserId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    }
    else {
      return res.status(403).json({ error: 'Access denied' });
    }
  } catch(error) {
    res.status(500).json({ error: 'Server error' });
  }


});

router.post('/add', auth, async (req, res) => {  //add a new user (only admin)
  try {
    const authUserId = req.user.userId;
    if (authUserId !== 1) {
      return res.status(403).json({ error:'Access denied' });
    }

    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
