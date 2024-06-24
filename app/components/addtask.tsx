import React from 'react'
import styles from '../styles/addtask.module.css'
import { AddTaskProps } from '../interfaces/ITodo'

const AddTask = ({openForm}: AddTaskProps) => {
  return (
    <div className={styles.container}>
        <button className={styles.addtask_btn} onClick={() => openForm()}>Add task</button>
    </div>  
  )
}

export default AddTask
