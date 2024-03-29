const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Handle user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400)
      .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400)
      .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.isSoftDeleted;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'Login successful!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Handle logout
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(204).end();
  }
});

module.exports = router;
