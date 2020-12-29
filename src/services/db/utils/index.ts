import firebase from '/common/firebase'

/**
 * Convert all JS Dates (incl. nested ones) into Firestore timestamps
 * Remove all keys which value is undefined
 * @param object - any JS object
 */
export function toLocal(object: any) {
    console.log('local', object)
    Object.keys(object).forEach((key) => {
        if (object[key] && typeof object[key] === 'object') {
            toLocal(object[key])
        } else if (
            object[key] &&
            object[key] instanceof firebase.firestore.Timestamp
        ) {
            object[key] = object[key].toDate()
        } else if (object[key] === undefined) {
            delete object[key]
        }
    })
    return object
}

/**
 * Convert all Firestore Timestamps (incl. nested ones) into JS Dates
 * Remove all keys which value is undefined
 * @param object - any JS object
 */
export function toRemote(object: any) {
    console.log('remote', object)
    Object.keys(object).forEach((key) => {
        if (object[key] && typeof object[key] === 'object') {
            toRemote(object[key])
        } else if (object[key] && typeof object[key] === typeof Date) {
            object[key] = firebase.firestore.Timestamp.fromDate(object[key])
        } else if (object[key] === undefined) {
            delete object[key]
        }
    })
    return object
}
