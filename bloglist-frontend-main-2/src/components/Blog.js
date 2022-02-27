import React from 'react'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1 ,
    marginRight: 400,
    marginTop: 10,
  }

  return (
    <div className='blog' id='blog' style={blogStyle} >
      <div> {blog.title} by {blog.author} </div>
    </div>
  )
}

export default Blog

