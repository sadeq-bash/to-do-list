import React, { useState } from "react"
import "./App.css"

function App()
{
    const [todos,setTodos] = React.useState([])
    const [todo , setTodo] = React.useState([])
    const [todoEdit,setTodoEdit] = React.useState(null)

    const [EditText,setEditText] = React.useState("")

    const [taskCount, setTaskCount] = useState(0)
    
    function handleSubmit(e){
        e.preventDefault()

        const newTodo={
            id : new Date().getTime(),
            text : todo,
            completed : false
        }

        setTodos([...todos].concat(newTodo))

        setTodo("")
        setTaskCount(prevTaskCount => prevTaskCount+1)
    }
    function DeleteTodo(id)
    {
        const updatedTodos = [...todos].filter((todo) =>todo.id !== id)

        setTaskCount(prevTaskCount => prevTaskCount-1)
        setTodos(updatedTodos)
    }
    function todoCompeleted(id)
    {
        const updatedTodos = [...todos].map((todo) => {
            if(todo.id === id){
                todo.completed = !todo.completed
            }
            return todo
        })
        todos = updatedTodos
    }
    function editTodo(id) {
        const updatedTodos = [...todos].map((todo) => {
            if(todo.id === id){
                todo.text = EditText
            }
            return todo
        })
        setTodos(updatedTodos)
        setTodoEdit(null)
        setEditText("")
    }

    return(
        <div className="App">
            <div className="header">TaskList 2022</div>
            <div className="form-con">
                <form onSubmit={handleSubmit}>
                    <input className="in" type="text" placeholder="Add task" onChange={(e) => setTodo(e.target.value)} value={todo}/>
                    <button className="in-btn" type="submit">Add task to do</button>
                </form>

            </div>
            {/* <hr/> */}
            <div className="tasks">
            {todos.map((todo) => <div  className="added-task" key ={todo.id}>
                {todoEdit === todo.id ? (<input className="e-in" type = "text" onChange={(e) => setEditText(e.target.value)} value = {EditText} />) : (<div>{todo.text}</div>)}
                <div className="opt-con">
                <button className="deletor" onClick={() => DeleteTodo(todo.id)}>Delete</button>

                {todoEdit === todo.id ? (<button className="sub" onClick={() => editTodo(todo.id)}>submit</button>) 
                :
                 (<button className="editor" onClick={() => setTodoEdit(todo.id)}>Edit</button>)}

                <input className="check" type="checkBox" onChange={() => todoCompeleted(todo.id)} checked = {todo.compeleted}/>
                </div>

                </div>)}
                <hr/>
            <div className="counter">number of tasks : {taskCount}</div>
            </div>

        </div>
    )
}
export default App