import { DragHandleIcon } from '@chakra-ui/icons'
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
} from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '/components/atoms'
import { MessageBubble, MessageTextArea } from '/components/molecules'
import { Drawer } from '/components/organisms'
import { useStoreActions, useStoreState } from '/hooks'
import { LoadingView } from '/views'

export default function Channel() {
    const lastMessageRef = React.useRef<HTMLDivElement>(null)

    const [isTabletOrDesktop] = useMediaQuery('(min-width: 600px)')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { id } = useParams<{ id: string }>()

    const currentChannel = useStoreState((s) => s.channel.currentChannel)
    const currentMessages = useStoreState((s) => s.channel.currentMessages)
    const currentUsers = useStoreState((s) => s.user.currentUsers)
    const getCurrentChannel = useStoreActions(
        (a) => a.channel.getCurrentChannel,
    )
    const onChannelStateChange = useStoreActions(
        (a) => a.channel.onChannelStateChange,
    )

    React.useEffect(() => {
        getCurrentChannel({ id })
        const unsubscribeChannelStateChange = onChannelStateChange({ id })

        return () => {
            unsubscribeChannelStateChange()
        }
    }, [id, getCurrentChannel, onChannelStateChange])

    React.useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView()
        }
    }, [])

    if (!currentChannel || !currentUsers || !currentMessages)
        return <LoadingView content="Loading channel..." />

    return (
        <>
            <Box style={{ height: 'calc(100vh - 71px)' }}>
                <Container maxW="5xl" p="4" h="100%">
                    <Flex h="100%" direction="column">
                        {/* Header */}
                        <Flex>
                            <Heading as="h1" size="xl">
                                {currentChannel?.name}
                            </Heading>
                            <Spacer />
                            <ButtonGroup
                                variant={isTabletOrDesktop ? 'solid' : 'ghost'}
                                fontSize={isTabletOrDesktop ? 'sm' : undefined}
                                spacing={2}
                                isAttached={!isTabletOrDesktop}>
                                {isTabletOrDesktop ? (
                                    <Button
                                        onClick={onOpen}
                                        content="Members"
                                        rightIcon={<DragHandleIcon />}
                                    />
                                ) : (
                                    <Button
                                        onClick={onOpen}
                                        aria-label="Drag handle"
                                        icon={<DragHandleIcon />}
                                    />
                                )}
                            </ButtonGroup>
                        </Flex>

                        <Divider mt={4} />

                        {/* Main */}
                        <Box grow={1} overflowY="scroll" p={4} mt={4}>
                            {currentMessages.map((message, index) => (
                                <Box
                                    key={message.id}
                                    ref={
                                        index + 1 === currentMessages.length
                                            ? lastMessageRef
                                            : undefined
                                    }>
                                    <MessageBubble message={message} />
                                </Box>
                            ))}
                        </Box>

                        {/* Type Area */}
                        <MessageTextArea />
                    </Flex>
                </Container>
            </Box>

            {/* Sidebar */}
            <Drawer
                type="channels"
                title="Channel members"
                isOpen={isOpen}
                onClose={onClose}
                items={currentUsers}
            />
        </>
    )
}
