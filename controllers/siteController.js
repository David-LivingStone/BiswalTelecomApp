const Site = require('./../models/siteInfoModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.getAllSite = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Site.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const sites = await features.query;
    
    res.status(200).json({
        status: 'Success',
        Total_Records:sites.length,
        data: {
                sites
        }
    });
});

exports.createNewSite = catchAsync( async(req, res, next) => {
    const newSite = await Site.create(req.body);
   

    res.status(201).json({
        status: 'Success',
        data: {
            Site_Details: newSite
        }
    });
});

exports.deleteSite = catchAsync(async(req, res, next) => {
    const currentSite = await Site.findByIdAndDelete(req.params.id)
    if (!currentSite){
        return next(new AppError('No Site found with this ID', 404));
    }
    res.status(204).json({
        status: 'Success',
        data: null
    });
});

exports.updateSite = catchAsync(async (req, res, next) => {
    req.body.updatedAt=Date.now();
    const currentSite = await Site.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        
    });
    if (!currentSite){
        return next(new AppError('No Site found with this ID', 404))
    }
    res.status(200).json({
        status: 'Success',
        data: {
            currentSite
        }
    });
});

exports.getAllIHSid = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match:{
                startDates:{
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group:{
                _id: {$month: '$startDates'},
                numToursStarts: {$sum: 1},
                tours: {$push: '$name'}
            }
        },
        {
            $addFields: {month: '$_id'}
        },
        {
            $project: {
                _id:0
            }
        },
        {
            $sort: {numToursStarts: -1}
        },
        {
            $limit: 5
        }
    ]);

    
    
    res.status(200).json ({
        status: 'success',
        data: {
            site
        } 
    });  
});
