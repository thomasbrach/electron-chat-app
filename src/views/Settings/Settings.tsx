import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'

import { Button } from '/components/atoms'
import { FormSlider } from '/components/molecules'

export default function Settings() {
    return (
        <Box style={{ height: 'calc(100vh - 71px)' }}>
            <Container maxW="md" p="4" h="100%">
                <Flex direction="column" h="100%" justify="center">
                    <FormSlider label="Dark theme" />
                    <FormSlider label="Enable notification" mt={2} />
                    <FormSlider label="Sound notification" mt={2} />
                    <Button
                        onClick={() => console.log('quit')}
                        content={'Quit App'}
                        colorScheme="red"
                        mt={2}
                    />
                </Flex>
            </Container>
        </Box>
    )
}
