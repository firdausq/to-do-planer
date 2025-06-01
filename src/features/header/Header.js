import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cycleTheme, setTitle } from './headerSlice'
import { Edit2, Check, Sun, Moon } from 'lucide-react'
import styles from './Header.module.css'

export default function Header() {
  const dispatch     = useDispatch()
  const title        = useSelector(s => s.header.title)
  const theme        = useSelector(s => s.header.theme)
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(title)
  const inputRef     = useRef(null)

  // Wenn wir in den Edit-Modus wechseln, das Input fokussen
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.select()
    }
  }, [isEditing])

  const saveTitle = () => {
    if (inputValue.trim()) {
      dispatch(setTitle(inputValue.trim()))
    }
    setIsEditing(false)
  }

  return (
    <header className={styles.header}>
      {isEditing ? (
        <div className={styles.titleEditor}>
          <input
            ref={inputRef}
            className={styles.titleInput}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && saveTitle()}
          />
          <button
            className={styles.iconButton}
            onClick={saveTitle}
            aria-label="Titel speichern"
          >
            <Check size={18} />
          </button>
        </div>
      ) : (
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{title}</h1>
          <button
            className={styles.iconButton}
            onClick={() => setIsEditing(true)}
            aria-label="Titel bearbeiten"
          >
            <Edit2 size={18} />
          </button>
        </div>
      )}
      <button
        className={styles.themeToggle}
        onClick={() => {
          const themes = ['light', 'dark']
          const next = themes[(themes.indexOf(theme) + 1) % themes.length]
          document.documentElement.setAttribute('data-theme', next)
          dispatch(cycleTheme())
        }}
        aria-label="Theme wechseln"
      >
        {/* Optional: Icon passend zum aktuellen Theme */}
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </header>
  )
}
