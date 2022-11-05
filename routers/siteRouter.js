const express = require('express');
const siteController = require('../controllers/siteController');
const deployController = require('../controllers/categoriesController')

const router = express.Router();

router.route('/')
    .get(siteController.getAllSite)
    .post(siteController.createNewSite)

router.route('/:id')
    .patch(siteController.updateSite)
    .delete(siteController.deleteSite)

router.route('/ihs')
    .get(siteController.getAllIHSid)








    module.exports = router;