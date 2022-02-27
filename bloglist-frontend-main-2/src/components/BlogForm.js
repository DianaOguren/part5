import React from 'react'

const BlogForm = (props) => {
  return (
    <div className='blogForm'>
      <h2>Create new</h2>
      <form onSubmit={props.onSubmit}>
        <div>
          Title: <input
            id='title'
            value={props.valueTitle}
            onChange={props.onChangeTitle}/></div>
        <div >
          Author: <input
            id='author'
            value={props.valueAuthor}
            onChange={props.onChangeAuthor}/>
        </div>
        <div>
          URL: <input
            id='url'
            value={props.valueUrl}
            onChange={props.onChangeUrl}/></div>
        <div>
          Likes: <input
            id='likes'
            value={props.valueUnvotes}
            onChange={props.onChangeUnvotes}/>
        </div>
        <div>
          <button id='addbutton' type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm


