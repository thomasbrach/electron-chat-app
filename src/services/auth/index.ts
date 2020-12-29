import firebase from '/common/firebase'
import { User } from '/common/types'

export function createUserWithEmailAndPassword(
    email: string,
    password: string,
) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export function signInWithEmailAndPassword(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
}

export function signOut() {
    return firebase.auth().signOut()
}

export function onAuthStateChanged(
    observer: (user: firebase.User | null) => void,
) {
    return firebase.auth().onAuthStateChanged(observer)
}
