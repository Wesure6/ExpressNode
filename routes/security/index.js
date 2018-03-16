const request = require('request');

// 用户登录检查
function restrict(req, res, next) {

    if (!req.session.user) {
        res.redirect('/login#');
    } else {
        next();
    }
}

exports.restrict = restrict;
