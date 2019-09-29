import React, { useState, createContext, useEffect } from 'react'
import produce from 'immer'
import './Form.css'

interface IErrors {
  [key: string]: string[]
}
export interface IValues {
  [key: string]: any
}

interface IFormProps {
  defaultValues: IValues
  validationRules: IValidationProps
  onSubmit: (values: IValues) => Promise<ISubmitResult>
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

interface IValidation {
  validator: Validator
  arg?: any
}

interface IValidationProps {
  [key: string]: IValidation | IValidation[]
}

export interface ISubmitResult {
  success: boolean
  errors?: IErrors
}

export type Validator = (fieldname: string, values: IValues, args?: any) => string

const FormContext = createContext<IFormContext>({ values: {}, errors: {} })


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

export const Form: React.FC<IFormProps> = ({ defaultValues, validationRules, onSubmit, children }) => {
  const [values, setValues] = useState<IValues>(defaultValues)
  const [errors, setErrors] = useState<IErrors>({})
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

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

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async evt => {
    evt.preventDefault()
    if (validateForm()) {
      setSubmitting(true)
      const result = await onSubmit(values)
      setErrors(result.errors || {})
      setSubmitted(result.success)
      setSubmitting(false)
    }
  }

  const context: IFormContext = { values, setValue: setNewValues, errors, validate }

  const validateForm = (): boolean => {
    const errors: IErrors = {}
    let haveErrors = false
    Object.keys(defaultValues).map(fieldname => {
      errors[fieldname] = validate(fieldname, values[fieldname])
      haveErrors = errors[fieldname].length > 0
      return fieldname
    })
    setErrors(errors)
    return !haveErrors
  }

  return (
    <FormContext.Provider value={context}>
      <form className='form' data-testid='form' noValidate={true} onSubmit={handleFormSubmit} >
        {children}
        <div className="form-group">
          <button type="submit" disabled={submitting || submitted}>Submit</button>
        </div>
      </form>
    </FormContext.Provider>
  )
}
