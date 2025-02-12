import React from 'react'

import styles from "./Paragraph.module.css";

export default function Paragraph({ id, children }) {
  return (
    <p id={id} className={styles['paragraph']}>{children}</p>
  )
}
