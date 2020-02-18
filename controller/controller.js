// import contact model
Record = require('../model/model');

//GET ALL
exports.index = function (req, res) {
    Record.get( req.body,function (err, records) {
        if (err) {
            res.json({
                code: 1,
                msg: 'unsuccessful'
            });
        }
        res.json({
            code: 0,
            message: "success",
            data: records
        });
    });
};

//POST filter method
exports.filter = function (req,res) {
    try {
        Record.get(req.body, function (err, records) {
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
    }
    catch (e) {
        res.json(e , null);
    }
};



