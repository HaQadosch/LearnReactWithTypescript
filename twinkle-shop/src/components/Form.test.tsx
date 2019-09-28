import { required, Form, IValues } from './Form'


describe('required', () => {
  it('should return "This must be filled in." when empty', () => {
    const values: IValues = {
      title: ''
    }
    const result = required('title', values) 
    expect(result).toBe('This must be filled in.')
  })
});