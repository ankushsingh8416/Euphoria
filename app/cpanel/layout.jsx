import React from 'react'
import CpanelSidebar from '../Components/CpanelSidebar'
import CpanelNavbar from '../Components/CpanelNavbar'

const layout = ({ children }) => {
  return (
    <div>
      <CpanelNavbar />
      <div className="flex">
        <CpanelSidebar />

        <div className='admin'>
          {children}
        </div> 
        </div>

    </div>
  )
}

export default layout
