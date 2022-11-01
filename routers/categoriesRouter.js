const express = require('express');
const categoriesController = require('../controllers/categoriesController')

const router = express.Router();

router.route('/deploy')
    .post(categoriesController.solutionDeploy)
    .get(categoriesController.getSolutionDeploy)

router.route('/network')
    .post(categoriesController.createNetwork)
    .get(categoriesController.getAllNetwork)

router.route('/project')
    .post(categoriesController.createProject)
    .get(categoriesController.getAllProject)

router.route('/site')
    .post(categoriesController.createSite)
    .get(categoriesController.getAllSiteCategories)

router.route('/solution')
    .post(categoriesController.createSolutionType)
    .get(categoriesController.getAllSolutionTypes)

router.route('/class')
    .post(categoriesController.createClass)
    .get(categoriesController.getAllClasses)

router.route('/configuration')
    .post(categoriesController.createConfig)
    .get(categoriesController.getAllConfig)




    module.exports = router;