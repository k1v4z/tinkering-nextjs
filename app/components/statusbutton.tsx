import React from 'react'
import styles from '../styles/Statusbutton.module.css'
import { StatusButtonProps } from '../interfaces/ITodo'

const StatusButton = ({status, editStatus, taskId}: StatusButtonProps) => {
  
  const handleEditStatus = () =>{
    switch(status){
      case "Todo":
        editStatus(taskId, "In progress")
        break
      case "In progress":
        editStatus(taskId, "Complete")
        break
    }
  }

  const statusStyles = (): string => {
      switch(status){
        case "In progress":
          return styles.btnStatus_inprogress;
        case "Complete":
          return styles.btnStatus_complete;
      }
    
      return styles.btnStatus_todo;
  }

  return (
    <button onClick={() => handleEditStatus()} className={statusStyles()} >{status}</button>
  )
}

export default StatusButton
