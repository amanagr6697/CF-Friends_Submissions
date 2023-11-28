const { Router } = require('express');
const authController = require('../controllers/authController');
const favouriteController = require('../controllers/favouriteController');
const { checkUser } = require('../middleware/authMiddleware');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.post('/favAdd', checkUser, favouriteController.problems_add);

module.exports = router;