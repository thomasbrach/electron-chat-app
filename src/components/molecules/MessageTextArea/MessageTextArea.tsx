import { Flex, Textarea, TextareaProps } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineSend } from 'react-icons/ai'

import { Button } from '/components/atoms'
import { useStoreActions } from '/hooks'

export default function MessageTextArea(props: TextareaProps) {
    const [message, setMessage] = React.useState('')
    const sendMessage = useStoreActions((a) => a.channel.sendMessage)

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setMessage(event.target.value)
    }

    async function handleKeyPress(
        event: React.KeyboardEvent<HTMLTextAreaElement>,
    ) {
        if (event.key === 'Enter') {
            event.preventDefault()
            if (message.trim() === '') {
                return
            } else {
                await sendMessage({ content: message })
            }
            setMessage('')
        }
    }

    async function handleClick() {
        if (message.trim() === '') {
            return
        } else {
            await sendMessage({ content: message })
        }
        setMessage('')
    }

    return (
        <Flex align="center" mt={4}>
            <Textarea
                onKeyPress={handleKeyPress}
                value={message}
                onChange={handleChange}
                placeholder="Your message"
                size="xs"
                px={2}
                {...props}
            />
            <Button
                onClick={handleClick}
                aria-label="Send"
                variant="solid"
                icon={<AiOutlineSend size="30px" />}
                ml="2"
            />
        </Flex>
    )
}
