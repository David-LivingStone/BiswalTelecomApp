const { default: mongoose } = require('mongoose');
const moogoose = require('mongoose');

const ppmSchema = new moogoose.Schema({
    ihsSiteId:{
        type: String
    },
    primaryAirFilter:{
        type: String
    },
    secondaryAirFilter:{
        type: String
    },
    oilFIlter:{
        type: String
    },
    fanBelt:{
        type: String
    },
    engineOil:{
        type: String
    },
    
    remark:{
        type: String
    },

    date: {
        type: Date,
        default: Date.now(),
    },
    teamLeadName: String
});

const ppm = mongoose.model('ppm', ppmSchema)
module.exports = ppm;