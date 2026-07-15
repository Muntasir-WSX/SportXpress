import Dislikedbutton from '@/app/ui/Dislikedbutton';
import React from 'react'

const BlogsSlugPage = async ({ params }: { params: Promise<{ slugs: string[] }> }) => {
  const { slugs } = await params;
  return (
    <div>Blog Post Page {slugs}
    
      <Dislikedbutton blogSlug={slugs}/>
    </div>
  
  )
}

export default BlogsSlugPage