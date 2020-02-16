// import contact model
Record = require('./model');

exports.index = function (req, res) {
    Record.get( req.body,function (err, records) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "retrieved successfully",
            data: records
        });
    });
};

exports.filter = function (req,res) {
    Record.get(req.body , function (err,records) {
        if (err)
            res.json({
                code: 1,
                msg: 'unsuccessful'
            });
        res.json({
            code: 0,
            msg: 'success',
            records: records
    })
});
};



