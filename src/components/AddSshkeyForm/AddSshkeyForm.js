import React from 'react'
import { TextInputField, Textarea, FormField } from 'evergreen-ui'

const AddSshkeyForm = ({ form, setValue, errors }) => {
    return (
        <React.Fragment>
            <TextInputField
                required
                name="name"
                label="Name"
                inputWidth="100%"
                inputHeight={40}
                value={form.name}
                isInvalid={!!errors.name}
                validationMessage={errors.name}
                onChange={e => setValue('name', e.target.value)}
            />

            <FormField
                name="key"
                isRequired
                value={form.key}
                label="Public key"
                validationMessage={errors.key}
            >
                <Textarea
                    name="key"
                    value={form.key}
                    isInvalid={!!errors.key}
                    placeholder="Paste your public key"
                    onChange={e => setValue('key', e.target.value)}
                />
            </FormField>
        </React.Fragment>
    )
}

export default AddSshkeyForm
