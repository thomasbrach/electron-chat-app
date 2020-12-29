import { Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import { Button } from '/components/atoms'
import { FormTextArea, FormTextInput, Warning } from '/components/molecules'
import { useMountedRef, useStoreActions } from '/hooks'
import { ROUTES } from '/router/routes'

type Fields = {
    name: string
    description: string
    avatar: string
    errorMessage: string
}

const initialValues: Fields = {
    name: '',
    description: '',
    avatar: '',
    errorMessage: '',
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    avatar: Yup.string().required(),
})

export default function LoginForm() {
    const history = useHistory()
    const isMounted = useMountedRef()
    const createChannel = useStoreActions((a) => a.channel.createChannel)

    async function handleSubmit(
        values: Fields,
        helpers: FormikHelpers<Fields>,
    ) {
        const { name, description, avatar } = values
        const { setSubmitting, setErrors } = helpers

        try {
            await createChannel({ name, description, avatar })
            history.push(ROUTES.HOME)
        } catch (error) {
            setErrors({ errorMessage: error.message })
        } finally {
            if (isMounted.current) setSubmitting(false)
        }
    }

    return (
        <>
            <Heading as="h1" mb="2">
                Create your own channel!
            </Heading>

            <Text size="md" mb="6">
                You will be automatically assigned as the admin of this channel
            </Text>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ dirty, isValid, isSubmitting, errors }) => (
                    <Form>
                        <FormTextInput
                            label="Name"
                            name="name"
                            placeholder="I love JS"
                        />
                        <FormTextArea
                            label="Description"
                            name="description"
                            placeholder="Some description"
                        />
                        <FormTextInput
                            label="Avatar"
                            name="avatar"
                            placeholder="https://banner2.cleanpng.com/20180627/qvc/kisspng-the-legend-of-zelda-majora-s-mask-discord-compute-discord-icon-5b3371b7b55eb4.6840271215300981037429.jpg"
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
