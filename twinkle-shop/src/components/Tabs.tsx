import React, { useState, createContext } from 'react'
import './Tabs.css'

interface ITabsContext {
  activeName?: string
  handleTabClick?: (name: string, content: React.ReactNode) => void
}

const TabsContext = createContext<ITabsContext>({})

interface ITab {
  name: string
  initialActive?: boolean
  heading: () => string | JSX.Element
}

export const Tab: React.FC<ITab> = ({ name = '', initialActive = false, heading, children }) => (
  <TabsContext.Consumer>
    {({ activeName: tabsActiveName, handleTabClick: tabsHandleTabClick }: ITabsContext) => {
      const activeName = tabsActiveName || (initialActive ? name : '')
      if (!tabsActiveName && initialActive) {
        if (tabsHandleTabClick) {
          tabsHandleTabClick(activeName, children)
          return null // Avoids a render, as tabsHandleTabClik triggered a render already.
        }
      }
      const handleTabClick = (evt: React.MouseEvent<HTMLLIElement>) => {
        if (tabsHandleTabClick) {
          tabsHandleTabClick(name, children)
        }
      }
      return (
        <li className={name === activeName ? 'active' : ''} onClick={handleTabClick}>
          {heading()}
        </li>
      )
    }}
  </TabsContext.Consumer>
)

interface ITabs {
  activeName?: string
  activeContent?: React.ReactNode
}

export const Tabs: React.FC<ITabs> = ({ activeName: name = '', activeContent: content = <p>empty</p>, children }) => {
  const [activeName, setActiveName] = useState<string>(name)
  const [activeContent, setActiveContent] = useState<React.ReactNode>(content)

  const handleTabClick = (name: string, content: React.ReactNode) => {
    setActiveName(name)
    setActiveContent(content)
  }

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
      <section>{activeContent}</section>
    </TabsContext.Provider>
  )
}
