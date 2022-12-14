const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');


const router = express.Router();



router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/', userController.getAllUsers);


router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updatePassword', authController.protect, authController.updatePassword);





module.exports = router;