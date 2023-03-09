import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import '../css/sidebarRow.css'

function SidebarRow ({src, title}) {
  return (
    <div className='sidebarRow'>
        {src && <Avatar src={src}/>}
      <p>{title}</p>
    </div>
  )
}

export default SidebarRow;

