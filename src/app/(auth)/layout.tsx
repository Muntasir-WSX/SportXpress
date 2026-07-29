import React from 'react'

const AuthLayout = (
    {
        children

    }
    :
    {
        children: React.ReactNode
    }
) => {
  return (
   <>
   <div>
     {children}
    </div>

   {children}
   </>
  )
}

export default AuthLayout