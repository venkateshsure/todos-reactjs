

import { CiSearch } from "react-icons/ci";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useState,useEffect} from 'react';


import EachTodo from '../EachTodo'
import './index.css'

const Todos=()=>{
    const [todoText,setTodoText]=useState("")
    const [searchInput,setSearchTodo]=useState("")
    const [status,setStatus]=useState("")
    const [priority,setPriority]=useState("")
    const [todos,setTodos]=useState([])

    const onEnterTodo=(event)=>{
        setTodoText(event.target.value)
    }

    const onSearchText=event=>{
        setSearchTodo(event.target.value)
    }

    const onChangeStatus=event=>{
        setStatus(event.target.value)
    }

    const onChangePriority=event=>{
        setPriority(event.target.value)
    }

    const notify = (response) => {
        console.log("Toast message:", response)
        toast(response);
    };

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

     const onSearchTodos=async ()=>{
        let url=`https://backenedtodo-app-production.up.railway.app/todos/?search_q=%${searchInput}%`
        let options = {
            method: 'GET',
            headers: {
                "Content-Type": 'applications/json'
            }
        };
        const response= await fetch(url,options)
        const data= await response.json()
        setTodos(data)
        setSearchTodo("")
   }
    

    const addNewTodo= async  ()=>{
        const todoLength=todos.length
        let newTodo = {
            "id": parseInt(todoLength)+1,
            "priority": priority,
            "status": status,
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
        const responseText= await response.text()
        setTodoText("")
        setTodos([...todos,newTodo]);
        if(response.ok){
            notify(responseText)
        }
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
        setTodoText("")
        if(response.ok){
            notify(responseText)
        }
    }

    const onDeleteTodo= async   (todoId)=>{
        let deleteUrl = `https://backenedtodo-app-production.up.railway.app/todos/${todoId}/`;

        let deleteOptions = {
            method: 'DELETE',
        };

       const response=await  fetch(deleteUrl, deleteOptions)
        const responseText=await response.text()
        const todosAfterDelete=todos.filter(eachTodo=>(eachTodo.id!==todoId))
         setTodos(todosAfterDelete)
        if(response.ok){
            notify(responseText)
        }
    }

    return (
        <div className="todos-bg-container">
                <div className="con">
                    <h1 className="todos-heading">Todos</h1>
                    <h1 className="create-task-heading">
                        Create <span className="create-task-heading-subpart">Task</span>
                    </h1>
                    <div className="todos-user-input-con">
                            
                            <input value={todoText} type="text" className="todo-user-input" placeholder="What needs to be done?" onChange={onEnterTodo}/>
                        
                        
                   <div className="todo-radio-select-con">

                   <div className="todo-radio-con">
                            <h1 className="create-task-heading">Status</h1>
                            <div className="each-radio-con">
                                <input onChange={onChangeStatus} value="TO DO" type="radio" name="status" id="To Do"  />
                                <label htmlFor="To Do">TO DO</label>
                                <input onChange={onChangeStatus} value="IN PROGRESS" type="radio" name="status" id="In Progress"/>
                                <label htmlFor="In Progress">IN PROGRESS</label>
                                <input onChange={onChangeStatus} value="DONE" type="radio" name="status" id="Done"/>
                                <label htmlFor="Done">DONE</label>
                            </div>
                    </div>


                    <div className="todo-select-con">
                        <label className="create-task-heading" htmlFor="priority">Priority</label>
                        <select onChange={onChangePriority} id="priority" className="form-control">
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                        </select>
                    </div>
                    </div>
        
                    </div>
                    
                    <div>
                        <button className="button" onClick={addNewTodo}>Add</button>
                    </div>
                    <h1 className="todo-items-heading">
                        My <span className="todo-items-heading-subpart">Tasks</span>
                    </h1>
                    <div className="search-con">
                        <input  value={searchInput} onChange={onSearchText} type="search" className="input-search" placeholder="Search Todo"/>
                        <CiSearch className="search-icon" onClick={onSearchTodos}/>
                    </div>
                    <ul className="todo-items-container">
                        {
                            todos.length===0?<h2 className="no-todos">NO TODOS!</h2>:
                            todos.map((eachTodo)=>{
                                return <EachTodo eachTodo={eachTodo} key={eachTodo.id} onUpdateTodo={onUpdateTodo} onDeleteTodo={onDeleteTodo}/>
                            })
                        }
                    </ul>
                    
                </div>
                <ToastContainer />
            </div>
    )
}

export default Todos