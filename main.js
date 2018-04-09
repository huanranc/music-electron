const electron = require('electron')
const path = require('path')
const url = require('url')
const {app, BrowserWindow, Menu, dialog, shell} = electron;


let mainWindow = null;
// App events
app.on('ready', () => {
    mainWindow = openWindow(null, null, false);
    //Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate(app, win)));
});

app.on('window-all-closed', () => {
    app.quit()
});

app.on('activate', () => {
    mainWindow.show();
});


// Define a function to create window
function openWindow(filePath, options, isMax) {
    !filePath && (filePath = path.join(__dirname, './public/index.html'));
    !options && (options = {});
    options = Object.assign(
        {
            width: 1024,
            height: 840,
            minwidth: 1024,
            minheight: 840,
            center: true,
            show: false,
            autoHideMenuBar: true
        },
        options
    );

    win = new BrowserWindow(options);
    isMax && win.maximize();

    //判断是否是开发模式
    const pkg = require('./package.json') // 引用package.json

    if (pkg.DEV) {
        win.loadURL("http://localhost:3001/")
    } else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, './build/index.html'),
            protocol: 'file:',
            slashes: true
        }))
    }

    // win.loadURL(url.format({
    //       pathname:path.join(__dirname, './build/index.html'),
    //       protocol:'file:',
    //       slashes:true
    //     }))

    win.on('ready-to-show', () => {
        win.show()
    });

    return win;
}

// const Koa = require('koa');
// const Router = require('koa-router');
// const path = require('path');
// const mysql = require('mysql')
// const MysqlStore = require('koa-mysql-session');
// const convert = require('koa-convert')
// const config = require('./config/config');
// const bodyParser = require('koa-bodyparser')
// const koaLogger = require('koa-logger');
// var cors = require('koa-cors');
// const apicache = require("apicache");
// const serve = require('koa-static');
// const { createWebAPIRequestPromise } = require('./util/util');


// const app = new Koa();

// // // session存储配置
// // const sessionMysqlConfig= {
// //   user: config.database.USERNAME,
// //   password: config.database.PASSWORD,
// //   database: config.database.DATABASE,
// //   host: config.database.HOST,
// // }

// // // 配置session中间件
// // app.use(session({
// //   key: 'USER_SID',
// //   store: new MysqlStore(sessionMysqlConfig)
// // }))

// // 配置控制台日志中间件
// app.use(convert(koaLogger()))

// // 配置ctx.body解析中间件
// app.use(bodyParser())

// // 跨域设置
// app.use(cors());

// // app.use = serve(path.join(__dirname));

// // const onlyStatus200 = (ctx, next) => ctx.status === 200;
// // let cache = apicache.middleware;

// // app.use(cache("2 minutes", onlyStatus200));

// app.use(async (ctx,next) => {
//   // ctx.type="text/html";
//   // ctx.body = 'music electron';
//   const proxy=ctx.query.proxy;
//   if (proxy) {
//     ctx.req.headers.cookie = ctx.req.headers.cookie + `__proxy__${proxy}`;
//     ctx.res.setHeader('')
//   }
//   await next();
// });

// let home = new Router()
// home.get('/',async ctx => {
//   ctx.body = 'music electron';
// })

// let album = new Router()

// // 获取专辑内容
// album.get('/',async(ctx,next)=>{
//   const req_cookie = ctx.cookies.get('Cookie') ? ctx.cookies.get('Cookie') : ''
//   const data ={
//     csrf_token: ''
//   }
//   const id=ctx.query.id
//   // createWebAPIRequest(
//   //   'music.163.com',
//   //   `/weapi/v1/album/${id}`,
//   //   'POST',
//   //   data,
//   //   cookie,
//   //   music_req => {
//   //     //console.log(music_req);
//   //     ctx.type="json/text"
//   //     ctx.body = music_req
//   //   }
//   // )
//   const {body, cookie} = await createWebAPIRequestPromise(
//     'music.163.com',
//     `/weapi/v1/album/${id}`,
//     'POST',
//     data,
//     req_cookie);
//   ctx.type="application/json"

//   ctx.body = body;
//   console.log(cookie);
// })


// let router = new Router();

// router.use('/',home.routes(),home.allowedMethods())
// router.use('/album',album.routes(),album.allowedMethods())

// app.use(router.routes()).use(router.allowedMethods())

// const port = process.env.PORT || 3000

// app.listen(port,()=>{console.log(`localhost:${port}`)});