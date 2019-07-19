import { useState, useEffect } from 'react'

/**
 * Helpers for easily setting up forms
 *
 * @param {object} defaultForm
 */
export const useForm = defaultForm => {
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState(defaultForm)
    const [submitting, setSubmitting] = useState(false)

    const setFormattedErrors = (errors = {}) => {
        const formattedErrors = {}

        Object.keys(errors).forEach(error => {
            formattedErrors[error] = errors[error][0]
        })

        setErrors(formattedErrors)
    }

    const resetForm = () => {
        setForm(defaultForm)
    }

    const setValue = (key, value) => {
        setForm({
            ...form,
            [key]: value
        })
    }

    return [
        [form, setValue, resetForm, setForm],
        [submitting, setSubmitting],
        [errors, setFormattedErrors]
    ]
}

/**
 * Set the background color of the page body
 *
 * @param {string} backgroundColor
 */
export const useBodyBackground = backgroundColor => {
    useEffect(() => {
        document.body.style.backgroundColor = backgroundColor

        return () => {
            document.body.style.backgroundColor = null
        }
    }, [backgroundColor])
}
