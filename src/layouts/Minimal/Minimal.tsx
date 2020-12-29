import React from 'react'

type Props = {
    children?: React.ReactNode
}

export default function Minimal(props: Props) {
    const { children } = props

    return <>{children}</>
}
