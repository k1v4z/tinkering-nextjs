"use client"
import React from 'react'
import styles from '../styles/taskitem.module.css'
import edit_icon from '../icons/edit-icon.png'
import delete_icon from '../icons/delete-icon.png'
import Image from 'next/image'
import StatusButton from './statusbutton'
import { TaskItemProps } from '../interfaces/ITodo'

const TaskItem = ({task, deleteTask, openEditForm, editStatus}: TaskItemProps) => {

  return (
    <tr className={styles.task__item}>
        <td>{task.id}</td>
        <td>{task.taskName}</td>
        <td>
          <StatusButton taskId={task.id} editStatus={editStatus} status={task.status}/>
        </td>
        <td>
          <button className={styles.editTask} onClick={() => openEditForm(task)}>
            <Image src={edit_icon} className={styles.btnEdit} alt={''}></Image>
          </button>
        </td>
        <td>
          <button className={styles.deleteTask} onClick={() => deleteTask(task.id)}>
            <Image src={delete_icon} className={styles.btnDelete} alt={''} ></Image>
          </button>
        </td>
    </tr>
  )
}

export default TaskItem
