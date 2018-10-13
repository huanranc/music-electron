const electron = require('electron')
const path = require('path')
const url = require('url')
const { app, BrowserWindow } = electron

// Electron 会在初始化后并准备 创建浏览器窗口时，调用这个函数。 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出， 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时， 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})

let win

function createWindow() {
  
  // 创建浏览器窗口。
  win = new BrowserWindow(Object.assign({}, {
    width: 1024,
    height: 786,
    minwidth: 1024,
    minheight: 786,
    center: true,
    show: false,
    autoHideMenuBar: true
  }))
  // win.maximize()

  //判断是否是开发模式
  const pkg = require('./package.json') // 引用package.json
  // 然后加载应用的 index.html。
  if (pkg.DEV) {
    win.loadURL("http://localhost:3001/")
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, './build/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  // 当页面已经渲染完成(但是还没有显示) 并且窗口可以被显示时触发
  win.on('ready-to-show', () => {
    win.show()
  });

  // // 打开开发者工具
  // win
  //   .webContents
  //   .openDevTools()

  return win;

  // 当 window 被关闭，这个事件会被触发。
  // win.on('closed', () => {
  //   // 取消引用 window 对象，如果你的应用支持多窗口的话， 通常会把多个 window 对象存放在一个数组里面， 与此同时，你应该删除相应的元素。
  //   win = null
  // })
}
