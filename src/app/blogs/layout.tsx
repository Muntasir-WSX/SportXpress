import React from 'react'

const Blogslayout = ({ children } : { children: React.ReactNode } ) => {
  return (
    <div>Blogs Layout is special only for blogs route or nested routes
         {children}
    </div>
   
  )
}

export default Blogslayout