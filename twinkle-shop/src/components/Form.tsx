import React, { useState, createContext } from 'react'
import produce from 'immer'

interface IValues {
  [key: string]: any

}

interface IFormProps {
  defaultValues: IValues
}

interface IFormFieldProps {
  name: string
  label: string
  type?: 'Text' | 'Email' | 'Select' | 'TextArea'
  options?: string[]
}

interface IFormContext {
  values: IValues
  setValue?: (fieldname: string, value: any) => void
}

const FormContext = createContext<IFormContext>({ values: {} })

export const FormField: React.FC<IFormFieldProps> = ({ name, label, type = 'Text', options }) => {
  return (
    <FormContext.Consumer>
      {({ values, setValue }) => {
        const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement> = ({ currentTarget: { value: targetValue } }) => {
          if (setValue) {
            setValue(name, targetValue)
          }
        }
        return <fieldset className='form-group'>
          <label htmlFor={name}>{label}</label>
          {(type === 'Text' || type === 'Email') && <input type={type.toLowerCase()} name={name} id={name} value={values[name]} onChange={handleChange} />}
          {(type === 'TextArea') && <textarea id={name} value={values[name]} onChange={handleChange} />}
          {(type === 'Select') && (
            <select name={name} id={name} value={values[name]} onChange={handleChange} >
              {options && options.map((opt, ind) => <option value={opt} key={ind} >{opt}</option>)}
            </select>
          )}
        </fieldset>
      }
      }
    </FormContext.Consumer>
  )
}

export const Form: React.FC<IFormProps> = ({ defaultValues, children }) => {
  const [values, setValues] = useState<IValues>(defaultValues)

  const setNewValues = (fieldname: string, value: any) => {
    setValues(produce(values, draft => {
      draft[fieldname] = value
    }))
  }

  const handleFormSubmit: React.ChangeEventHandler<HTMLFormElement> = evt => {
    evt.preventDefault()
  }

  const context: IFormContext = { values, setValue: setNewValues }

  return (
    <FormContext.Provider value={context}>
      <form className='form' noValidate={true} onSubmit={handleFormSubmit} >
        {children}
      </form>
    </FormContext.Provider>
  )
}
