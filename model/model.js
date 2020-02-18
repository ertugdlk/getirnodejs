//import mongoose
var mongoose = require('mongoose');
var _ = require('lodash');

//create schema for modelling mongo
var recordSchema = mongoose.Schema({
    key: {
        type: String,
    },
    value:{
        type: String,
    },
    createdAt: {
        type: Date,
    },
    counts: Array,
});

//model
var Record = module.exports = mongoose.model('record', recordSchema);

//Get records with POST params adding field for totalcount also checking filters
module.exports.get = function (params, callback, limit) {
    try {
        var minVal = parseInt(params.minCount);
        var maxVal = parseInt(params.maxCount);
        var startDate = params.startDate;
        var endDate = params.endDate;

        //totalCount param settings $match
        var valueParam = {};
        if (_.isNaN(minVal)) {
            valueParam["$gte"] = Number.MIN_SAFE_INTEGER;
        } else {
            valueParam["$gte"] = minVal;
        }

        if (_.isNaN(maxVal)) {
            valueParam["$lte"] = Number.MAX_SAFE_INTEGER;
        } else {
            valueParam["$lte"] = maxVal;
        }

        //between dates param settings $match
        var dateParam = {};
        if (!_.isUndefined(startDate)) {
            dateParam["$gte"] = new Date(startDate);
        }

        if (!_.isUndefined(endDate)) {
            dateParam["$lte"] = new Date(endDate);
        }

        if (_.isUndefined(limit) || limit < 0) {
            limit = Number.MAX_SAFE_INTEGER;
        }

        //matchParams initialized before because empty param does not return data
        var matchParams = {};
        if(!_.isEmpty(valueParam )) {
            matchParams['totalCount'] = valueParam;
        }
        if(!_.isEmpty(dateParam )) {
            matchParams['createdAt'] = dateParam;
        }

        limit = Number.MAX_SAFE_INTEGER;
        //filter records by matchParams , also counts[] added by new field totalCount which is sum of count values
        Record.aggregate(
            [
                {
                    "$addFields": {
                        "totalCount": {
                            "$reduce": {
                                "input": "$counts",
                                "initialValue": 0,
                                "in": {"$add": ["$$value", "$$this"]}
                            }
                        }
                    }
                },
                {
                    "$match": matchParams
                },
                {
                    "$project": {
                        _id: 0,
                        key: 1,
                        createdAt: 1,
                        totalCount: 1,
                    }
                },
                {"$limit": limit}
            ]
        ).exec((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
    catch (e) {
        callback(e,null);
    }
};


