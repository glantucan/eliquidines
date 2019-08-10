const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

let externalWindow;

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Load recipe',
                accelerator: 
                    process.platform === 'darwin' ?
                        'Command+S' : 'Ctrl+S',
                click() {
                    console.log('Loading recipe');
                }
            },
            {
                label: 'Load recipes bundle',
                click() {
                    console.log('Loading recipes bundle');

                }
            },
            {
                label: 'Save recipe',
                accelerator: 
                    process.platform === 'darwin' ?
                        'Command+S' : 'Ctrl+S',
                click() {
                    console.log('Saving recipe');
                }
            },
            {
                label: 'Save recipes bundle',
                accelerator: 
                    process.platform === 'darwin' ?
                        'Command+Shift+S' : 'Ctrl+Shift+S',
                click() {
                    console.log('Saving recipes bundle');
                }
            },
            
        ]   

    },
    {
        label: 'External tools',
        submenu: [
            {
                label: 'Steam Engine',
                submenu:[
                    {
                        label: 'Coil Wrapping',
                        click() {
                            //http://www.steam-engine.org/coil.html
                            externalWindow = new BrowserWindow({
                                useContentSize: true
                            });
                            externalWindow.loadURL('http://www.steam-engine.org/coil.html');
                            externalWindow.on('closed', () => externalWindow = null);
                        }
                    }
                ]
            }
        ]
    },
    {
        label: 'About',
        click() {
            let aboutWindow = new BrowserWindow({
                width: 500,
                height: 200,
                title: 'About e-liquidines'
            });
            aboutWindow.loadURL('http://localhost:3000/e_about.html');
            aboutWindow.on('closed', () => aboutWindow = null);
        }
    }
];
// Add an empty menu for the macs
if (process.platform === 'darwin') {
    menuTemplate.unshift({});
}
if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'Debug',
        submenu: [
            {
                label: 'Toggle Dev Tools (F12)' ,
                accelerator:  
                    process.platform === 'darwin' ?
                    'Command+Alt+I' : 'F12',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    })
}


module.exports = { menuTemplate };