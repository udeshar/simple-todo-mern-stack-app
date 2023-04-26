import Todo from './Todo';
import { Card } from 'react-bootstrap';

const Todos = ({ todos, removeTodo, markTodo, update }) => {
  return (
    <div>
          {todos.map(todo => (
            <Card key={todo.id} className="my-3" >
              <Card.Body>
                <Todo            
                update={update}    
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
  )
}

export default Todos
