"use client"
import axiosInstance from "@/api/axiosInstances"
import useTasks from "@/hooks/useTasks"
import React, { useState } from "react"

const FormTasks = () => {
  const { refetch } = useTasks()
const [tasks, setTasks] = useState({
  title: "",
  description: "",
})

const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setTasks({
    ...tasks,
    [e.target.name]: e.target.value
  })
}

const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  await axiosInstance.post("/", tasks)
  refetch()
}
  return (
      <form onSubmit={ handlerSubmit }>
        <input type="text" name="title" id="title" placeholder="Title" onChange={ handlerChange } />
        <input type="text" name="description" id="description" placeholder="Description" onChange={ handlerChange }/>
        <button type="submit">Criar Task</button>
      </form>
  )
}

export default FormTasks