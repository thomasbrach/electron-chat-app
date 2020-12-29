import firebase from '/common/firebase'
import { Channel, Message, User } from '/common/types'
import { toLocal, toRemote } from '/services/db/utils'

export async function createChannel(channel: Channel.Base, admin: User.Local) {
    const batch = firebase.firestore().batch()

    const channelRef = firebase.firestore().collection('channels').doc()
    batch.set(channelRef, {
        ...channel,
        id: channelRef.id,
        admin: toRemote(admin),
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
    })

    const channelUserRef = firebase
        .firestore()
        .collection('channels')
        .doc(channelRef.id)
        .collection('users')
        .doc(admin.id)
    batch.set(channelUserRef, toRemote(admin))

    const userCreatedChannelRef = firebase
        .firestore()
        .collection('users')
        .doc(admin.id)
        .collection('created_channels')
        .doc(channelRef.id)
    batch.set(userCreatedChannelRef, {
        ...channel,
        id: channelRef.id,
        admin: toRemote(admin),
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
    })

    const userJoinedChannelRef = firebase
        .firestore()
        .collection('users')
        .doc(admin.id)
        .collection('joined_channels')
        .doc(channelRef.id)
    batch.set(userJoinedChannelRef, {
        ...channel,
        id: channelRef.id,
        admin: toRemote(admin),
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
    })

    await batch.commit()
}

export async function getUserJoinedChannels(id: string) {
    const snapshot = await firebase
        .firestore()
        .collection('users')
        .doc(id)
        .collection('joined_channels')
        .get()

    return snapshot.docs.map((doc) => toLocal(doc.data() as Channel.Remote))
}

export async function getAllChannels() {
    const snapshot = await firebase.firestore().collection('channels').get()

    return snapshot.docs.map((doc) => toLocal(doc.data() as Channel.Remote))
}

export async function joinChannel(user: User.Remote, channel: Channel.Local) {
    const { id: userId } = user
    const { id: channelId } = channel

    const batch = firebase.firestore().batch()

    const channelUsersRef = firebase
        .firestore()
        .collection('channels')
        .doc(channelId)
        .collection('users')
        .doc(userId)
    batch.set(channelUsersRef, user)

    const userChannelsRef = firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('joined_channels')
        .doc(channelId)
    batch.set(userChannelsRef, toRemote(channel))

    await batch.commit()
}

export async function getChannel(id: string) {
    const doc = await firebase.firestore().collection('channels').doc(id).get()

    return toLocal(doc.data() as Channel.Remote)
}

export function onChannelJoinedUsersChanged(
    channelId: string,
    observer: (users: User.Local[]) => void,
) {
    return firebase
        .firestore()
        .collection('channels')
        .doc(channelId)
        .collection('users')
        .onSnapshot((snapshot) => {
            const users = snapshot.docs.map((doc) =>
                toLocal(doc.data() as User.Remote),
            )
            observer(users)
        })
}

export function onChannelUsersConnectionStateChanged(
    channelId: string,
    userId: string,
) {
    const channelUserRef = firebase
        .firestore()
        .collection('channels')
        .doc(channelId)
        .collection('users')
        .doc(userId)

    const listener = firebase
        .database()
        .ref('.info/connected')
        .on('value', (snapshot) => {
            if (snapshot.val() === false) {
                return
            } else {
                channelUserRef.update({
                    state: 'online',
                    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
                })
            }
        })

    return function () {
        channelUserRef.update({
            state: 'offline',
            last_changed: firebase.firestore.FieldValue.serverTimestamp(),
        })
        firebase.database().ref('.info/connected').off('value', listener)
    }
}

export function createMessage(id: string, content: string, user: User.Local) {
    const channelMessageRef = firebase
        .firestore()
        .collection('channels')
        .doc(id)
        .collection('messages')
        .doc()

    return firebase
        .firestore()
        .collection('channels')
        .doc(id)
        .collection('messages')
        .doc(channelMessageRef.id)
        .set({
            id: channelMessageRef.id,
            sender: user,
            content,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
        })
}

export function onChannelMessagesStateChanged(
    id: string,
    observer: (messages: Message.Local[]) => void,
) {
    return firebase
        .firestore()
        .collection('channels')
        .doc(id)
        .collection('messages')
        .orderBy('created_at', 'asc')
        .onSnapshot((snapshot) => {
            const messages = snapshot
                .docChanges()
                .filter((change) => change.type === 'added')
                .map((change) => {
                    const remoteMessage = change.doc.data({
                        serverTimestamps: 'estimate',
                    }) as Message.Remote
                    return {
                        id: remoteMessage.id,
                        content: remoteMessage.content,
                        sender: toLocal(remoteMessage.sender),
                        created_at: remoteMessage.created_at
                            ? remoteMessage.created_at.toDate()
                            : '',
                    } as Message.Local
                })
            observer(messages)
        })
}
