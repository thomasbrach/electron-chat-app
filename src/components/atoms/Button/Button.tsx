import {
    Button as ChakraButton,
    ButtonProps,
    IconButton as ChakraIconButton,
    IconButtonProps,
} from '@chakra-ui/react'
import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

type Button = Partial<Pick<LinkProps, 'to'> & { content: string }> & ButtonProps

type IconButton = Partial<Pick<LinkProps, 'to'> & { content: string }> &
    IconButtonProps

function isIconButton(props: Button | IconButton): props is IconButton {
    return (props as IconButton)['aria-label'] !== undefined
}

export default function Button(props: Button | IconButton) {
    if (isIconButton(props)) {
        const { to, content, 'aria-label': ariaLabel, ...rest } = props

        return to ? (
            <Link to={to}>
                <ChakraIconButton
                    colorScheme="blue"
                    aria-label={ariaLabel}
                    {...rest}>
                    {content}
                </ChakraIconButton>
            </Link>
        ) : (
            <ChakraIconButton
                colorScheme="blue"
                aria-label={ariaLabel!}
                {...rest}>
                {content}
            </ChakraIconButton>
        )
    } else {
        const { to, content, ...rest } = props

        return to ? (
            <Link to={to}>
                <ChakraButton colorScheme="blue" {...rest}>
                    {content}
                </ChakraButton>
            </Link>
        ) : (
            <ChakraButton colorScheme="blue" {...rest}>
                {content}
            </ChakraButton>
        )
    }
}
