import React from 'react'
import './Confirm.css'

interface IConfirmProps {
  title: string
  content: string
  cancelCaption?: string
  okCaption?: string
}

export const Confirm: React.FC<IConfirmProps> = ({ title, content, cancelCaption = 'cancel', okCaption = 'ok' }) => {
  return (
    <div className='confirm-wrapper confirm-visible'>
      <div className="confirm-container">
        <div className="confirm-title-container">
          <span>{title}</span>
        </div>
        <div className="confirm-content-container">
          <p>{content}</p>
        </div>
        <div className="confirm-buttons-container">
          <button className="confirm-cancel">{cancelCaption}</button>
          <button className="confirm-ok">{okCaption}</button>
        </div>
      </div>
    </div>
  )
}
