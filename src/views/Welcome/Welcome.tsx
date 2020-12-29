import { Center, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Redirect } from 'react-router-dom'

import { Button } from '/components/atoms'
import { LoginForm, RegisterForm } from '/components/organisms'
import { useStoreState } from '/hooks'
import { ROUTES } from '/router/routes'

export default function Welcome() {
    const [isLoginView, setIsLoginView] = React.useState(true)
    const currentUser = useStoreState((s) => s.user.currentUser)

    if (currentUser) return <Redirect to={ROUTES.HOME} />

    return (
        <Container maxW="md">
            <Flex direction="column" height="100vh" justify="center">
                {isLoginView ? <LoginForm /> : <RegisterForm />}

                <Center mt={4}>
                    <Flex align="center">
                        <Text mr={2} size="sm">
                            {isLoginView
                                ? "Don't have an account yet?"
                                : 'Already have an account?'}
                        </Text>
                        <Button
                            content={isLoginView ? 'Register' : 'Login'}
                            onClick={() => setIsLoginView(!isLoginView)}
                            size="sm"
                            variant="link"
                        />
                    </Flex>
                </Center>
            </Flex>
        </Container>
    )
}
