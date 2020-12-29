import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { Flex, Heading, Icon, Spacer, Text } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { HiOutlinePhotograph } from 'react-icons/hi'
import * as Yup from 'yup'

import { Button } from '/components/atoms'
import { FormTextInput, Warning } from '/components/molecules'
import { useMountedRef, useStoreActions } from '/hooks'

type Fields = {
    email: string
    username: string
    avatar: string
    password: string
    errorMessage: string
}

const initialValues: Fields = {
    email: '',
    username: '',
    avatar: '',
    password: '',
    errorMessage: '',
}

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    username: Yup.string().required(),
    avatar: Yup.string().required(),
    password: Yup.string().required(),
})

export default function RegisterForm() {
    const isMounted = useMountedRef()
    const register = useStoreActions((a) => a.auth.register)

    async function handleSubmit(
        values: Fields,
        helpers: FormikHelpers<Fields>,
    ) {
        const { email, username, password, avatar } = values
        const { setSubmitting, setErrors } = helpers

        try {
            await register({ email, username, password, avatar })
        } catch (error) {
            setErrors({ errorMessage: error.message })
        } finally {
            if (isMounted.current) setSubmitting(false)
        }
    }

    return (
        <>
            <Heading as="h1" mb="2">
                Create an account
            </Heading>

            <Text size="md" mb="6">
                Signing up will only takes a few minutes
            </Text>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ dirty, isValid, isSubmitting, errors }) => (
                    <Form>
                        <FormTextInput
                            name="email"
                            label="Email"
                            placeholder="johndoe@gmail.com"
                            icon={EmailIcon}
                        />
                        <FormTextInput
                            name="username"
                            label="Username"
                            placeholder="John Doe"
                            icon={Icon}
                            asIcon={AiOutlineUser}
                        />
                        <FormTextInput
                            name="avatar"
                            label="Avatar"
                            placeholder="https://banner2.cleanpng.com/20180627/qvc/kisspng-the-legend-of-zelda-majora-s-mask-discord-compute-discord-icon-5b3371b7b55eb4.6840271215300981037429.jpg"
                            icon={Icon}
                            asIcon={HiOutlinePhotograph}
                        />
                        <FormTextInput
                            name="password"
                            label="Password"
                            placeholder="password"
                            icon={LockIcon}
                            type="password"
                        />
                        {errors.errorMessage && (
                            <Warning content={errors.errorMessage} mb={4} />
                        )}
                        <Flex>
                            <Spacer />
                            <Button
                                isDisabled={!isValid || !dirty}
                                isLoading={isSubmitting}
                                content="Create"
                                type="submit"
                            />
                        </Flex>
                    </Form>
                )}
            </Formik>
        </>
    )
}
