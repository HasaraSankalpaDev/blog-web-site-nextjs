"use client"
import React from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'


const Footer = () => {

  return (
   <div className=' flex justify-around flex-col  gap-2 sm:gap-0 sm:flex-row bg-black py-8 items-center '>
    <Image src={assets.logo_light} alt='' width={120}/>
    <p className='text-sm text-white sm:my-5 xsm:my-5'>Copyright © 2018 - 2024 . All rights reserved.</p>
    <div className='flex'>
      <Image src={assets.facebook_icon} width={40}/>
      <Image src={assets.twitter_icon} width={40}/>
      <Image src={assets.googleplus_icon} width={40}/>
    </div>
   </div>
  )
}

export default Footer