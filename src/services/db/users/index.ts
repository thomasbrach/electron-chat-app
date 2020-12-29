import { User } from '/common/types'
import { toLocal, toRemote } from '/services/db/utils'

import firebase from '../../../common/firebase'

export function createUser(id: string, user: User.Base) {
    return firebase
        .firestore()
        .collection('users')
        .doc(id)
        .set({
            ...user,
            id,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
        })
}

export async function getCurrentUser(id: string) {
    const snapshot = await firebase
        .firestore()
        .collection('users')
        .doc(id)
        .get()

    return snapshot.data() as User.Remote | undefined
}
