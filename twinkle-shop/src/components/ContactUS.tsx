import React from 'react'
import './ContactUS.css'
import { Form, FormField, required, minLength, ISubmitResult, IValues } from './Form';
import { wait } from '../ProductData'
interface IContactUsProps {
  onSubmit: (values: IValues) => Promise<ISubmitResult>
}

export const ContactUS: React.FC<IContactUsProps> = ({ onSubmit }) => {
  const handleSubmit = async (values: IValues): Promise<ISubmitResult> => {
    const result = await onSubmit(values)
    return result
  }

  return (
    <Form data-testid='contact-us'
      defaultValues={{ name: '', email: '', reason: 'Support', notes: '' }}
      validationRules={{
        email: { validator: required },
        name: [{ validator: required }, { validator: minLength, arg: 2 }]
      }}
      onSubmit={handleSubmit}
    >
      <FormField name='name' label='Your name' />
      <FormField name='email' label='Your email' type='Email' />
      <FormField name='reason' label='Reason you need to contact us' type='Select' options={['Marketing', 'Support', 'Feedback', 'Jobs', 'Offer']} />
      <FormField name='notes' label='Additional Notes' type='TextArea' />
    </Form>
  )
}

export const ContactUSPage: React.FC = () => {
  const handleSubmit = async (values: IValues): Promise<ISubmitResult> => {
    await wait(1000)
    return {
      errors: {
        email: ['Something is wrong with this.']
      },
      success: false
    }
  }

  return (
    <section className='page-container'>
      <h2>Contact US</h2>
      <p>If you enter your details, we'll get back to you as soon as possible.</p>
      <ContactUS onSubmit={handleSubmit} />
    </section>
  )
}
