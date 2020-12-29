import { createStore } from 'easy-peasy'

import services from '/services'

import storeModel from './models'

export type Injections = {
    services: typeof services
}

export const store = createStore(storeModel, {
    disableImmer: true,
    middleware: [],
    devTools: true,
    injections: { services },
})
