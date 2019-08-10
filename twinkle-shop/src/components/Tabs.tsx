import React, { useState, createContext } from 'react'
import './Tabs.css'

interface ITabsContext {
  activeName?: string
  handleTabClick?: (name: string) => void
}

const TabsContext = createContext<ITabsContext>({})

interface ITab {
  name: string
  initialActive?: boolean
}

export const Tab: React.FC<ITab> = ({ name = '', initialActive = false, children }) => (
  <TabsContext.Consumer>
    {({ activeName: contextActiveName, handleTabClick: contextHandleTabClick }: ITabsContext) => {
      const activeName = contextActiveName || (initialActive ? name : '')
      const handleTabClick = (evt: React.MouseEvent<HTMLLIElement>) => {
        if (contextHandleTabClick) {
          contextHandleTabClick(name)
        }
      }
      return (
        <li className={name === activeName ? 'active' : ''} onClick={handleTabClick}>
          {children}
        </li>
      )
    }}
  </TabsContext.Consumer>
)

interface ITabs {
  activeName?: string
  headings: string[]
}

export const Tabs: React.FC<ITabs> = ({ activeName: name = '', headings, children }) => {
  const [activeName, setActiveName] = useState<string>(name)

  const handleTabClick = setActiveName

  return (
    <TabsContext.Provider
      value={{
        activeName,
        handleTabClick
      }}
    >
      <ul className='tabs'>
        {children}
      </ul>
    </TabsContext.Provider>
  )
}
