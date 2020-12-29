import {
    Box,
    Divider,
    Flex,
    Heading,
    Spacer,
    Text,
    useToast,
} from '@chakra-ui/react'
import React from 'react'

import { Channel } from '/common/types'
import { Button } from '/components/atoms'
import { useStoreActions } from '/hooks'

type Props = { channel: Channel.Local }

export default function Card(props: Props) {
    const {
        id,
        name,
        description,
        admin: { username },
    } = props.channel
    const toast = useToast()
    const joinChannel = useStoreActions((a) => a.channel.joinChannel)

    async function handleClick() {
        const userHasConfirmed = window.confirm(
            `Are you sure you want to join the ${name} channel?`,
        )

        if (userHasConfirmed) {
            try {
                if (id === 'fake') throw Error('Unable to access this channel')
                await joinChannel(props.channel)
            } catch (error) {
                toast({
                    title: 'An error occurred',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        }
    }

    return (
        <Box
            w={['xs', 280]}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            pt={6}
            pb={2}>
            <Heading
                as="h2"
                size="md"
                mt={1}
                fontWeight="semibold"
                isTruncated
                noOfLines={1}>
                {name}
            </Heading>
            <Text
                size="md"
                fontWeight="light"
                isTruncated
                noOfLines={5}
                h={100}
                mt={2}>
                {description}
            </Text>
            <Divider mt={2} />
            <Text size="sm">Created by {username}</Text>
            <Flex>
                <Spacer />
                <Button onClick={handleClick} content="Join" mt={2} />
            </Flex>
        </Box>
    )
}
