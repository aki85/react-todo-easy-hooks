import { useState, useEffect } from 'react'
import './App.css'

const ONE_SAVINGS_VALUE = 500
const MAX_TODO_COUNT = 10

const App = () => {
  const [savings, setSavings] = useState(0)
  const [todos, setTodos] = useState([])

  const initialize = () => {
    const initialTodos = [
      {
        title: `${ONE_SAVINGS_VALUE}円貯金`,
        type: '初期化',
      }
    ]
    setTodos(initialTodos)
    setSavings(0)
  }

  useEffect(() => {
    initialize()
  }, [])

  useEffect(() => {
    if (MAX_TODO_COUNT < todos.length) {
      todos.splice(10)
      setTodos(todos.concat([]))
      window.alert(`追加したTODOが上限を超えました！追加できるTODOは${MAX_TODO_COUNT}個までです。`)
    }
  }, [todos.length])
  
  const addTodo = (count, type) => {
    for (let i = 0; i<count; i++) {
      todos.push({
        title: `${ONE_SAVINGS_VALUE}円貯金`,
        type,
      })
    }
    setTodos(todos.concat([]))
  }

  const doneTodo = (count) => {
    setTodos(todos.splice(count))
    setSavings(savings + ONE_SAVINGS_VALUE * count)
  }

  const reset = () => {
    if (window.confirm(`現在${savings}円貯金済みです。本当に初期化しますか？`)) {
      initialize()
    }
  }

  return (
    <div className="App">
      <h1>貯金TODOリスト 現在{savings}円！！</h1>
      <ul>
        {todos.map((todo, i) => 
          <li key={i}>
            <h2>{todo.title} by {todo.type}</h2>
            <div>完了で{savings + ONE_SAVINGS_VALUE * (i+1)}円到達！</div>
            <button onClick={() => doneTodo(i+1)}>ここまでdone</button>
          </li>
        )}
      </ul>

      <button onClick={() => addTodo(1, 'TODO追加')}>TODO追加(1)</button>
      <button onClick={() => addTodo(5, 'TODO大量追加')}>TODO大量追加(5)</button>
      <button onClick={() => addTodo(MAX_TODO_COUNT+1, 'TODO無限追加')}>TODO無限追加(MAX+1)</button>
      <button className='reset' onClick={() => reset()}>RESET</button>
    </div>
  )
}

export default App
