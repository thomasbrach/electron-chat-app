import { Container } from '@chakra-ui/react'
import React from 'react'

import { ChannelForm } from '/components/organisms'

export default function CreateChannel() {
    return (
        <Container maxW="md" mt={98}>
            <ChannelForm />
        </Container>
    )
}
