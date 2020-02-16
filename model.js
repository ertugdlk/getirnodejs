var mongoose = require('mongoose');

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

var Record = module.exports = mongoose.model('record', recordSchema);

module.exports.get = function (params, callback, limit) {
    try {
        var minval = parseInt(params.minCount);
        var maxval = parseInt(params.maxCount);
        var start = new Date(params.startDate);
        var end = new Date(params.endDate);
        limit = Number.MAX_SAFE_INTEGER;
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
                    "$match":
                        {
                            'totalCount': {$gte: minval, $lte: maxval},
                        }
                },
                {
                    "$match":
                        {'createdAt': {$gte: start, $lte: end}}
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


