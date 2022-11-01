const catchAsync = require('../utils/catchAsync');
const Spare = require('./../models/spareRequestModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');



// exports.getUser = catchAsync (async(req, res, next) => {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//     const currentUser = await User.findById(decoded.id);
//     return currentUser;
// });


function regCode(){
    let Currentyear =  new Date().getFullYear();
    let year = (Currentyear % 100).toString();
    let m
   const localDate = new Date();
   const months = [
     'January',
     'February',
     'March',
     'April',
     'May',
     'June',
     'July',
     'August',
     'September',
     'October',
     'November',
     'December',
   ];
   let currentMonth = months[localDate.getMonth()];
    
    if (currentMonth === "January") m = 'A';
    if (currentMonth === "February") m = 'B';
    if (currentMonth === "March") m = 'C';
    if (currentMonth === "April") m = 'D';
    if (currentMonth === "May") m = 'E';
    if (currentMonth === "June") m = 'F';
    if (currentMonth === "July") m = 'G';
    if (currentMonth === "August") m = 'H';
    if (currentMonth === "September") m = 'I';
    if (currentMonth === "October") m = 'J';
    if (currentMonth === "November") m = 'K';
    if (currentMonth === "December") m = 'L';

    

const a = new Date();
let hour = a.getHours().toString();
let sec = a.getSeconds().toString();
return res = year + m + hour + sec;
   
}



exports.spareRequest = catchAsync(async(req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    const code = regCode();
    let request = {
        requestCode: req.body.ihsSiteId.split('_')[2] + code,
        teamLeadName: req.body.teamLeadName,
        siteId: req.body.siteId,
        ihsSiteId: req.body.ihsSiteId,
        region: req.body.region,
        cluster: req.body.cluster,
        dcggSolution: req.body.dcggSolution,
        mode: req.body.mode,
        siteWorkHour: req.body.siteWorkHour,
        spareSource: req.body.spareSource,
        spareRequestName: req.body.spareRequestName,
        crankBatteryMake: req.body.crankBatteryMake,
        crankBatterySerial: req.body.crankBatterySerial,
        UoM: req.body.UoM,
        quantity: req.body.quantity,
        remark: req.body.remark,
        requestedBy: currentUser.name
         
    }
    const spare = await Spare.create(request)
    res.status(200).json({
        status: 'Request Successfull',
        data: {
            Spare_Request: spare
        }

    })
   
});

exports.getAllRequest = catchAsync(async(req, res, next) => {
    const features = new APIFeatures(Spare.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const spare = await features.query;
    
    res.status(200).json({
        status: 'Success',
        result: spare.length,
        data: {
            Spare_Request: spare
        }

    })
});

exports.getNewRequest = catchAsync(async(req, res, next) => {        
     let request = await Spare.aggregate([ 
        { $unwind: "$status" }, 
        { $match: { status:'Pending' } },
        { $project: { _id:0 }},
        { $sort: {date: -1} },
        { $limit: 5}
        
    ]);

        

    if (!request) {
            return next(new AppError('No Pending Request', 200));
        }
    
    res.status(200).json ({
        status: 'success',
        result: request.length,
        data: {
            request
        }
            
        
    });  

});


exports.authorizedSpareRequests = catchAsync(async(req, res, next) => {        
    let request = await Spare.aggregate([ 
       { $unwind: "$status" }, 
       { $match: { status:'Authorized'} },
       { $project: { _id:0 }},
       { $sort: {date: -1} },
       { $limit: 10}   
   ]);

   if (!request) {
           return next(new AppError('No Pending Request', 200));
       }
   
   res.status(200).json ({
       status: 'success',
       result: request.length,
       data: {
           request
       } 
    });

});

exports.authorizeRequest = catchAsync(async(req, res, next) => {
  
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    req.body.dateAuthorized = Date.now();
    user = await User.findOne(currentUser);
    req.body.authorizedBy = user.name;

    const currentStatus = await Spare.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        
    });
    if (!currentStatus) {
        return next(new AppError('No Pending Request for Authorization', 200));
    }
    res.status(200).json ({
        status: 'Spare Authorized',
        data: {
            currentStatus
        }   
    }); 

});


exports.approvedSpareRequests = catchAsync(async(req, res, next) => {        
    let request = await Spare.aggregate([ 
       { $unwind: "$status" }, 
       { $match: { status:'Approved'} },
       { $project: { _id:0 }},
       { $sort: {date: -1} },
       { $limit: 10}  
   ]);

   if (!request) {
           return next(new AppError('No Pending Approved Spare Request', 200));
       }
   
   res.status(200).json ({
       status: 'success',
       result: request.length,
       data: {
           request
       } 
    });

});

exports.approveARequest = catchAsync(async(req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    req.body.dateApproved = Date.now();
    user = await User.findOne(currentUser);
    req.body.approvedBy = user.name;

    const currentStatus = await Spare.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        
    });
    if (!currentStatus) {
        return next(new AppError('No Pending Request for Approval', 200));
    }
    res.status(200).json ({
        status: 'Spare Successfully Approved',
        data: {
            currentStatus
        }   
    }); 

});




