import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";

import './index.css'

const EachTodo=(props)=>{
   const {eachTodo,onUpdateTodo,onDeleteTodo}=props
   const {id,todo,status,priority}=eachTodo
   const checkStatus=status==="DONE"?'checked':null
   const check=status==="DONE"? 'true':''

   const onChangeCheckbox=e=>{
    console.log(e.target.values)
   }

    return (
        <li className="todo-item-container">
            <input type="checkbox" id={id} className='checkbox-input' checked={check} onChange={onChangeCheckbox}/>
            <div className="label-container">
                <label  htmlFor={id} className={`checkbox-label ${checkStatus}`}>{todo}</label>
                <div className="delete-update-con">
                    <div onClick={()=>onDeleteTodo(id)} className="delete-icon-container">
                        <RiDeleteBin6Line className="delete-icon"/>
                    </div>
                    <div onClick={()=>onUpdateTodo(id)} className="delete-icon-container">
                        <FaPenToSquare className="delete-icon"/>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default EachTodo