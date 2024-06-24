import React, { useRef } from 'react'
import styles from '../styles/popups.module.css'
import { FormEditProps } from '../interfaces/ITodo';

const FormEdit = ({closeForm, taskSelected, editTask}: FormEditProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const handleEditTask = () => {
        const taskNameChanged: any = inputRef.current?.value.toString();
        editTask(taskSelected.id,taskNameChanged);
    }

  return (
    <div className={styles.popup_container}>
        <div className={styles.header}>
            <h2>Edit Task {taskSelected.id}</h2>
            <button className={styles.close_Btn} onClick={() => closeForm()}>X</button>
        </div>
        <div className={styles.popup_content}>
            <p className={styles.subtitle}>Task</p>
            <input className={styles.input__task} defaultValue={taskSelected.taskName} type="text" ref={inputRef} />
        </div>
        <div className={styles.popup_footer}>
            <button className={styles.close_form_btn} onClick={() => closeForm()}>Close</button>
            <button className={styles.save_btn} onClick={handleEditTask}>Save Changes</button>
        </div>
    </div>
  )
}

export default FormEdit
