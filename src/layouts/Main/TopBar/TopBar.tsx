import { ArrowBackIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Box,
    Container,
    Flex,
    Heading,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text,
    useMediaQuery,
    useToast,
} from '@chakra-ui/react'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Button } from '/components/atoms'
import { useStoreActions, useStoreState } from '/hooks'
import { ROUTES } from '/router/routes'

export default function TopBar() {
    const [isTabletOrDesktop] = useMediaQuery('(min-width: 415px)')
    const history = useHistory()
    const toast = useToast()

    const currentUser = useStoreState((s) => s.user.currentUser)

    const logout = useStoreActions((a) => a.auth.logout)

    async function handleGoBack() {
        history.goBack()
    }

    async function handleLogout() {
        try {
            await logout()
        } catch (error) {
            toast({
                title: 'Oops, an error occurred.',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <Box borderBottom="1px solid rgba(230,230,230,.8)">
            <Container maxW="5xl" p="4">
                <Flex align="center">
                    {/* Back Button */}
                    {isTabletOrDesktop &&
                        history.location.pathname !== ROUTES.HOME && (
                            <Button
                                onClick={handleGoBack}
                                aria-label="Left arrow"
                                variant="outline"
                                icon={<ArrowBackIcon />}
                                mr="2"
                            />
                        )}

                    {/* User Badge */}
                    <Avatar
                        name={currentUser?.username}
                        src={currentUser?.avatar}
                        mr="2"
                    />
                    <Heading size="md" isTruncated>
                        Hi {currentUser?.username}
                    </Heading>

                    <Spacer />

                    {/* Menu actions */}
                    {isTabletOrDesktop ? (
                        <>
                            <Button
                                to={ROUTES.SETTINGS}
                                variant="outline"
                                content="Settings"
                                mr="2"
                            />
                            <Button
                                onClick={handleLogout}
                                variant="link"
                                content="Logout"
                                opacity={0.3}
                            />
                        </>
                    ) : (
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label="hamburger menu"
                                variant="outline"
                                colorScheme="blue"
                                icon={<HamburgerIcon />}
                            />
                            <MenuList>
                                <MenuItem>
                                    <Link to={ROUTES.SETTINGS}>
                                        <Text>Settings</Text>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <Text>Logout</Text>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                </Flex>
            </Container>
        </Box>
    )
}
