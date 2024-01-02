const router = require('express').Router();
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');
//const blogRoutes = require('../blogRoutes');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;