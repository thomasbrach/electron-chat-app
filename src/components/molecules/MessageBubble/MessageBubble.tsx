import { Avatar, Box, Flex, Spacer, Text } from '@chakra-ui/react'
import { formatRelative } from 'date-fns'
import React from 'react'

import { Message } from '/common/types'
import { useStoreState } from '/hooks'

type Props = { message: Message.Local }

export default function MessageBubble(props: Props) {
    const {
        sender: { username, avatar, id },
        created_at,
        content,
    } = props.message
    const currentUser = useStoreState((s) => s.user.currentUser)

    return (
        <Flex mt={4}>
            {id !== currentUser?.id && <Spacer />}
            <Box>
                <Flex align="center">
                    {id !== currentUser?.id && <Spacer />}
                    <Avatar src={avatar} size="sm" mr={2} />
                    <Text
                        maxW="2xs"
                        lineHeight="tight"
                        isTruncated
                        noOfLines={1}>
                        {username}
                    </Text>
                </Flex>
                <Box
                    maxW={['xs', 'lg']}
                    borderWidth="1px"
                    borderRadius="lg"
                    bg={id === currentUser?.id ? 'blue.50' : 'gray.50'}
                    mt={2}
                    p={2}>
                    <Text>{content}</Text>
                </Box>
                <Flex>
                    {id !== currentUser?.id && <Spacer />}
                    <Text fontSize="xs" color="gray.500">
                        {formatRelative(created_at, new Date())}
                    </Text>
                </Flex>
            </Box>
        </Flex>
    )
}
