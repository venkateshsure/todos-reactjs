
const EachTodo=(props)=>{
   const {eachTodo}=props
   console.log(eachTodo)
   const {id,todo,status,priority}=eachTodo
    return (
        <li>
            <p>{todo}</p>
        </li>
    )
}

export default EachTodo