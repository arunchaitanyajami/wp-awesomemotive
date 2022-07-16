import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

beforeAll(() => {})
afterEach(() => {})
afterAll(() => {})
describe('App', () => {
  test('Is Expected to have Settings, Graph and Table Tab', async () => {
    let { container } = render(<App/>)
    expect(container.querySelector('#react-tabs-0')).toHaveTextContent('Settings')
    expect(container.querySelector('#react-tabs-2')).toHaveTextContent('Table')
    expect(container.querySelector('#react-tabs-4')).toHaveTextContent('Graph')
    expect(container).toMatchSnapshot()
  })
})
