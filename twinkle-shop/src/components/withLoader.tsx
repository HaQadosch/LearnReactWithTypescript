import React from 'react'
import './withLoader.css'

interface ILoader {
  isLoading: boolean
}

export const withLoader = <P extends {}>(Component: React.FC<P>): React.FC<P & ILoader> =>
  ({ isLoading, ...props }: ILoader) =>
    isLoading
      ? (
        <div className="loader-overlay">
          <div className="loader-circle-wrap">
            <div className="loader-circle"></div>
          </div>
        </div>
      )
      : <Component {...props as P} />
