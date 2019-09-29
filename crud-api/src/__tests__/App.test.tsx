import React from 'react';
import App, { IPost } from '../App';
import { cleanup, render, waitForElement, getAllByText } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

afterEach(cleanup)
const posts: IPost[] = [
  {
    userId: 1,
    id: 1,
    title: 'title test 1',
    body: 'body test 1'
  },
  {
    userId: 2,
    id: 2,
    title: 'title test 2',
    body: 'body test 2'
  }
]
const mock = new MockAdapter(axios)
mock
  .onGet('https://jsonplaceholder.typicode.com/posts')
  .reply(200, posts)

describe('App', () => {
  it('should render posts when page loads.', async () => {
    const { container, debug } = render(<App />)
    const postList = await waitForElement(() => getAllByText(container, /title/i))

    expect(postList).toMatchSnapshot()
    // debug()
  });
})
