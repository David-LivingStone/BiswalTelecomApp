const { default: mongoose } = require('mongoose');
const moogoose = require('mongoose');

const spareSchema = new moogoose.Schema({
    teamLeadName:{
        type: String,
        require: [true, 'Team Lead Field is Required']
    },
    siteId:{
        type: String
    },
    ihsSiteId:{
        type: String
    },
    region:{
        type: String
    },
    cluster:{
        type: String
    },
    dcggSolution:{
        type: String
    },
    mode:{
        type: String,
        enum:{
            values: ['Dual','Single'],
            message:'Mode can only be Dual or Single'
        }
    },
    siteWorkHour:{
        type: String
    },
    spareSource:{
        type: String
    },
    spareRequestName:{
        type: String
    },
    crankBatteryMake:{
        type: String
    },
    crankBatterySerial:{
        type: String
    },
    UoM:{
        type: String
    },
    quantity:{
        type: Number
    },
    remark:{
        type: String
    },

    date: {
        type: Date,
        default: Date.now(),
    },
    isActive: {
        type: Boolean,
        default:true,
        select: false
    },
    requestCode:{
        type: String,
        
    },
    status:{
        type: String,
        enum:{
            values: ['Pending','Authorized','Delivered', 'Approved'],
            message:'Status Option is not available'
        },
        default: 'Pending'
        
    },
    requestedBy: String,
    approvedBy: String,
    authorizedBy: String,
    dateApproved: Date,
    dateAuthorized: Date,
    dateDelivered: Date,
})

const spare = mongoose.model('spare_requests', spareSchema)
module.exports = spare;