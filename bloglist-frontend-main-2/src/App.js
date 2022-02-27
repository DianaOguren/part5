import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useRef } from 'react'
import FullBlog from './components/FullBlog'
import BlogTogglable from './components/BlogTogglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newUnvotes, setNewUnvotes] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loguser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loguser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logoutUser = async () => {
    window.localStorage.removeItem('loguser')
    document.location.reload()
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleUnvotesChange = (event) => {
    setNewUnvotes(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl,
      likes: newUnvotes,
    }

    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`A new blog '${blogObject.title}' by ${blogObject.author} is added to the list`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
        setNewUnvotes('')
      })
  }

  const handleDelete = blog => {
    if (window.confirm(`Delete ${blog.title}?`)){
      blogService
        .remove(blog)
        .catch(() => {
          setErrorMessage(`Blog ' ${blog.title}' was already deleted from phonebook`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setBlogs(blogs.filter(b => b.title !== blog.title))
        })
        .then(() => {
          blogService
            .getAll()
            .then(initialBlogs => {
              setBlogs(initialBlogs)
            })
        })
    }
  }

  const handleIncreaseLike = blog => {
    const blogtoChange = blogs.find(n => n.title === blog.title)
    const changedBlog = { ...blogtoChange, likes: blog.likes + 1 }

    blogService.update(changedBlog.id, changedBlog)

    setBlogs(blogs.map(blog => (blog.title !== changedBlog.title ? blog : changedBlog)))
    setSuccessMessage(`Likes of ${changedBlog.title} are increased`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const togglableBlogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm onSubmit={addBlog} valueAuthor={newAuthor} onChangeAuthor={handleAuthorChange} valueTitle={newTitle} onChangeTitle={handleTitleChange} valueUrl={newUrl} onChangeUrl={handleUrlChange} valueUnvotes={newUnvotes} onChangeUnvotes={handleUnvotesChange}/>
    </Togglable>
  )

  const togglableBlog = () => (
    <div id="allblogs">{blogs.map(blog =>
      <BlogTogglable buttonLabel="view" key={blog.id}>
        <Blog key={blog.id} blog={blog} />
        <FullBlog  key={blog.id} blog={blog} onDelete={handleDelete} increaseLike={handleIncreaseLike}/>
      </BlogTogglable>
    )}
    </div>
  )

  blogs.sort(function (a, b){
    return b.likes - a.likes
  })

  if (user === null) {
    return (
      <div>
        <ErrorNotification message={errorMessage}/>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <SuccessNotification message={successMessage}/>
      <p>{user.name} logged in <button onClick={() => logoutUser()}>logout</button></p>

      {togglableBlogForm()}
      {togglableBlog()}
    </div>
  )
}

export default App