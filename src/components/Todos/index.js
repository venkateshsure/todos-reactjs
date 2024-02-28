import {useState,useEffect} from 'react';


import EachTodo from '../EachTodo'
import './index.css'

const Todos=()=>{
    const [todos,setTodos]=useState([])

    useEffect(()=>{
        const fetchTodos= async ()=>{
        let url="https://backenedtodo-app-production.up.railway.app/todos/"
        let options = {
            method: 'GET',
            headers: {
                "Content-Type": 'applications/json'
            }
        };
        const response= await fetch(url,options)
        const data= await response.json()
       // console.log(data)
        setTodos(data)

        }
        fetchTodos()
    },[])

    console.log(todos)
    return (
        <div className="todos-bg-container">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="todos-heading">Todos</h1>
                    <h1 className="create-task-heading">
                        Create <span className="create-task-heading-subpart">Task</span>
                    </h1>
                    <input type="text" id="todoUserInput" className="todo-user-input" placeholder="What needs to be done?" />
                    <button className="button" id="addTodoButton">Add</button>
                    <h1 className="todo-items-heading">
                        My <span className="todo-items-heading-subpart">Tasks</span>
                    </h1>
                    <ul className="todo-items-container" id="todoItemsContainer">
                        {
                            todos.map((eachTodo)=>{
                                return <EachTodo eachTodo={eachTodo} key={eachTodo.id}/>
                            })
                        }
                    </ul>
                    
                </div>
            </div>
        </div>
    </div>
    )
}

export default Todos