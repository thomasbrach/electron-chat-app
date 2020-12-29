import { Flex, Spinner, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
    content: string
}

export default function Loading(props: Props) {
    const { content } = props

    return (
        <Flex height="100vh" align="center" justify="center" direction="column">
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
            <Text>{content}</Text>
        </Flex>
    )
}
