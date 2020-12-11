import React from 'react'

export default function App() {
    const title = 'Hello World'
    const enhancedTitle = `${title} - React App!`

    function sendNotification() {
        // eslint-disable-next-line
        electron.notification.sendNotification('My custom message')
    }

    return (
        <>
            <h1>{enhancedTitle}</h1>
            <button onClick={sendNotification}>Send notifications</button>
        </>
    )
}
