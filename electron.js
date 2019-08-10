var electron = require("electron");
var { app, BrowserWindow, Menu } = electron;

var BrowserWindow = electron.BrowserWindow;

var path = require("path");


// Let electron reloads by itself when parcel watches changes in ./dist/
if (process.env.ELECTRON_START_URL) {
    require('electron-reload')(__dirname)
  }

// To avoid being garbage collected
var mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680
    });
    
    var { menuTemplate } = require('./src/electron-helpers/menu.js');
    var mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    
    var startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, './build/index.html'),
        protocol: 'file:',
        slashes: true
      });


    mainWindow.loadURL(startUrl)


    
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });
}

app.on("ready", createWindow);

app.on("window-all-closed",  function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});