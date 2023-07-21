import { useState, useEffect } from 'react'
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import AddToDo from './components/AddToDo';
import Todos from './components/Todos';
import { Button } from 'react-bootstrap';

const rating = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10
]

// const mainLink = 'https://simple-todo-mern-stack-app.vercel.app/';
const mainLink = 'http://localhost:8000/';

function App() {
      const [todos, setTodos] = useState([]);
      const [name, setName] = useState("")
      const [rates, setRates] = useState(0);
      const [message, setMessage] = useState('');

      useEffect(() => {
            const getTodos = async () => {
                  const todosFromServer = await fecthTodos();
                  setTodos(todosFromServer);
            }

            getTodos();
      }, []);

      const fecthTodos = async () => {
            const res = await fetch(`${mainLink}get`)
            const data = await res.json();
            return data.todos;
      }

      const submitRating = async () => {
            const res = await fetch(`${mainLink}givemarks`,{
                  method: 'POST',
                  headers: {
                        'Content-type': 'application/json',
                  },
                  body: JSON.stringify({marks : rates}),
            })
            const data = await res.json();
            setMessage(data.message);
      }

      const fetchTodo = async (id) => {
            const res = await fetch(`${mainLink}get/${id}`)
            const data = await res.json();
            return data.todo
      }

      const addTodo = async (todo) => {
            const res = await fetch(`${mainLink}post`, {
                  method: 'POST',
                  headers: {
                        'Content-type': 'application/json',
                  },
                  body: JSON.stringify(todo),
            })

            const data = await res.json();

            setTodos([...todos, data.todo])

      }

      const removeTodo = async (id) => {
            const res = await fetch(`${mainLink}delete/${id}`, {
                  method: 'DELETE',
            });

            res.status === 200
                  ? setTodos(todos.filter((todo) => todo.id !== id))
                  : alert('There was an error while deleting');
      }

      const markTodo = async (id) => {
            const todoToToggle = await fetchTodo(id);
            const updatedTodo = { status: !todoToToggle.status }

            const res = await fetch(`${mainLink}put/${id}`, {
                  method: 'PUT',
                  headers: {
                        'Content-type': 'application/json',
                  },
                  body: JSON.stringify(updatedTodo),
            });

            if (res.status === 200) {

                  const data = await res.json();

                  setTodos(
                        todos.map((todo) =>
                              todo.id === id ? { ...todo, status: data.todo.status } : todo
                        )
                  )

            }

      }

      const update = (e) => {
            setName(e);
      }

      const UpdateTodo = async (title) => {
            const updatedTodo = { name: title }

            const res = await fetch(`${mainLink}putname/${name?.id}`, {
                  method: 'PUT',
                  headers: {
                        'Content-type': 'application/json',
                  },
                  body: JSON.stringify(updatedTodo),
            });

            if (res.status === 200) {

                  const data = await res.json();

                  setTodos(
                        todos.map((todo) =>
                              todo.id === name?.id ? { ...todo, name: data?.todo?.name } : todo
                        )
                  )

            }

      }

      return (
            <div className="app">
                  <div className="container">
                        <Header title={'Todo List With REST API'} />
                        <AddToDo addTodo={addTodo} name2={name?.name} setName2={setName} updateTodo={UpdateTodo} />
                        {todos.length > 0 ? (<Todos todos={todos} removeTodo={removeTodo} markTodo={markTodo} update={update} />) : ('No Todos To Show')}

                        <Header title={'Give marks for this project out of 10'} className="my-5" />

                        <div className="d-flex justify-content-center" >
                              {
                                    rating.map((item, index) =>
                                          <div style={{ backgroundColor: item <= rates ? 'black' : 'transparent' }} className="singleRating mx-2" onClick={() => setRates(item)} ></div>
                                    )
                              }
                        </div>
                        {
                              rates > 0 &&
                              <div className='text-center' >
                                    <Button className="mt-4 px-5 py-2" onClick={submitRating} >Submit</Button>
                                    <p className="mt-3" ><b>{message}</b></p>
                              </div>
                        }
                        <div className="mb-5" />
                  </div>
            </div>
      );
}

export default App;