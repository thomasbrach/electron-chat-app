/**
 * Listen to online/offline events and return listeners unsubscribe function
 * @param observer - any callback function
 */
export function onOnlineStateChanged(observer: () => void) {
    window.addEventListener('online', observer)
    window.addEventListener('offline', observer)

    return function () {
        window.removeEventListener('online', observer)
        window.removeEventListener('offline', observer)
    }
}

export function notificationPermission() {
    if (!('Notification' in window)) {
        console.error('This browser does not support notifications')
    } else if (Notification.permission === 'granted') {
        return
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Permission has been granted')
            }
        })
    }
}

export function showNotification(args: { title: string; body: string }) {
    const { title, body } = args
    new Notification(title, { body })
}
