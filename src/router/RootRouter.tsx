import React from 'react'

import { Main, Minimal, RouteWithLayout } from '/layouts'
import {
    ChannelView,
    CreateChannelView,
    HomeView,
    SettingsView,
    WelcomeView,
} from '/views'

import { ROUTES } from './routes'

export default function RootRouter() {
    return (
        <>
            <RouteWithLayout
                path={ROUTES.WELCOME}
                exact
                layout={Minimal}
                component={WelcomeView}
            />
            <RouteWithLayout
                path={ROUTES.HOME}
                layout={Main}
                component={HomeView}
                isProtected={true}
            />
            <RouteWithLayout
                path={ROUTES.CREATE_CHANNEL}
                exact
                layout={Main}
                component={CreateChannelView}
                isProtected={true}
            />
            <RouteWithLayout
                path={ROUTES.CHANNEL}
                layout={Main}
                component={ChannelView}
                isProtected={true}
            />
            <RouteWithLayout
                path={ROUTES.SETTINGS}
                layout={Main}
                component={SettingsView}
                isProtected={true}
            />
        </>
    )
}
