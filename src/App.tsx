import React from 'react'
import { Switch } from 'react-router-dom'

import { useStoreActions, useStoreState } from '/hooks'
import RootRouter from '/router/RootRouter'
import { LoadingView } from '/views'

export default function App() {
    const isOnline = useStoreState((s) => s.app.isOnline)
    const isLoading = useStoreState((s) => s.app.isLoading)
    const onConnStateChange = useStoreActions((a) => a.app.onConnStateChange)
    const onAuthStateChange = useStoreActions((a) => a.auth.onAuthStateChange)

    React.useEffect(() => {
        const unsubscribeConn = onConnStateChange()
        const unsubscribeAuth = onAuthStateChange()

        return () => {
            unsubscribeAuth()
            unsubscribeConn()
        }
    }, [onAuthStateChange, onConnStateChange])

    if (!isOnline)
        return <LoadingView content="You are offline. Please reconnect..." />

    if (isLoading) return <LoadingView content="Just one moment please..." />

    return (
        <Switch>
            <RootRouter />
        </Switch>
    )
}
