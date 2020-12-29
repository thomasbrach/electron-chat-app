import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertProps,
    AlertTitle,
} from '@chakra-ui/react'
import React from 'react'

type Props = AlertProps & {
    content: string
}

export default function Warning(props: Props) {
    const { content, ...rest } = props

    return (
        <Alert status="warning" {...rest}>
            <AlertIcon />
            <AlertTitle mr={2}>Sorry!</AlertTitle>
            <AlertDescription isTruncated>{content}</AlertDescription>@
        </Alert>
    )
}
