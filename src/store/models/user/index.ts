import { Action, action } from 'easy-peasy'

import { User } from '/common/types'

export interface UserModel {
    // STATE
    currentUser: User.Local | null
    currentUsers: User.Local[]

    // ACTIONS
    setCurrentUser: Action<UserModel, User.Local | null>
    setCurrentUsers: Action<UserModel, User.Local[]>
    cleanState: Action<UserModel>
}

const userModel: UserModel = {
    // STATE
    currentUser: null,
    currentUsers: [],

    // ACTIONS
    setCurrentUser: action((state, payload) => ({
        ...state,
        currentUser: payload,
    })),

    setCurrentUsers: action((state, payload) => ({
        ...state,
        currentUsers: payload,
    })),

    cleanState: action((_state) => ({
        currentUser: null,
        currentUsers: [],
    })),
}

export default userModel
