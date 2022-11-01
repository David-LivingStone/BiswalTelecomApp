const express = require('express')
const returnController = require('./../controllers/spareReturnController')

const router = express.Router();

router.route('/')   
    .get(returnController.spareReturn)




    module.exports = router;