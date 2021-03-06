import { CheckIcon } from '@chakra-ui/icons'
import {
    ComponentWithAs,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconProps,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from '@chakra-ui/react'
import { useField } from 'formik'
import React from 'react'
import { IconType } from 'react-icons'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string
    label: string
    icon?: ComponentWithAs<'svg', IconProps>
    placeholder: string
    asIcon?: IconType
}

export default function FormTextInput(props: Props) {
    const {
        type,
        label,
        icon: Icon,
        placeholder,
        asIcon: AsIcon,
        ...rest
    } = props
    const [field, meta] = useField(rest)

    return (
        <FormControl isInvalid={meta.touched && !!meta.error} isRequired mb={4}>
            <FormLabel fontSize="sm">{label}</FormLabel>
            <InputGroup>
                {Icon && (
                    <InputLeftElement pointerEvents="none">
                        <Icon
                            color="gray.300"
                            as={AsIcon ? AsIcon : undefined}
                        />
                    </InputLeftElement>
                )}
                <Input
                    type={type}
                    {...field}
                    placeholder={placeholder}
                    fontSize="sm"
                />
                {meta.touched && !meta.error ? (
                    <InputRightElement>
                        <CheckIcon color="green.500" />
                    </InputRightElement>
                ) : null}
            </InputGroup>
            {meta.touched && !!meta.error ? (
                <FormErrorMessage fontSize="xs">{meta.error}</FormErrorMessage>
            ) : null}
        </FormControl>
    )
}
