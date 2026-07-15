import React from 'react'

const page = async () => {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
  console.log(posts)
  return (
    <div>
        Blogs Page
    </div>
  )
}

export default page