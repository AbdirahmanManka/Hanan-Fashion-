import { Typography } from 'antd'
import React from 'react'

function AppFooter() {
  return (
    <div className='AppFooter'>
        
       <Typography.Link href='https://www.google.com' target={'_blank'}>Privacy Policy</Typography.Link>
       <Typography.Link href='https://www.google.com' target={'_blank'}>Terms & Conditions</Typography.Link>
       <Typography.Link href='tel:+254701257360' target={'_blank'}>+254701257360</Typography.Link>

      
    </div>
  )
}

export default AppFooter
