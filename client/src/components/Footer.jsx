import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 mt-20'>
      <img src={assets.logo} />
      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @Umang Srivastava | All rights reserved.</p>
      <div className='flex gap-2.5'>
        <img width={38} src={assets.facebook_icon} alt="" />
        <img width={38} src={assets.instagram_icon} alt="" />
        <img width={38} src={assets.twitter_icon} alt="" />
      </div>
    </div>
  )
}

export default Footer
