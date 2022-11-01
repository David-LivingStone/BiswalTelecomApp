const { default: mongoose } = require('mongoose');
const moogoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');




const siteSchema = new mongoose.Schema({
    ihs_SiteID: {
        type: String,
        required: [true, 'IHS Site Id field must not be empty']

    },
    biswal_ID: {
        type: String,

    },
    takeOver_Date:{
        type: String
    },
    address:{
        type: String,

    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    region:{
        type: String
    },
    state:{
        type: String
    },
    solutionDeploy: {
        type: String,
        required: [true, 'Solution Deployed field must not be empty']
        // enum: values: ['ACGG','DCGG', 'ACDG', 'DCDG'],
    },
    networkStatus:{
        type: String,
        required: [true, 'Network Status field must not be empty']
        //enum:{ values: ['On Air', 'Decommissioned'],
           
    },
    project: {
        type: String,
        required: [true, 'Project Option field must not be empty']
        //enum: values: ['EMTS-SLB2116', 'IHS', 'EMTS-SLB555']
            
    },
    siteCategory:{
        type: String,
        required: [true, 'Site Category field must not be empty']
       // enum: values: ['P1', 'P2', 'P3','P4']
    },
    solutionType:{
        type: String,
        required: [true, 'Solution field must not be empty'],
       // enum: values: ['Running on Diesel', 'Running on Gas']
    },

    configuration:{
        type: String,
        required: [true, 'Configuration field must not be empty'],
       // enum:values: ['Indoor', 'Indoor/Outdoor', 'Outdoor']
    },

    class:{
        type: String,
        required: [true, 'Class field must not be empty'],
       // enum:values: ['Backbone', 'BTS', 'HUB']
    },
    tankLiter: Number,
    legacyCluster: String,
    gasClusterName: String,
    newClusterAddress: String,
    teamLead:{
        type: String,
        required:[true,'Input Team Leader Name']
    },
    TL_CUG: Number,
    teamLeadPhone: Number,
    teamLeadEmail:{
        type: String,
        required: [true, 'Please Provide Your Email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please Provide a Valid Email Address']
        },
    createdAT: {
        type: Date,
        default: Date.now(),
        select: false
    },
    updatedAt: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default:true,
        select: false
    }
});
// {
//     toJSON:{virtuals: true},
//     toObject:{virtuals: true}
// }


// siteSchema.virtual('createdAt').get(function() {
//     const time =  res.json(new Date());
//     return time;
// })

// Asign Date to Password Update
// siteSchema.pre('save', function(next) {
//     if (!this.isModified || this.isNew) return next();
//     this.updatedAt = Date.now();
//     console.log(updatedAt)
//     next();
// })
const Site = mongoose.model('Sites', siteSchema);

module.exports = Site;