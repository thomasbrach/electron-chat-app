import {
    Drawer as ChakraDrawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Input,
} from '@chakra-ui/react'
import React from 'react'

import { Channel, User } from '/common/types'
import { Select } from '/components/molecules'

type Props = {
    type: 'channels' | 'users'
    title: string
    items: Channel.Local[] | User.Local[]
    isOpen: boolean
    onClose: () => void
}

export default function Drawer(props: Props) {
    const { type, title, items, isOpen, onClose } = props

    return (
        <ChakraDrawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />

                    <DrawerHeader>{title}</DrawerHeader>

                    <DrawerBody>
                        {type === 'channels' && (
                            <Input placeholder="Search channels" />
                        )}
                        <Flex direction="column" mt={6}>
                            {items.map((item: Channel.Local | User.Local) => (
                                <Select item={item} key={item.id} />
                            ))}
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </ChakraDrawer>
    )
}
