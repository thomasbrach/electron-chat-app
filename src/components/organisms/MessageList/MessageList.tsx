import { Box } from '@chakra-ui/react'
import React from 'react'

import { Message } from '/common/types'
import { MessageBubble } from '/components/molecules'

type Props = {
    messages: Message.Local[]
}

export default function MessageList(props: Props) {
    const { messages } = props
    const lastMessageRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView()
        }
    }, [])

    return (
        <Box grow={1} overflowY="scroll" p={4} mt={4}>
            {messages.map((message, index) => (
                <Box
                    key={message.id}
                    ref={
                        index + 1 === messages.length
                            ? lastMessageRef
                            : undefined
                    }>
                    <MessageBubble message={message} />
                </Box>
            ))}
        </Box>
    )
}
