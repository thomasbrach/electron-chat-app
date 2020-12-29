import { Action, action, Thunk, thunk } from 'easy-peasy'

import { Channel, Message } from '/common/types'
import { Injections } from '/store'

import { StoreModel } from '../'

export interface ChannelModel {
    // STATE
    joinedChannels: Channel.Local[]
    joinableChannels: Channel.Local[]
    currentChannel: Channel.Local | null
    currentMessages: Message.Local[]

    // ACTIONS
    setJoinedChannels: Action<ChannelModel, Channel.Local[]>
    setJoinableChannels: Action<ChannelModel, Channel.Local[]>
    updateChannels: Action<ChannelModel, Channel.Local>
    setCurrentChannel: Action<ChannelModel, Channel.Local>
    setCurrentMessages: Action<ChannelModel, Message.Local[]>
    cleanState: Action<ChannelModel>

    // THUNKS
    createChannel: Thunk<
        ChannelModel,
        { name: string; description: string; avatar: string },
        Injections,
        StoreModel
    >
    getChannels: Thunk<ChannelModel, undefined, Injections, StoreModel>
    joinChannel: Thunk<ChannelModel, Channel.Local, Injections, StoreModel>
    getCurrentChannel: Thunk<ChannelModel, { id: string }, Injections>
    onChannelStateChange: Thunk<
        ChannelModel,
        { id: string },
        Injections,
        StoreModel
    >
    sendMessage: Thunk<
        ChannelModel,
        { content: string },
        Injections,
        StoreModel
    >
}

const channelModel: ChannelModel = {
    // STATE
    joinedChannels: [],
    joinableChannels: [],
    currentChannel: null,
    currentMessages: [],

    // ACTIONS
    setJoinedChannels: action((state, payload) => ({
        ...state,
        joinedChannels: payload,
    })),

    setJoinableChannels: action((state, payload) => ({
        ...state,
        joinableChannels: payload,
    })),

    updateChannels: action((state, payload) => ({
        ...state,
        joinedChannels: [...state.joinedChannels, payload],
        joinableChannels: state.joinableChannels.filter(
            (channel) => channel.id !== payload.id,
        ),
    })),

    setCurrentChannel: action((state, payload) => ({
        ...state,
        currentChannel: payload,
    })),

    setCurrentMessages: action((state, payload) => ({
        ...state,
        currentMessages: [...state.currentMessages, ...payload],
    })),

    cleanState: action((_state) => ({
        joinedChannels: [],
        joinableChannels: [],
        currentChannel: null,
        currentMessages: [],
    })),

    // THUNKS
    createChannel: thunk(
        async (
            _actions,
            payload,
            { injections: { services }, getStoreState },
        ) => {
            const currentUser = getStoreState().user.currentUser

            if (!currentUser) {
                const error = new Error(
                    'You must be authenticated to create a channel',
                )
                throw error
            }

            await services.db.channels.createChannel(payload, currentUser)
        },
    ),

    getChannels: thunk(
        async (
            actions,
            _payload,
            { injections: { services }, getStoreState },
        ) => {
            const { id } = getStoreState().user.currentUser!
            const joinedChannels = await services.db.channels.getUserJoinedChannels(
                id,
            )
            actions.setJoinedChannels(joinedChannels)

            const joinedChannelsId = joinedChannels.map((channel) => channel.id)
            const channels = await services.db.channels.getAllChannels()
            const otherChannels = channels.filter(
                (channel) => !joinedChannelsId.includes(channel.id),
            )
            actions.setJoinableChannels(otherChannels)
        },
    ),

    joinChannel: thunk(
        async (
            actions,
            payload,
            { injections: { services }, getStoreState },
        ) => {
            const currentUser = getStoreState().user.currentUser

            if (!currentUser) {
                const error = new Error('User must be logged in')
                throw error
            }

            await services.db.channels.joinChannel(
                services.db.utils.toRemote(currentUser),
                payload,
            )
            actions.updateChannels(payload)
        },
    ),

    getCurrentChannel: thunk(
        async (actions, payload, { injections: { services } }) => {
            const currentChannel = await services.db.channels.getChannel(
                payload.id,
            )
            actions.setCurrentChannel(currentChannel)
        },
    ),

    onChannelStateChange: thunk(
        (
            actions,
            payload,
            { injections: { services }, getStoreState, getStoreActions },
        ) => {
            const { id } = payload
            const unsubscribeJoinedUsers = services.db.channels.onChannelJoinedUsersChanged(
                id,
                (users) => {
                    const currentUsers = users.filter(
                        (user) =>
                            user.id !== getStoreState().user.currentUser?.id,
                    )
                    getStoreActions().user.setCurrentUsers(currentUsers)
                },
            )

            const { id: userId } = getStoreState().user.currentUser!
            const unsubscribeUsersConnection = services.db.channels.onChannelUsersConnectionStateChanged(
                id,
                userId,
            )

            const unsubscribeMessages = services.db.channels.onChannelMessagesStateChanged(
                id,
                (messages) => {
                    actions.setCurrentMessages(messages)
                },
            )

            return function () {
                unsubscribeJoinedUsers()
                unsubscribeUsersConnection()
                unsubscribeMessages()
            }
        },
    ),

    sendMessage: thunk(
        async (
            _actions,
            payload,
            { injections: { services }, getState, getStoreState },
        ) => {
            const { content } = payload
            const { id } = getState().currentChannel!
            const currentUser = getStoreState().user.currentUser!

            await services.db.channels.createMessage(id, content, currentUser)
        },
    ),
}

export default channelModel
