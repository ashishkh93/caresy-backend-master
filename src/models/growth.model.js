const mongoose = require('mongoose');

const growthSchema = mongoose.Schema(
    {
        babyId : {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Baby',
            required: true,
        },
        headCircumference : {
            type : Number,
        },
        date : {
            type : Date,
        },
        height : {
            type : Number,
        },
        weight : {
            type : Number,
        },
    },
    {
        timestamps: true,
    }
)

const Growth = mongoose.model('Growth',growthSchema);

module.exports = Growth;