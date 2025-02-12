import React, { useEffect, useRef, useState } from "react";

import styles from "./DraftEditor.module.css";
import TextArea from "./TextArea";
import Draft from "./Draft";
import { clearDraft, getDraft, saveDraft } from "../storage/DraftStorage";

export default function DraftEditor() {
  const [paragraphs, setParagraphs] = useState([]);
  const [nextID, setNextID] = useState(0);
  const [newParagraphText, setNewParagraphText] = useState("");
  const textAreaRef = useRef(null);

  const addNewParagraphHandler = () => {
    if (!newParagraphText) return;

    const newParagraph = {
      id: nextID,
      text: newParagraphText,
    };

    setParagraphs((prevParagraphs) => [...prevParagraphs, newParagraph]);
    setNewParagraphText("");
    setNextID((prevID) => prevID + 1);
  };

  const paragraphChangeHandler = (e) => {
    setNewParagraphText(e.target.value);
  };

  const keyDownHandler = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      addNewParagraphHandler();
    }
  };

  const saveDraftHandler = () => {
    saveDraft(paragraphs);
  }
  
  const clearDraftHandler = () => {
    clearDraft();
    setParagraphs([]);
    setNextID(0);
  }

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [paragraphs]);

  useEffect(() => {
    const storedDraft = getDraft();
    setParagraphs(storedDraft);
    setNextID(storedDraft.length);
  }, []);

  return (
    <div className={styles["container"]}>
      <h1>Draftify</h1>
      <Draft paragraphs={paragraphs} />
      <TextArea
        ref={textAreaRef}
        value={newParagraphText}
        onChange={paragraphChangeHandler}
        onKeyDown={keyDownHandler}
      />
      <div className={styles.actions}>
        <button className={styles["actions__button"]} onClick={addNewParagraphHandler}>
          Adicionar Parágrafo{" "}
          <span className="material-symbols-outlined">add</span>
        </button>
        <button className={styles["actions__button"]} onClick={saveDraftHandler}>
          Salvar Rascunho{" "}
          <span className="material-symbols-outlined">save</span>
        </button>
        <button className={styles["actions__button"]} onClick={clearDraftHandler}>
          Limpar Rascunho{" "}
          <span className="material-symbols-outlined">delete_forever</span>
        </button>
      </div>
    </div>
  );
}
