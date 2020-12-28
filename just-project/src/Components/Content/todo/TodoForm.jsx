import React from 'react'
import { useState } from 'react'

const TodoForm = ({addTodos}) =>{
let [inputValue,setValue] = useState("")


    return(
        <div>
            <input type="text" onChange = {(e)=>{setValue(e.target.value)}} value = {inputValue}/>
            <button onClick = {()=>{addTodos(inputValue)}}>Add todo</button>
        </div>
    )
}

export default TodoForm