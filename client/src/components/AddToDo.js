import { Button, Form, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react'

const AddToDo = ({ addTodo, name2, setName2, updateTodo }) => {
    const [name, setName] = useState(name2 && name2 || "");
    const [status, setStatus] = useState("");

    useEffect(() => {
      setName(name2)
    }, [name2])
    

    const handleSubmit = e => {
      
        e.preventDefault();
        if (!name) {
            alert('Please enter text');
            return
        }
        if(name2){
		updateTodo(name)
        } else{
	        addTodo({ name, status});
        }
        setName("");
        setStatus(false);
    };
  
    return (
		
	<Form onSubmit={handleSubmit}>
		<br/>
	<Row className="align-items-center">
		<Col sm={10} className="my-1">

			<Form.Control 
				type="text"
				className="input py-3"
				value={name}
				onChange={e => { setName(e.target.value); setStatus(false) } } 
				placeholder="Add new todo" />
		
		</Col>
		<Col xs="auto" className="my-1">
			<Button type="submit" className="py-3 px-4" >{name2 ? 'Update Todo' : 'Add Todo'}</Button>
		</Col>
		{
			name2 &&
			<Col xs="auto" className="my-1">
				<Button  variant="outline-danger"  className="py-3 px-4 mt-2" onClick={()=> {setName2(''); setName('')}}  >{'Cancel Update'}</Button>
			</Col>
		}
		
	</Row>
	<br/>
</Form>
    );
}

export default AddToDo

