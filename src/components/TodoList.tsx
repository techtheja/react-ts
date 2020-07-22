import React, { useState, Fragment } from 'react'

type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
  text: string
  complete: boolean
}

export const TodoList = (): JSX.Element => {
  const [value, setValue] = useState<string>('Empty')
  const [todos, setTodos] = useState<ITodo[]>([])

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }]
    setTodos(newTodos)
    console.log(newTodos)
  }

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  return (
    <Fragment>
      <h1>ToDo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type='submit'>Add ToDo</button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => (
          <Fragment key={index}>
            <div>{todo.text}</div>
            <button type='button' onClick={() => completeTodo(index)}>
              {''}
              {todo.complete ? 'Incomplete' : 'Complete'}
              {''}
            </button>
            <button type='button' onClick={() => removeTodo(index)}>
              &times;
            </button>
          </Fragment>
        ))}
      </section>
    </Fragment>
  )
}
