import { DragHandleIcon, PlusSquareIcon } from '@chakra-ui/icons'
import {
    Box,
    ButtonGroup,
    Container,
    Divider,
    Flex,
    Heading,
    Spacer,
    useDisclosure,
    useMediaQuery,
    Wrap,
    WrapItem,
} from '@chakra-ui/react'
import React from 'react'

import { Button } from '/components/atoms'
import { ChannelCard } from '/components/molecules'
import { Drawer } from '/components/organisms'
import { useStoreActions, useStoreState } from '/hooks'
import { ROUTES } from '/router/routes'
import { notificationPermission } from '/services/app'

export default function Home() {
    const [isTabletOrDesktop] = useMediaQuery('(min-width: 600px)')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const joinedChannels = useStoreState((s) => s.channel.joinedChannels)
    const joinableChannels = useStoreState((s) => s.channel.joinableChannels)
    const getChannels = useStoreActions((a) => a.channel.getChannels)

    React.useEffect(() => {
        notificationPermission()
        getChannels()
    }, [getChannels])

    return (
        <>
            <Box style={{ height: 'calc(100vh - 71px)' }}>
                <Container maxW="5xl" p="4" h="100%">
                    <Flex h="100%" direction="column">
                        {/* Header */}
                        <Flex>
                            <Heading as="h1" size="xl">
                                Choose your channel
                            </Heading>
                            <Spacer />
                            <ButtonGroup
                                variant={isTabletOrDesktop ? 'solid' : 'ghost'}
                                fontSize={isTabletOrDesktop ? 'sm' : undefined}
                                spacing={2}
                                isAttached={!isTabletOrDesktop}>
                                {isTabletOrDesktop ? (
                                    <>
                                        <Button
                                            onClick={onOpen}
                                            content="My Channels"
                                            rightIcon={<DragHandleIcon />}
                                        />

                                        <Button
                                            to={ROUTES.CREATE_CHANNEL}
                                            content="Create new"
                                            rightIcon={<PlusSquareIcon />}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            onClick={onOpen}
                                            aria-label="Drag handle"
                                            icon={<DragHandleIcon />}
                                        />
                                        <Button
                                            to={ROUTES.CREATE_CHANNEL}
                                            aria-label="Plus square"
                                            icon={<PlusSquareIcon />}
                                        />
                                    </>
                                )}
                            </ButtonGroup>
                        </Flex>

                        <Divider mt={4} />

                        {/* Main */}
                        <Box grow={1} overflowY="scroll" p={4} mt={4}>
                            <Wrap
                                justify={
                                    isTabletOrDesktop ? 'between' : 'center'
                                }>
                                {joinableChannels.map((channel) => {
                                    return (
                                        <WrapItem key={channel.id}>
                                            <ChannelCard channel={channel} />
                                        </WrapItem>
                                    )
                                })}
                            </Wrap>
                        </Box>
                    </Flex>
                </Container>
            </Box>

            {/* Sidebar */}
            <Drawer
                type="channels"
                title="Your channels"
                isOpen={isOpen}
                onClose={onClose}
                items={joinedChannels}
            />
        </>
    )
}
