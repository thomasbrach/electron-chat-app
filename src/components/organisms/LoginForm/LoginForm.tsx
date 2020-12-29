import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import { Button } from '/components/atoms'
import { FormTextInput, Warning } from '/components/molecules'
import { useMountedRef, useStoreActions } from '/hooks'

type Fields = {
    email: string
    password: string
    errorMessage: string
}

const initialValues: Fields = {
    email: '',
    password: '',
    errorMessage: '',
}

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
})

export default function LoginForm() {
    const isMounted = useMountedRef()
    const login = useStoreActions((a) => a.auth.login)

    async function handleSubmit(
        values: Fields,
        helpers: FormikHelpers<Fields>,
    ) {
        const { email, password } = values
        const { setSubmitting, setErrors } = helpers

        try {
            await login({ email, password })
        } catch (error) {
            setErrors({ errorMessage: error.message })
        } finally {
            if (isMounted.current) setSubmitting(false)
        }
    }

    return (
        <>
            <Heading as="h1" mb={2}>
                Welcome back!
            </Heading>

            <Text size="md" mb={6}>
                Login and chat with other people
            </Text>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ dirty, isValid, isSubmitting, errors }) => (
                    <Form>
                        <FormTextInput
                            label="Email"
                            name="email"
                            placeholder="johndoe@gmail.com"
                            icon={EmailIcon}
                        />
                        <FormTextInput
                            label="Password"
                            name="password"
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
                                content="Login"
                                type="submit"
                            />
                        </Flex>
                    </Form>
                )}
            </Formik>
        </>
    )
}
