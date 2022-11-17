const express = require('express');
const User = require('../models/Model');
const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send({msg: 'Successfully created', user: user.name});
  } catch (error) {
    res.send(error.message);
  }
});

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({msg: 'Successfully obtained', users: users})
  } catch (error) {
    res.send(error.message);
  }
});

userRouter.delete('/:id', async (req, res) => {
  try {
    const user = await User.deleteOne({
      "_id": req.params.id
    });
    res.status(200).send({msg: 'Successfully deleted', user: user});
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = userRouter;