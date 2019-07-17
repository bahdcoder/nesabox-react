import { useState } from 'react'

export const useForm = (defaultForm) => {
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState(defaultForm)
  const [submitting, setSubmitting] = useState(false)

  const setFormattedErrors = (errors = {}) => {
    const formattedErrors = {}

    Object.keys(errors).forEach((error) => {
      formattedErrors[error] = errors[error][0]
    })

    setErrors(formattedErrors)
  }

  const setValue = (key, value) => {
    setForm({
      ...form,
      [key]: value
    })
  }

  return [[form, setValue], [submitting, setSubmitting], [errors, setFormattedErrors]]
}
