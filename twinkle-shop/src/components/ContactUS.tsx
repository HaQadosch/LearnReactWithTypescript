import React from 'react'
import './ContactUS.css'
import { Form, FormField } from './Form';

export const ContactUS: React.FC = () => {
  return (
    <Form defaultValues={{ name: '', email: '', reason: 'Support', notes: '' }}>
      <FormField name='name' label='Your name' />
      <FormField name='email' label='Your email' type='Email' />
      <FormField name='reason' label='Reason you need to contact us' type='Select' options={['Marketing', 'Support', 'Feedback', 'Jobs', 'Offer']} />
      <FormField name='notes' label='Additional Notes' type='TextArea' />
    </Form>
  )
}

export const ContactUSPage: React.FC = () => {
  return (
    <section className='page-container'>
      <h2>Contact US</h2>
      <p>If you enter your details, we'll get back to you as soon as possible.</p>
      <ContactUS />
    </section>
  )
}
