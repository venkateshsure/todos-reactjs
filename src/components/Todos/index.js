
import {useState,useEffect} from 'react';


import EachTodo from '../EachTodo'
import './index.css'

const Todos=()=>{
    const [todoText,setTodoText]=useState("")
    const [todos,setTodos]=useState([])

    const onEnterTodo=(event)=>{
        setTodoText(event.target.value)
    }

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
        setTodos(data)

        }
        fetchTodos()
    },[])

    const addNewTodo= async  ()=>{
        const todoLength=todos.length
        console.log(todoText)
        let newTodo = {
            "id": parseInt(todoLength)+1,
            "priority": "HIGH",
            "status": "IN PROGRESS",
            "todo": todoText,
        };
        let url="https://backenedtodo-app-production.up.railway.app/todos/"
        let options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json',
            },
            body:JSON.stringify(newTodo)
        };
        const response= await fetch(url,options)
        console.log(response)
        const data= await response.text()
        setTodoText("")
        setTodos([...todos,newTodo]);
        console.log(data)
    }


    const onUpdateTodo=async (id)=>{
        const url = `https://backenedtodo-app-production.up.railway.app/todos/${id}/`;

        let updatedData = {
            "todo":todoText
        };
        
        let options = {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json',
            },
            body: JSON.stringify(updatedData),
        };
        const response= await fetch(url,options)
        const responseText=await response.text()
        const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, todo: todoText } : todo);
        setTodos(updatedTodos);
        console.log(responseText) 
        setTodoText("")
    }

    const onDeleteTodo= async   (todoId)=>{
        console.log(todoId)
        let deleteUrl = `https://backenedtodo-app-production.up.railway.app/todos/${todoId}/`;

        let deleteOptions = {
            method: 'DELETE',
        };

       const response=await  fetch(deleteUrl, deleteOptions)
        const responseText=await response.text()
        const todosAfterDelete=todos.filter(eachTodo=>(eachTodo.id!==todoId))
        setTodos(todosAfterDelete)
        console.log(responseText)
    }

    return (
        <div className="todos-bg-container">
                <div className="con">
                    <h1 className="todos-heading">Todos</h1>
                    <h1 className="create-task-heading">
                        Create <span className="create-task-heading-subpart">Task</span>
                    </h1>
                    <input value={todoText} type="text" className="todo-user-input" placeholder="What needs to be done?" onChange={onEnterTodo}/>
                    <div>
                        <button className="button" onClick={addNewTodo}>Add</button>
                    </div>
                    <h1 className="todo-items-heading">
                        My <span className="todo-items-heading-subpart">Tasks</span>
                    </h1>
                    <ul className="todo-items-container">
                        {
                            todos.map((eachTodo)=>{
                                return <EachTodo eachTodo={eachTodo} key={eachTodo.id} onUpdateTodo={onUpdateTodo} onDeleteTodo={onDeleteTodo}/>
                            })
                        }
                    </ul>
                    
                </div>
            </div>
    )
}

export default Todos