import React from 'react'
import FilterSection from '../Components/FilterSection'

const Layout = ({children}) => {
  return (
    <div className="p-4 lg:px-6">
        <FilterSection/>
        {children}
    </div>
  )
}

export default Layout