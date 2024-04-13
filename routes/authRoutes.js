const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);


router.get('/shop', authController.shop_get);
router.get('/about', authController.about_get);

router.get('/contact', authController.contact_get);
router.post('/contact', authController.contact_post);

router.get('/details/:productId', authController.details_get);

module.exports = router;