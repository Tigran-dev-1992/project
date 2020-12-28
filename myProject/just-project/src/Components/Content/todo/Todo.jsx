import React from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { useState } from 'react'




const Todo = () =>{
    let [todos, setTodo] = useState([])


    let addTodos = (inputValue)=>{
        debugger
        setTodo(todos.concat({complited : false, title : inputValue, id: Date.now()}))
        console.log(todos)
    }
    return(
        <div>
            <TodoList todos = {todos}/>
            <TodoForm addTodos= {addTodos}/>
        </div>
    )
}
export default Todo