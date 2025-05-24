import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cycleTheme } from './headerSlice';
import styles from './Header.module.css';

export default function Header() {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.header.title);
  const theme = useSelector((state) => state.header.theme);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <button
        className={styles.themeButton}
        onClick={() => {
          // Toggle ATTRIBUTE für <html> setzen
          const nextTheme = ['light', 'dark', 'blue', 'pink'][
            (['light', 'dark', 'blue', 'pink'].indexOf(theme) + 1) % 4
          ];
          document.documentElement.setAttribute('data-theme', nextTheme);
          dispatch(cycleTheme());
        }}
      >
        Theme: {theme}
      </button>
    </header>
  );
}
