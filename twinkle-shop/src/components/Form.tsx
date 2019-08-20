import React, { useState, createContext, useEffect } from 'react'
import produce from 'immer'
import './Form.css'

interface IErrors {
  [key: string]: string[]
}
interface IValues {
  [key: string]: any
}

interface IFormProps {
  defaultValues: IValues
  validationRules: IValidationProps
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
  errors: IErrors
  validate?: (fieldname: string, value: any) => void
}

const FormContext = createContext<IFormContext>({ values: {}, errors: {} })

export type Validator = (fieldname: string, values: IValues, args?: any) => string

export const required: Validator = (fieldName, values, args): string => {
  let validate = ''
  if (values[fieldName] === undefined || values[fieldName] === null || values[fieldName] === '') {
    validate = 'This must be filled in.'
  }
  return validate
}

export const minLength: Validator = (fieldname, values, length: number): string => {
  let validate = ''
  if (values[fieldname] && values[fieldname].length < length) {
    validate = `This must be at least ${length} character long.`
  }
  return validate
}

interface IValidation {
  validator: Validator
  arg?: any
}

interface IValidationProps {
  [key: string]: IValidation | IValidation[]
}

export const FormField: React.FC<IFormFieldProps> = ({ name, label, type = 'Text', options }) => {
  return (
    <FormContext.Consumer>
      {({ values, setValue, validate, errors }) => {
        const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement> = ({ currentTarget: { value: targetValue } }) => {
          if (setValue) {
            setValue(name, targetValue)
          }
        }

        const handleBlur: React.FocusEventHandler<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement> = ({ currentTarget: { value: targetValue } }) => {
          if (validate) {
            validate(name, targetValue)
          }
        }

        return <fieldset className='form-group'>
          <label htmlFor={name}>{label}</label>
          {(type === 'Text' || type === 'Email') && <input type={type.toLowerCase()} name={name} id={name} value={values[name]} onChange={handleChange} onBlur={handleBlur} />}
          {(type === 'TextArea') && <textarea id={name} value={values[name]} onChange={handleChange} onBlur={handleBlur} />}
          {(type === 'Select') && (
            <select name={name} id={name} value={values[name]} onChange={handleChange} onBlur={handleBlur} >
              {options && options.map((opt, ind) => <option value={opt} key={ind} >{opt}</option>)}
            </select>
          )}
          {errors[name] && errors[name].length > 0 && errors[name].map(
            error => <span key={error} className='form-error'>{error}</span>
          )}
        </fieldset>
      }
      }
    </FormContext.Consumer>
  )
}

export const Form: React.FC<IFormProps> = ({ defaultValues, validationRules, children }) => {
  const [values, setValues] = useState<IValues>(defaultValues)
  const [errors, setErrors] = useState<IErrors>({})

  useEffect(() => {
    const errors: IErrors = {}
    Object.keys(defaultValues).forEach(fieldName => {
      errors[fieldName] = []
    })
    setErrors(errors)
    // eslint-disable-next-line
  }, [])

  const setNewValues = (fieldname: string, value: any) => {
    setValues(produce(values, draft => {
      draft[fieldname] = value
    }))
  }

  const handleFormSubmit: React.ChangeEventHandler<HTMLFormElement> = evt => {
    evt.preventDefault()
  }

  const validate = (fieldName: string, value: any): string[] => {
    const rules = validationRules[fieldName]
    const newErrors: string[] = []
    if (Array.isArray(rules)) {
      rules.forEach(({ validator, arg }) => {
        const error = validator(fieldName, values, arg)
        if (error) {
          newErrors.push(error)
        }
      })
    } else if (rules) {
      const error = rules.validator(fieldName, values, rules.arg)
      if (error) {
        newErrors.push(error)
      }
    }
    setErrors(produce(errors, draft => {
      draft[fieldName] = newErrors
    }))
    return newErrors
  }

  const context: IFormContext = { values, setValue: setNewValues, errors, validate }

  return (
    <FormContext.Provider value={context}>
      <form className='form' noValidate={true} onSubmit={handleFormSubmit} >
        {children}
      </form>
    </FormContext.Provider>
  )
}
