"use client"
import React from 'react'
import headerstyles from '../styles/Header.module.css'

const Header = () => {
  return (
    <header className={headerstyles.header}>
        <h1 className={headerstyles.title}>ToDo List Demo App</h1>
        <p className={headerstyles.subtitle}>Do it now</p>
    </header>
  )
}

export default Header
