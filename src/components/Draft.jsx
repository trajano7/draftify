import React from "react";
import Paragraph from "./Paragraph";

import styles from "./Draft.module.css";

export default function Draft({ paragraphs }) {
  return (
    <div className={styles.draft}>
      {paragraphs.map((p) => {
        return (
          <Paragraph key={p.id} id={p.id}>
            {p.text}
          </Paragraph>
        );
      })}
    </div>
  );
}
