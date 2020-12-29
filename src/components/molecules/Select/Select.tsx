import { Avatar, AvatarBadge, Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

import { Channel, User } from '/common/types'
import { ROUTES_PREFIX } from '/router/routes'

type Props = {
    item: User.Local | Channel.Local
}

function isUserSelect(props: User.Local | Channel.Local): props is User.Local {
    return (props as User.Local).username !== undefined
}

export default function Select(props: Props) {
    if (isUserSelect(props.item)) {
        const { avatar, state = 'offline', username } = props.item

        return (
            <Flex align="center" mb={2}>
                <Avatar src={avatar} mr={2}>
                    <AvatarBadge
                        boxSize="1.25em"
                        bg={state === 'online' ? 'green.500' : 'tomato'}
                    />
                </Avatar>
                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated>
                    {username}
                </Box>
            </Flex>
        )
    } else {
        const { id, avatar, name } = props.item

        return (
            <Link to={`${ROUTES_PREFIX.CHANNEL}/${id}`}>
                <Flex align="center" mb={2}>
                    <Avatar src={avatar} mr={2} />
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated>
                        {name}
                    </Box>
                </Flex>
            </Link>
        )
    }
}
