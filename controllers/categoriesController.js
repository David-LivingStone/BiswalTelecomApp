const Deployment = require('../models/solutionDeploy')
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const Network = require('../models/networkModel');
const Project = require('./../models/projectModel');
const Site = require('./../models/siteCategoryModel');
const Solution = require('./../models/solutionModel');
const Class = require('./../models/classModel');
const Configuration = require('./../models/configurationModel');





exports.solutionDeploy = catchAsync(async( req, res, next) => {
    const newDeploy = await Deployment.create(req.body)

    res.status(200).json({
        status: 'created',
        data: {
            Solution_Deployed: newDeploy
        }

    });
});

exports.getSolutionDeploy = catchAsync(async(req, res, next) => {
    const deploy = await Deployment.find();

    res.status(200).json({
        status: 'Successfull',
        Result: deploy.length,
        data: {
            deploy
        }

    });

});

exports.createNetwork = catchAsync(async(req, res, next) =>{
    const network = await Network.create(req.body)

    res.status(200).json({
        status: 'Successfull',
        data: {
            network
        }

    });
});

exports.getAllNetwork = catchAsync(async(req, res, next) => {
    const network = await Network.find();
    
    res.status(200).json({
        status: 'Successfull',
        Result: network.length,
        data: {
            network
        }

    });
});




exports.createProject = catchAsync(async(req, res, next) =>{
    const project = await Project.create(req.body)

    res.status(200).json({
        status: 'Successfull',
        data: {
            project
        }

    });
});

exports.getAllProject = catchAsync(async(req, res, next) => {
    const project = await Project.find();
    
    res.status(200).json({
        status: 'Successfull',
        Result: project.length,
        data: {
            project
        }

    });
});





exports.createSite = catchAsync(async(req, res, next) =>{
    const site = await Site.create(req.body)

    res.status(200).json({
        status: 'Successfull',
        data: {
            site
        }

    });
});

exports.getAllSiteCategories = catchAsync(async(req, res, next) => {
    const site = await Site.find();
    
    res.status(200).json({
        status: 'Successfull',
        Result: site.length,
        data: {
            site
        }

    });
});





exports.createSolutionType = catchAsync(async(req, res, next) =>{
    const solution = await Solution.create(req.body)

    res.status(200).json({
        status: 'Successfull',
        data: {
            solution
        }

    });
});

exports.getAllSolutionTypes = catchAsync(async(req, res, next) => {
    const solution = await Solution.find();
    
    res.status(200).json({
        status: 'Successfull',
        Result: solution.length,
        data: {
            solution
        }

    });
});



exports.createClass = catchAsync(async(req, res, next) =>{
    const classtype = await Class.create(req.body)

    res.status(200).json({
        status: 'Successfull',
        data: {
            classtype
        }

    });
});

exports.getAllClasses = catchAsync(async(req, res, next) => {
    const classtype = await Class.find();
    
    res.status(200).json({
        status: 'Successfull',
        Result: classtype.length,
        data: {
            classtype
        }

    });
});



exports.createConfig = catchAsync(async(req, res, next) =>{
    const config = await Configuration.create(req.body)

    res.status(200).json({
        status: 'Successfull',
        data: {
            config
        }

    });
});

exports.getAllConfig = catchAsync(async(req, res, next) => {
    const config = await Configuration.find();
    
    res.status(200).json({
        status: 'Successfull',
        Result: config.length,
        data: {
            config
        }

    });
});


