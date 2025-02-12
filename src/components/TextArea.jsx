import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

import styles from "./TextArea.module.css";

const TextArea = forwardRef(({ value, onChange, onKeyDown }, ref) => {
  const textAreaRef = useRef(null);

  const autoResize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResize();
  }, [value]);

  useImperativeHandle(ref, () => textAreaRef.current);

  return (
    <textarea
      placeholder="Escreva um novo parágrafo..."
      className={styles["paragraph-draft"]}
      ref={textAreaRef}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      rows={1}
    />
  );
});

export default TextArea;
