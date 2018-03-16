var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    // log.debug('switching lang to', req.body.lang);
    req.app.locals.lang = req.body.lang;
    res.json(200, {success: true});
});

router.get('/get_i18n_dict', function(req, res, next) {
    // req.setLocale(req.query.lang);
    res.json(200, {
        success: true,
        lang: req.app.locals.lang,
        dict: req.getCatalog()
    });
});

module.exports = router;