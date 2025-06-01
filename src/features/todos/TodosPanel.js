import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, toggleTodo, removeTodo } from './todosSlice'
import styles from './TodosPanel.module.css'

export default function TodosPanel() {
  const dispatch   = useDispatch()
  const dateKey    = useSelector(s => s.calendar.selectedDate)
  const items      = useSelector(s => s.todos.todosByDate[dateKey] || [])
  const [input, setInput] = useState('')

  const onAdd = e => {
    e.preventDefault()
    if (!input.trim()) return
    dispatch(addTodo({ date: dateKey, text: input.trim() }))
    setInput('')
  }

  return (
    <div className={styles.container}>
      <h3>To-Dos:</h3>
      <form onSubmit={onAdd} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Neues To-Do"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className={styles.addButton}>+</button>
      </form>
      <ul className={styles.list}>
        {items.map(todo => (
          <li key={todo.id} className={styles.item}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => dispatch(toggleTodo({ date: dateKey, id: todo.id }))}
              />
              <span className={todo.done ? styles.done : ''}>
                {todo.text}
              </span>
            </label>
            <button
              className={styles.delete}
              onClick={() => dispatch(removeTodo({ date: dateKey, id: todo.id }))}
            >✕</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
