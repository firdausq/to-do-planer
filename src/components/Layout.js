import React from 'react'
import Header from '../features/header/Header'
import styles from './Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
