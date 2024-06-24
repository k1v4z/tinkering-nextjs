import React, { useRef, useState } from 'react'
import styles from '../styles/popups.module.css'
import { AddFormProps } from '../interfaces/ITodo';

const FormAdd = ({closeForm, addTask}: AddFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleAddTask = () => {
    const taskName: any = inputRef.current?.value.toString();
    addTask(taskName);
    closeForm();
  }

  return (
    <div className={styles.popup_container}>
        <div className={styles.header}>
            <h2>Add Task</h2>
            <button className={styles.close_Btn} onClick={() => closeForm()}>X</button>
        </div>
        <div className={styles.popup_content}>
            <p className={styles.subtitle}>Task</p>
            <input className={styles.input__task} type="text" ref={inputRef} />
        </div>
        <div className={styles.popup_footer}>
            <button className={styles.close_form_btn} onClick={() => closeForm()}>Close</button>
            <button className={styles.save_btn} onClick={handleAddTask}>Save Changes</button>
        </div>
    </div>
  )
}

export default FormAdd
