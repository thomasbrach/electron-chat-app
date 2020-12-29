import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { RouteProps } from 'react-router-dom'

import { useStoreState } from '/hooks'
import { ROUTES } from '/router/routes'

type Props = {
    layout: React.ComponentType
    component: React.ComponentType
    isProtected?: boolean
} & RouteProps

export default function RouteWithLayout(props: Props) {
    const {
        layout: Layout,
        component: Component,
        isProtected = false,
        ...rest
    } = props
    const currentUser = useStoreState((s) => s.user.currentUser)

    return (
        <Route
            {...rest}
            render={(matchProps) =>
                isProtected && !currentUser ? (
                    <Redirect to={ROUTES.WELCOME} />
                ) : (
                    <Layout>
                        <Component {...matchProps} />
                    </Layout>
                )
            }
        />
    )
}
