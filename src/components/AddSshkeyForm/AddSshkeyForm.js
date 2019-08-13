import React from 'react'
import {
    TextInputField,
    Textarea,
    FormField,
    Pane,
    Button,
    SideSheet
} from 'evergreen-ui'

const AddSshkeyForm = ({
    form,
    setValue,
    errors,
    creatingKey,
    setCreatingKey,
    handleFormSubmit,
    submitting
}) => {
    return (
        <SideSheet
            isShown={creatingKey}
            onCloseComplete={() => setCreatingKey(false)}
        >
            <Pane width={'100%'} padding={40}>
                <React.Fragment>
                    <form onSubmit={handleFormSubmit}>
                        <TextInputField
                            required
                            name="name"
                            label="Name"
                            inputWidth="100%"
                            inputHeight={40}
                            value={form.name}
                            placeholder={'Macbook'}
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

                        <Button
                            type="submit"
                            marginTop={32}
                            intent="success"
                            appearance="primary"
                            isLoading={submitting}
                        >
                            Add key
                        </Button>
                    </form>
                </React.Fragment>
            </Pane>
        </SideSheet>
    )
}

export default AddSshkeyForm
