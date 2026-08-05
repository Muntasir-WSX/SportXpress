import { Navbar } from '@/components/ui/SharedComponents/navbar';
import { getMe } from '@/service/getMe';
import React from 'react'

const DashboardLayout = async (
    {
        children

    }
    :
    {
        children: React.ReactNode
    }
) => {
    const user = await getMe();
  return (
   <>

   <div>
    <Navbar user={user} />

{children}
   </div>
   
   </>
  )
}

export default DashboardLayout