import appModel, { AppModel } from './app'
import authModel, { AuthModel } from './auth'
import channelModel, { ChannelModel } from './channel'
import userModel, { UserModel } from './user'

export interface StoreModel {
    app: AppModel
    auth: AuthModel
    channel: ChannelModel
    user: UserModel
}

const storeModel: StoreModel = {
    app: appModel,
    auth: authModel,
    channel: channelModel,
    user: userModel,
}

export default storeModel
