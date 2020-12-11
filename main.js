const { app, BrowserWindow, ipcMain, Notification } = require('electron')
const reloadBrowserWindow = require('electron-reload')
const path = require('path')

const isDev = !app.isPackaged

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        },
        backgroundColor: 'white',
    })

    win.loadFile('index.html')
    if (isDev) win.webContents.openDevTools()
}

if (isDev) {
    reloadBrowserWindow(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('NOTIFICATION_SENT', (_, message) => {
    new Notification({ title: 'Notification', body: message }).show()
})
