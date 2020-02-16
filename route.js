let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'api working',
        message: 'endpoint for filter action POST /api/records/ '
    });
});

var controller = require('./controller.js');

router.route('/records')
    .get(controller.index)
    .post(controller.filter);

module.exports = router;


