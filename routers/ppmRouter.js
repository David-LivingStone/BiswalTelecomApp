const express = require('express')
const ppmController = require('./../controllers/ppmController')
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/')   
    .post(authController.protect, ppmController.genRepair)
    .get(ppmController.getGenRepair)




    module.exports = router;