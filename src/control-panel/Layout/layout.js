import React from 'react'

import './layout.css'

const Layout = ({header, children}) => (
    <div className="layout">
      <header>
        {header}
      </header>
      <main>
        {children}
      </main>
    </div>
)


export default Layout
