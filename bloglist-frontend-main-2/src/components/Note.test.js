import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogTogglable from './BlogTogglable'
import FullBlog from './FullBlog'
import BlogForm from './BlogForm'

test('5.13: component displaying the title and author of the blog', () => {
  const newblog = {
    author: 'Darren Rowse',
    title: 'Digital Photography School',
    url: 'https://www.digital-photography-school.com/',
    likes: 3994,
  }

  const { container } = render(<Blog blog={newblog} />)
  const element = container.querySelector('.blog')
  expect(element.title && element.author ).toBeDefined()
  expect(element.url && element.likes).not.toBeDefined()
})

test('5.14: clicking the button makes url and number of likes to be shown ', async () => {
  const newblog = {
    author: 'Darren Rowse',
    title: 'Digital Photography School',
    url: 'https://www.digital-photography-school.com/',
    likes: 3994,
  }

  const { container } = render(
    <BlogTogglable buttonLabel="view">
      <Blog blog={newblog}/>
      <FullBlog blog={newblog}/>
    </BlogTogglable>)

  const button = screen.getByText('view')
  userEvent.click(button)

  const elementfull = container.querySelector('.fullblog')
  const elementblog = container.querySelector('.blog')
  expect(elementfull).not.toHaveStyle('display: none')
  expect(elementfull).toHaveTextContent('URL')
  expect(elementfull).toHaveTextContent('LIKES')
  expect(elementblog).toHaveStyle('display: none')
})

test('5.15: if like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const newblog = {
    author: 'Darren Rowse',
    title: 'Digital Photography School',
    url: 'https://www.digital-photography-school.com/',
    likes: 3994,
  }

  const mockHandler = jest.fn()
  render(
    <BlogTogglable buttonLabel="view">
      <Blog blog={newblog}/>
      <FullBlog blog={newblog} increaseLike={mockHandler}/>
    </BlogTogglable>)

  const button = screen.getByText('view')
  userEvent.click(button)

  const likeButton = screen.getByText('Like')
  userEvent.click(likeButton)
  userEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})

test('5.16: right details when a new blog is created', () => {
  const newblog = {
    author: 'Darren Rowse',
    title: 'Digital Photography School',
    url: 'https://www.digital-photography-school.com/',
    likes: 3994,
  }

  const { container } = render(<BlogForm  onChange={() => {}} valueAuthor={newblog.author} valueTitle={newblog.title} valueUrl={newblog.url}  valueUnvotes={newblog.likes} onChangeAuthor={() => {}} onChangeTitle={() => {} } onChangeUrl={() => {} } onChangeUnvotes={() => {} }/>)

  const author = container.querySelector('#author').value
  const title = container.querySelector('#title').value
  const url = container.querySelector('#url').value
  const likes = container.querySelector('#likes').value

  expect(author).toBe('Darren Rowse')
  expect(title).toBe('Digital Photography School')
  expect(url).toBe('https://www.digital-photography-school.com/')
  expect(likes).toBe('3994')
})


