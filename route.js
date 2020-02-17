let router = require('express').Router();

//main page route settings
router.get('/', function (req, res) {
    res.json({
        status: 'api working',
        message: 'endpoint for filter action POST /api/records/ '
    });
});

var controller = require('./controller.js');

//route settings for /records
router.route('/records')
    .get(controller.index)
    .post(controller.filter);

module.exports = router;


