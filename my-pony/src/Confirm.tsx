import React from 'react'
import './Confirm.css'

interface IConfirmProps {
  open: boolean
  title: string
  content: string
  onOKClick: () => void
  onCancelClick: () => void
  cancelCaption?: string
  okCaption?: string
}

export const Confirm: React.FC<IConfirmProps> = ({ title, content, cancelCaption = 'cancel', okCaption = 'ok', onCancelClick, onOKClick, open }) => {
  console.log('<Confirm />')
  const handleOKClick = () => {
    onOKClick()
  }

  const handleCancelClick = () => {
    onCancelClick()
  }

  return (
    <div className={open ? 'confirm-wrapper confirm-visible' : 'confirm-wrapper'}>
      <div className="confirm-container">
        <div className="confirm-title-container">
          <span>{title}</span>
        </div>
        <div className="confirm-content-container">
          <p>{content}</p>
        </div>
        <div className="confirm-buttons-container">
          <button className="confirm-cancel" onClick={handleCancelClick} >{cancelCaption}</button>
          <button className="confirm-ok" onClick={handleOKClick} >{okCaption}</button>
        </div>
      </div>
    </div>
  )
}
