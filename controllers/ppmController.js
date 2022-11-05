const catchAsync = require('../utils/catchAsync');
const Repair = require('./../models/ppmModel');
const APIFeatures = require('./../utils/apiFeatures')
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');

exports.getGenRepair = catchAsync(async(req, res, next) => {
        const features = new APIFeatures(Repair.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

         const repair = await features.query;

        res.status(200).json({
        status: 'Success',
        result: repair.length,
        data: {
            Data: repair
        }

    });
});

exports.genRepair = catchAsync(async(req, res, next) => {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);
    
        
        let repair = {
            ihsSiteId: req.body.ihsSiteId,
            teamLeadName: currentUser.name,
            primaryAirFilter: req.body.primaryAirFilter,
            secondaryAirFilter: req.body.secondaryAirFilter,
            oilFIlter: req.body.oilFIlter,
            fanBelt: req.body.fanBelt,
            engineOil: req.body.engineOil,
            remark: req.body.remark
             
        }
        const genrepair = await Repair.create(repair)
        res.status(200).json({
            status: 'Repair Successfully Registered',
            data: {
                Data: genrepair
            }
    
        });
       
});

