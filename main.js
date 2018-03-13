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
            width: 1012,
            height: 630,
            minWidth: 1012,
            minHeight: 630,
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