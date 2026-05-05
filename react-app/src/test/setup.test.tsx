import { render, screen } from '@testing-library/react'

function Hello({ name }: { name: string }) {
  return <p>Hello {name}</p>
}

test('testing-library + jsdom + jest-dom work', () => {
  render(<Hello name="Sakura" />)
  expect(screen.getByText('Hello Sakura')).toBeInTheDocument()
})
