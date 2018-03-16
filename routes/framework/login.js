const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');

router.post('/', function (req, res, next) {
    req.app.locals.user = req.body.user;
    req.app.locals.password = req.body.password;
    req.session.user = req.body.user;
    // log.trace(req.body.user,req.body.password,req.body.img_text);
    let text = req.session.captcha.toLowerCase();
    if(text == req.body.img_text ){
        res.json(200, { success: true, 'url': 'ui'});
    } else {
        res.json(200, { success: false,'msg':'captcha error'});
    }


});

router.get('/text', function (req, res) {
    let text = req.session.captcha.toLowerCase();
    req.session.user = 'aaa';
    res.status(200).send(text);
});

router.get('/img', function (req, res) {
    let captcha = svgCaptcha.create({
        size: 4, // size of random string
        ignoreChars: '0Oo1IilDQ', // filter out some characters like 0o1i
        noise: 0, // number of noise lines
        color: true, // characters will have distinct colors instead of grey, true if background option is set
        // background: '#cc9966', // background color of the svg image
        // width: 150, // width of captcha
        // height: 32, // height of captcha
        // fontSize: 30, // captcha text size
    });
    console.log(captcha.text);
    req.session.captcha = captcha.text;
    req.session.save(function(err) {
        res.type('svg');
        res.status(200).send(captcha.data);
    });
});

module.exports = router;