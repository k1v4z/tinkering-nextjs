"use client"
import React, { useState } from 'react'
import Header from '../components/header'
import TaskTable from '../components/tasktable'
import styles from '../styles/todopage.module.css'
import AddTask from '../components/addtask'
import FormAdd from '../components/addForm'
import FormEdit from '../components/editform'
import { Task } from '../interfaces/ITodo'

const HomePage = () => {
    const initalTasks: Task[] = [
      {id: 1, taskName: "Do homework",status: "Todo"},
      {id: 2, taskName: "Cook meal",status: "In progress"},
      {id: 3, taskName: "Play badminton",status: "Complete"}]
    const [tasks,setTask] = useState<Task[]>(initalTasks);
    
    //thuoc tinh thay doi theo thoi gian
    const [isShowFormAdd,setShowFormAdd] = useState<boolean>(false);
    const [isShowFormEdit,setShowFormEdit] = useState<boolean>(false);
    const [taskSelected, setTaskSelected] = useState<Task | null>(null);

    const addTask = (taskName: string) => {
      const lengthOfTaskArray: number = tasks.length;
      setTask([...tasks, {id: tasks[lengthOfTaskArray - 1].id + 1, taskName: taskName, status: 'Todo'}])
    }

    const editTask = (id: number, taskNameChanged: string) => {
      //Find task by id
      const index = tasks.findIndex(task => task.id === id) //note that the value is index
      //create a new task object
      const updatedTask = {
        ...tasks[index],
        taskName: taskNameChanged
      }
      
      //tao ra mang moi voi gia tri thay doi
      let newTaskArray = [...tasks]
      newTaskArray[index] = updatedTask;
      closeEditForm();
      setTask(newTaskArray)
    }

    const editStatus = (id: number, newStatus: string) => {
      const index = tasks.findIndex(task => task.id === id)
      const updatedStatus = {
        ...tasks[index],
        status: newStatus
      }

      const newTaskArray = [...tasks];
      newTaskArray[index] = updatedStatus;
      setTask(newTaskArray)
    }

    const deleteTask = (id: number): void => {
      setTask([...tasks].filter(task => task.id !== id))
    }

    const openAddForm = () => {
      setShowFormAdd(true);
    }

    const closeAddForm = () => {
      setShowFormAdd(false);
    }

    const openEditForm = (task: Task) => {
      setTaskSelected(task)
      setShowFormEdit(true)
    }

    const closeEditForm = () => {
      setShowFormEdit(false)
    }


  return (
    <div className={styles.container}>
      <Header/>
      <div className={`${styles.overlay} ${isShowFormAdd || isShowFormEdit ? styles.active : ''}`}></div> {/* Thêm overlay */}
      {isShowFormAdd && <FormAdd closeForm={closeAddForm} addTask={addTask}/>}
      {isShowFormEdit && <FormEdit taskSelected={taskSelected} editTask={editTask} closeForm={closeEditForm} />}
      <AddTask openForm={openAddForm}/>
      <TaskTable openEditForm={openEditForm} tasks={tasks} deleteTask={deleteTask} editStatus={editStatus}></TaskTable> 
    </div>
  )
}

export default HomePage
