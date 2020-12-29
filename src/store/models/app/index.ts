import { Action, action, Thunk, thunk } from 'easy-peasy'

import { showNotification } from '/services/app'
import { Injections } from '/store'

export interface AppModel {
    // STATE
    isLoading: boolean
    isOnline: boolean

    // ACTIONS
    setIsLoading: Action<AppModel, boolean>
    setIsOnline: Action<AppModel>

    // THUNKS
    onConnStateChange: Thunk<AppModel, undefined, Injections>
}

const appModel: AppModel = {
    // STATE
    isLoading: true,
    isOnline: navigator.onLine,

    // ACTIONS
    setIsLoading: action((state, payload) => ({
        ...state,
        isLoading: payload,
    })),

    setIsOnline: action((state) => ({
        ...state,
        isOnline: navigator.onLine,
    })),

    // THUNKS
    onConnStateChange: thunk(
        (actions, _payload, { injections: { services }, getState }) => {
            return services.app.onOnlineStateChanged(() => {
                actions.setIsOnline()

                showNotification({
                    title: 'Connection status: ',
                    body: getState().isOnline ? 'Online' : 'Offline',
                })
            })
        },
    ),
}

export default appModel
