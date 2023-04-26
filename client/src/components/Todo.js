import { Button} from 'react-bootstrap';

const Todo = ({ todo, removeTodo, markTodo, update }) => {
  return (
    <div className="todo" >
      <span style={{ textDecoration: todo.status ? "line-through" : "" }}>{todo.name}</span>
      <div>
      <Button variant="outline-dark" onClick={() => update(todo)}>Update</Button>
        <Button variant="outline-danger" className="ms-3"onClick={() => removeTodo(todo.id)}>Delete</Button>
        <Button variant="outline-primary" className="ms-3"  onClick={() => markTodo(todo.id)}>{todo.status ? 'Undone' : 'Done'}</Button>
      </div>
    </div>
  )
}

export default Todo
