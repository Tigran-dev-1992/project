import React from 'react'

const TodoList = ({todos}) =>{
    debugger
    return(
        <div>
            {todos.map(todo=>{return <div key = {todo.id}>{todo.title} <span><input type="checkbox" /></span></div>
            })}
            
        </div>
    )
}



export default TodoList