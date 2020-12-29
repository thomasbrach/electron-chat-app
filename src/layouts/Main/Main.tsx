import React from 'react'

import { TopBar } from './TopBar'

type Props = {
    children?: React.ReactNode
}

export default function Main(props: Props) {
    const { children } = props

    return (
        <>
            <TopBar />
            {children}
        </>
    )
}
