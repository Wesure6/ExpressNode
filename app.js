const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mysql_promise = require('promise-mysql');
const mqtt = require('mqtt');
const log4js = require('log4js');
const proxy = require('express-http-proxy');
const amqpcm = require('./routes/amqpDemo');
const moment = require('moment');
var rp = require('request-promise');
var svgCaptcha = require('svg-captcha');
var session = require('express-session');
var MemoryStore = require('memorystore')(session);
var security = require('./routes/security');
let app = express();

// bodyParser 对post请求的请求体进行解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//处理每一个请求的cookie
app.use(cookieParser());

//ejs 引擎
app.set('view engine', 'ejs');
//关闭ejs模板调试信息
app.set("view options", {
    "debug": false
});

//配置log4js
log4js.configure(require('./config/logger'));
global.T = require('i18n');
global.sprintf = require("sprintf-js").sprintf;
global.figlet = require('figlet').textSync;
global.log = log4js.getLogger('console');

//系统全局变量APP
global.APP = {};
APP.config = require('./config/default');
APP.dbpool = mysql.createPool({
    host: APP.config.db.host,
    port: APP.config.db.port,
    user: APP.config.db.user,
    password: APP.config.db.password,
    database: APP.config.db.database,
    // 允许执行多条sql语句
    multipleStatements: true
});
APP.dbpool_promise = mysql_promise.createPool({
    host: APP.config.db.host,
    port: APP.config.db.port,
    user: APP.config.db.user, password: APP.config.db.password,
    database: APP.config.db.database,
    connectionLimit: 10,
    multipleStatements: true
});

APP.mqtt_client = mqtt.connect(
    sprintf("mqtt://%s", APP.config.mq.mqtt_host),
    {username: APP.config.mq.mqtt_user, password: APP.config.mq.mqtt_pwd}
);
//i18n 国际化 config
T.configure({
    locales: ['en_US', 'zh_CN'],
    defaultLocale: APP.config.app.lang,
    directory: __dirname + '/locales',
    updateFiles: false
});

T.setLocale(APP.config.app.lang);
app.use(T.init);

// 在路由模块中安装 i18n 中间件
function i18n(req, res, next) {
    req.setLocale(req.app.locals.lang);
    next();
}

app.locals.version = '0.0.1';
app.locals.app_name = APP.config.app.app_name;
app.locals.lang = APP.config.app.lang;
app.locals.theme = APP.config.app.theme;
app.locals.area = APP.config.app.area;
app.locals.debug = APP.config.app.debug;
app.locals.login_timeout = APP.config.app.login_timeout;
app.locals.mqtt_websocket_host = APP.config.mq.mqtt_host;
app.locals.mqtt_websocket_port = APP.config.mq.mqtt_websocket_port;
app.locals.mqtt_websocket_user = APP.config.mq.mqtt_user;
app.locals.mqtt_websocket_pwd = APP.config.mq.mqtt_pwd;
app.locals.amqp_host = APP.config.mq.amqp_host;
app.locals.amqp_port = APP.config.mq.amqp_port;
app.locals.enable_https = APP.config.app.enable_https;
app.locals.enable_mapapi = APP.config.app.enable_mapapi;
app.locals.terminal_websocket_host = APP.config.terminal_websocket_server.host;
app.locals.terminal_websocket_port = APP.config.terminal_websocket_server.port;
app.locals.svgCaptcha = svgCaptcha;
// app.locals.user = '';

APP.sessionStore = new session.MemoryStore();

app.use(session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret',
    rolling: true,
    store: APP.MemoryStore,
    cookie: {
        maxAge: 1000 * APP.config.app.login_timeout
        // maxAge: 1000 * 60 *2
    }
}));


// 静态目录缓存参数
let maxAge = {maxAge:1000 * APP.config.app.static_cache_maxage};
app.use(express.static(path.join(__dirname, 'static'),maxAge));


//入口界面
switch (APP.config.app.build_mode) {
    case 'development':
        console.log('APP.config.app.build_mode','development');
        // 开发模式代码位置
        app.locals.ui_template = 'development';
        app.set('views',            path.join(__dirname, 'extroot'));
        app.use('/', express.static(path.join(__dirname, 'extroot'),maxAge));
        break;
    case 'production':
        // 生产环境代码位置
        app.locals.ui_template = 'production';
        app.set('views',            path.join(__dirname, 'extroot/build/production/Admin'));
        app.use('/', express.static(path.join(__dirname, 'extroot/build/production/Admin'),maxAge));
        break;
    case 'testing':
        // build后测试环境代码位置
        app.locals.ui_template = 'production';
        app.set('views',            path.join(__dirname, 'extroot/build/testing/Admin'));
        app.use('/', express.static(path.join(__dirname, 'extroot/build/testing/Admin'),maxAge));
}

// render页面url
let ui_render = require('./routes/framework/ui_render');
app.use('/login',   ui_render);
app.use('/ui',      security.restrict,ui_render);


app.use('/login',               require('./routes/framework/login'));

let use_proxy = function (items) {
    for (let k in items) {
        log.debug('use proxy', k, '----->', items[k]);
        app.use(k, proxy(items[k]));
    }
};
//使用代理
use_proxy(APP.config.proxy.internal);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// amqpcm.init();

console.figlet = function (s) {
    console.log(figlet(s));
};
console.figlet('start server!');

module.exports = app;
