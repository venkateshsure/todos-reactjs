import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

import './index.css'

const EachTodo=(props)=>{
   const {eachTodo,onUpdateTodo,onDeleteTodo}=props
   const {id,todo,status,priority}=eachTodo
    return (
        <li className="todo-item-container">
            <input type="checkbox" id={id} className='checkbox-input'/>
            <div className="label-container">
                <label  htmlFor={id} className='checkbox-label'>{todo}</label>
                <div onClick={()=>onDeleteTodo(id)} className="delete-icon-container">
                    <RiDeleteBin6Line className="delete-icon"/>
                </div>
                <div onClick={()=>onUpdateTodo(id)} className="delete-icon-container">
                    <MdOutlineTipsAndUpdates className="delete-icon"/>
                </div>
            </div>
        </li>
    )
}

export default EachTodo