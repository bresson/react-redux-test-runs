import React from 'react'
import { render } from 'react-testing-library'
import CommentFeed from './CommentFeed'

describe('CommentFeed', () => {
  let props = { header: 'Comment Feed', comments: [] }

  const createProps = props => ({
    header: 'Comment Feed',
    auth: {
        name: 'Ian Wilson',
    },
    comments: [
        {
          id: 'comment-0',
          author: 'Ian Wilson',
          text: 'A boats a boat but a mystery box could be anything.',
        },
        {
          id: 'comment-1',
          author: 'Max Powers Jr',
          text: 'Krypton sucks.',
        },
      ],
    createComment: jest.fn(),
    ...props,
  })


  it('renders the CommentFeed', () => {
    const { queryByText } = render(<CommentFeed {...props} />)
    const header = queryByText(props.header)
    expect(header.innerHTML).toBe(props.header)
  })

  it('renders the comment list', () => {
    const { container } = render(<CommentFeed {...props} />)
    const commentNodes = container.querySelectorAll('.Comment')
    expect(commentNodes.length).toBe(props.comments.length)
  })

  it('renders the comment list with some entries', () => {
    let comments = [
      {
        author: 'Ian Wilson',
        text: 'A boats a boat but a mystery box could be anything.',
      },
      {
        author: 'Max Powers Jr',
        text: 'Krypton sucks.',
      },
    ]

    props = { header: 'Comment Feed', comments }
    const { container } = render(<CommentFeed {...props} />)
    const commentNodes = container.querySelectorAll('.Comment')
    expect(commentNodes.length).toBe(props.comments.length)
  })

  it('allows the user to add a comment', () => {
    // Arrange - create props and locate elements
    const newComment = { author: 'Socrates', text: 'Why?' }
    let props = createProps()
    const { container, getByLabelText } = render(<CommentFeed {...props} />)

    const authorNode = getByLabelText('Author')
    const textNode = getByLabelText('Comment')
    const formNode = container.querySelector('form')

    // Act - simulate changes to elements
    authorNode.value = newComment.author
    textNode.value = newComment.text

    Simulate.change(authorNode)
    Simulate.change(textNode)

    Simulate.submit(formNode)

    // Assert - check whether the desired functions were called
    expect(props.createComment).toHaveBeenCalledTimes(1)
    expect(props.createComment).toHaveBeenCalledWith(newComment)
  })
})