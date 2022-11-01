const express = require('express')
const spareController = require('./../controllers/spareController')
const returnController = require('./../controllers/spareReturnController')
const authController = require('./../controllers/authController')

const router = express.Router();

router.route('/')
    .post(authController.protect, authController.restrictTo('team-lead'), spareController.spareRequest)
    .get(authController.protect, spareController.getAllRequest)

router.route('/pending')
    .get(authController.protect, spareController.getNewRequest)

router.route('/authorized')
    .get(authController.protect, spareController.authorizedSpareRequests)

router.route('/authorize/:id')
    .patch(authController.protect, spareController.authorizeRequest)

router.route('/approved')
    .get(authController.protect, spareController.approvedSpareRequests)

router.route('/approved/:id')
    .patch(authController.protect, spareController.approveARequest)






    module.exports = router;