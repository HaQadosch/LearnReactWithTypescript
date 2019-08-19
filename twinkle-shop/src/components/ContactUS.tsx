import React, { useState } from 'react'
import './ContactUS.css'
interface IContactUS {
  name: string
  onNameChange: React.Dispatch<React.SetStateAction<string>>
  email: string
  onEmailChange: React.Dispatch<React.SetStateAction<string>>
  reason: string
  onReasonChange: React.Dispatch<React.SetStateAction<string>>
  notes: string
  onNotesChange: React.Dispatch<React.SetStateAction<string>>
}

export const ContactUS: React.FC<IContactUS> = ({ name, onNameChange, email, onEmailChange, reason, onReasonChange, notes, onNotesChange }) => {
  const handleFormSubmit: React.ChangeEventHandler<HTMLFormElement> = evt => {
    evt.preventDefault()
  }

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = ({ currentTarget: { value } }) => {
    onNameChange(value)
  }
  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    onEmailChange(value as unknown as string)
  }
  const handleReasonChange: React.ChangeEventHandler<HTMLSelectElement> = ({ target: { value } }) => {
    onReasonChange(value as unknown as string)
  }
  const handleNotesChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({ target: { value } }) => {
    onNotesChange(value as unknown as string)
  }

  return <form className='form' noValidate={true} onSubmit={handleFormSubmit} >
    <fieldset className='form-group'>
      <label htmlFor="name">Your  name</label>
      <input type="text" name="name" id='name' value={name} onChange={handleNameChange} />
    </fieldset>
    <fieldset className='form-group'>
      <label htmlFor="email">Your  email</label>
      <input type="email" name="email" id='email' value={email} onChange={handleEmailChange} />
    </fieldset>
    <fieldset className='form-group'>
      <label htmlFor="reason">Reason you need to contact us</label>
      <select name="reason" id="reason" value={reason} onChange={handleReasonChange} >
        <option value="Marketing">Marketing</option>
        <option value="Support">Support</option>
        <option value="Feedback">Feedback</option>
        <option value="Jobs">Jobs</option>
        <option value="Other">Other</option>
      </select>
    </fieldset>
    <fieldset className='form-group'>
      <label htmlFor="notes">Additional Notes</label>
      <textarea name="notes" id='notes' value={notes} onChange={handleNotesChange} />
    </fieldset>
  </form>
}

interface IContactUSPage {
  name: string
  email: string
  reason: string
  notes: string
}

export const ContactUSPage: React.FC<IContactUSPage> = ({ name: iName = '', email: iEmail = '', reason: iReason = '', notes: iNotes = '' }) => {
  const [name, setName] = useState(iName)
  const [email, setEmail] = useState(iEmail)
  const [reason, setReason] = useState(iReason)
  const [notes, setNotes] = useState(iNotes)

  return (
    <section className='page-container'>
      <h2>Contact US</h2>
      <p>If you enter your details, we'll get back to you as soon as possible.</p>
      <ContactUS name={name} onNameChange={setName} email={email} onEmailChange={setEmail} reason={reason} onReasonChange={setReason} notes={notes} onNotesChange={setNotes} />
    </section>
  )
}
