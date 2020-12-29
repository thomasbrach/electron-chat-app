import { FormControl, FormLabel, Switch, SwitchProps } from '@chakra-ui/react'
import React from 'react'

type Props = {
    label: string
} & SwitchProps

export default function FormSlider(props: Props) {
    const { label, ...rest } = props

    return (
        <FormControl display="flex" alignItems="center">
            <Switch size="lg" mr={2} {...rest} />
            <FormLabel mb="0">{label}</FormLabel>
        </FormControl>
    )
}
