import { assets } from '@/Assets/assets' // Check if the assets path is correctly configured
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SideBar = () => {
  return (
    <div className='flex flex-col bg-slate-100'>
      <div className='px-2 sm:pl-14 py-3 border border-black'>
        <Image src={assets.logo} width={120} height={60} alt='Company logo' /> {/* Added height */}
      </div>
      <div className='w-28 sm:w-80 h-[100vh] py-12 relative border border-black'>
       <div className='w-[90%] sm:w-[80%] absolute right-0'>
       <Link href='/Admin/addBlog' className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_5px_0px_#000] '>
          <Image src={assets.add_icon} alt='' width={28}/><p>Add Blogs</p>
        </Link>
       <Link href='/Admin/blogList' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_5px_0px_#000] '>
          <Image src={assets.blog_icon} alt='' width={28}/><p>Blog List</p>
        </Link>
       <Link href='/Admin/subscription' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_5px_0px_#000] '>
          <Image src={assets.email_icon} alt='' width={28}/><p>Subscriptions</p>
        </Link>
       </div>
        
      </div>
    </div>
  )
}

export default SideBar
