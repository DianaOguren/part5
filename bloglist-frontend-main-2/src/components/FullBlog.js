import React from 'react'
const FullBlog = ({ blog, onDelete, increaseLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1 ,
    marginRight: 400,
    marginTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
  }

  return (
    <div className='fullblog' style={blogStyle}>
      <div>
        <p>TITLE: {blog.title}</p>
        <p>AUTHOR: {blog.author}</p>
        <p>URL: {blog.url}</p>
        <p>LIKES: {blog.likes} <button id='likebutton' onClick={() => increaseLike(blog)}>Like</button></p>
        <button id='deletebutton' onClick={() => onDelete(blog)}>Delete</button>
      </div>
    </div>
  )
}

export default FullBlog