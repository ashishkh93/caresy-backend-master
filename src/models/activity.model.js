const { time } = require('faker');
const mongoose = require('mongoose');
const { activityTypes } = require('../config/authtypes');

const activitySchema = mongoose.Schema(
    {
        babyId : {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Baby',
            required: true,
        },
        date : {
            type : Date ,
            required : true,
        },
        activityType : {
            type : String,
            enum : activityTypes,
            required : true,
        },
        start : {
            type : String,
            required : true,
        },
        end : {
            type : String,
            required : true,
        },
        duration : {
            type : String,
            required : true,
        },
        notes : {
            type : String,
            required : true,
        },
        method : {
            type : String,
        },
        amount : {
            type : String,
        },
        wet : {
            type : Boolean,
        },
        solid : {
            type : Boolean,
        },
        color : {
            type : String,
        }
    },
    {
        timestamps : true,
    }
)

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;