const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    notification: {
        sendNotification(message) {
            ipcRenderer.send('NOTIFICATION_SENT', message)
        },
    },
})
