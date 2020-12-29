import { Thunk, thunk } from 'easy-peasy'

import { Injections } from '/store'
import { StoreModel } from '/store/models'

export interface AuthModel {
    // THUNKS
    register: Thunk<
        AuthModel,
        { username: string; email: string; password: string; avatar: string },
        Injections
    >
    login: Thunk<AuthModel, { email: string; password: string }, Injections>
    logout: Thunk<AuthModel, undefined, Injections>
    onAuthStateChange: Thunk<AuthModel, undefined, Injections, StoreModel>
}

const authModel: AuthModel = {
    // THUNKS
    register: thunk(async (_actions, payload, { injections: { services } }) => {
        const { email, password, ...rest } = payload

        const { user } = await services.auth.createUserWithEmailAndPassword(
            email,
            password,
        )

        if (!user) {
            const error = new Error(
                'Sorry, the registration process encountered a problem...',
            )
            throw error
        }

        await services.db.users.createUser(user.uid, {
            email,
            ...rest,
        })
    }),

    login: thunk((_actions, payload, { injections: { services } }) => {
        const { email, password } = payload

        return services.auth.signInWithEmailAndPassword(email, password)
    }),

    logout: thunk((_actions, _payload, { injections: { services } }) => {
        return services.auth.signOut()
    }),

    onAuthStateChange: thunk(
        (_actions, _payload, { injections: { services }, getStoreActions }) => {
            return services.auth.onAuthStateChanged(async (user) => {
                try {
                    getStoreActions().app.setIsLoading(true)
                    if (user) {
                        const currentUser = await services.db.users.getCurrentUser(
                            user.uid,
                        )

                        if (!currentUser) {
                            const error = new Error(
                                'Sorry, the authentication process encountered a problem... Please try again later',
                            )
                            throw error
                        }

                        getStoreActions().user.setCurrentUser(
                            services.db.utils.toLocal(currentUser),
                        )
                    } else {
                        getStoreActions().user.cleanState()
                        getStoreActions().channel.cleanState()
                    }
                } catch (error) {
                    //TODO error management
                    console.log(error)
                } finally {
                    getStoreActions().app.setIsLoading(false)
                }
            })
        },
    ),
}

export default authModel
