import { createTypedHooks } from 'easy-peasy'

import { StoreModel } from '/store/models'

const typedHooks = createTypedHooks<StoreModel>()

export const useStoreActions = typedHooks.useStoreActions
export const useStoreState = typedHooks.useStoreState
