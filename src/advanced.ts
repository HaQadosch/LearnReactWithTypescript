type Control = 'TextBox' | 'DropDown' | 'DatePicker' | 'NumberSlider' | 'CheckBox'

let notes: Control = 'DropDown'

interface ITextBox {
  control: 'TextBox'
  value: string
  multiline: boolean
}

interface IDatePicker {
  control: 'DatePicker'
  value: Date
}

interface INumberSlider {
  control: 'NumberSlider'
  value: number
}

interface ICheckBox {
  control: 'CheckBox'
  value: boolean
}

type Field = ITextBox | IDatePicker | INumberSlider | ICheckBox

function initialiseValue (field: Field): Field {
  switch (field.control) {
    case 'TextBox':
      field.value = ''
      break
    case 'DatePicker':
      field.value = new Date()
      break
    case 'NumberSlider':
      field.value = 0
      break
    case 'CheckBox':
      field.value = false
      break
    default:
      const nope: never = field
  }
  return field
}


