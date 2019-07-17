import React from 'react'
import client from 'utils/axios'
import { withAuth } from 'utils/hoc'
import { useForm } from 'utils/hooks'
import LoginForm from 'components/LoginForm'

const Login = ({ auth }) => {
  const [user, setUser] = auth
  const [[form, setValue], [submitting, setSubmitting], [errors, setErrors]] =  useForm({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    setSubmitting(true)

    console.log(user)
    client.post('/login', form).then(({ data }) => {
      setSubmitting(false)
      setUser(data)
    }).catch(({ response }) => {
      setSubmitting(false)
      setErrors(response.data.errors)
    })
  }

  return (
    <LoginForm form={form} setValue={setValue} submitting={submitting} handleSubmit={handleSubmit} errors={errors} />
  )
} 

export default withAuth(Login)
