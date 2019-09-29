import React from 'react'
// import ReactDOM from 'react-dom'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '../setupTests'

import { ContactUS } from './ContactUS'
import { ISubmitResult } from './Form'

const handleSubmit = jest.fn<Promise<ISubmitResult>, any[]>(async () => {
  return { success: true }
})

afterEach(cleanup)

describe('<ContactUS />', () => {
  it('should display 2 error messages when submitted empty.', () => {
    const { getByText, getAllByText } = render(<ContactUS onSubmit={handleSubmit} />)

    const submitBtn = getByText('Submit')

    fireEvent.click(submitBtn)

    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith({"email": "", "name": "", "notes": "", "reason": "Support"})
    expect(getAllByText('This must be filled in.')).toHaveLength(2)
  });
  
  it('should submit okay if filled in properly', () => {
    const { getByText, getByLabelText, queryByText, debug } = render(<ContactUS onSubmit={handleSubmit} />)

    const nameInput = getByLabelText('Your name')
    const emailInput = getByLabelText('Your email')
    const submitBtn = getByText('Submit')

    fireEvent.change(nameInput, { target: { value: 'Carl'}})
    fireEvent.change(emailInput, { target: { value: 'carl@rippon.eu'}})
    fireEvent.click(submitBtn)

    expect(queryByText('This must be filled in.')).not.toBeInTheDocument()
  });
});
