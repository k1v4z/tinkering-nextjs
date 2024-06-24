"use client"
import React from 'react'
import TaskItem from './taskitem'
import tasktablestyles from '../styles/Tasktable.module.css'
import { Task, TaskTableProps } from '../interfaces/ITodo'

const TaskTable = ({tasks,deleteTask, openEditForm, editStatus}: TaskTableProps) => {
  
  return (
    <table className={tasktablestyles.table}>
        <thead>
            <tr>
                <th>#</th>
                <th>Task Name</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Remove</th>
            </tr>
        </thead>
        <tbody>
          {
            tasks.map((task: Task) =>{
              return <TaskItem key={task.id}  task={task} deleteTask={deleteTask} openEditForm={openEditForm} editStatus={editStatus} />
            })
          }
        </tbody>
    </table>
  )
}

export default TaskTable
