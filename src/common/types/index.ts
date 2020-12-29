import firebase from '../firebase'

export namespace User {
    export type Base = {
        email: string
        username: string
        avatar: string
    }

    export type Remote = {
        id: string
        email: string
        username: string
        avatar: string
        state?: 'offline' | 'online'
        last_changed?: firebase.firestore.Timestamp
        created_at: firebase.firestore.Timestamp
    }

    export type Local = Omit<Remote, 'last_changed' | 'created_at'> & {
        last_changed?: Date
        created_at: Date
    }
}

export namespace Channel {
    export type Base = {
        name: string
        description: string
        avatar: string
    }

    export type Remote = {
        id: string
        name: string
        description: string
        avatar: string
        admin: User.Remote
        created_at: firebase.firestore.Timestamp
    }

    export type Local = Omit<Remote, 'admin' | 'created_at'> & {
        admin: User.Local
        created_at: Date
    }
}

export namespace Message {
    export type Remote = {
        id: string
        content: string
        sender: User.Remote
        created_at: firebase.firestore.Timestamp
    }

    export type Local = Pick<Remote, 'id' | 'content'> & {
        sender: User.Local
        created_at: Date
    }
}
