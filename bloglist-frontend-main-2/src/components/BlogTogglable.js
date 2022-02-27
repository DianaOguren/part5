import { useState } from 'react'

const BlogTogglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div className='blog' style={hideWhenVisible}>
        {props.children[0]}
        <button id='viewbutton' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div className='fullblog' style={showWhenVisible}>
        {props.children[1]}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
}

export default BlogTogglable