const express = require('express');
const router = express.Router();
const fs = require('fs');

let render = function (req,res) {

    req.setLocale(req.app.locals.lang);
    let dict = req.getCatalog();

    let path = '../static/images/wallpaper';
    fs.readdir(path,function (err,files) {
        let pics = files.filter(function (item) {
            return item;
        });
        log.error(req.session.user);
        let i = parseInt(Math.floor(Math.random() * (pics.length - 1)));
        res.render(req.app.locals.ui_template,{
            "i18ndict": JSON.stringify(dict),
            "wallpaper": pics[i],
            "user": req.session.user,
        }, console.log("After Render"));
    });

};

router.get('/',render);

module.exports = router;