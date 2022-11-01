const catchAsync = require('../utils/catchAsync');
const Spare = require('./../models/spareRequestModel');
const APIFeatures = require('./../utils/apiFeatures')
const AppError = require('../utils/appError');

exports.spareReturn = catchAsync(async(req, res, next) => {
    try{
        const features = new APIFeatures(Spare.findOne({requestCode: req.params.requestCode}), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
         const spare = await features.query;
             if (spare) {
                 res.status(200). json ({
                status: 'success',
                data: spare
                
                    
            });
        }
    
        
    }
    catch(err){
        res.status(404).json({
            status: 'Fail',
            message: err
        })
    // let code = req.params.requestCode
    // let spare = await Spare.findOne({where: {code}})
   //const spare = await Spare.find(req.params.requestCode, req.body)
    
        //     console.log('Request:' + code);
        // }
        // return next(new AppError('No Request found with this Request Code', 404));
       
        //console.log(spare);
       
    }
});