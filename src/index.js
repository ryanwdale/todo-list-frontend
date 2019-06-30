import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';


const TodoForm = ({addTodo}) => {
    // Input tracker
    let input;
  
    return (
      <div>
        <input ref={node => {
          input = node;
        }} />
        <button onClick={() => {
          addTodo(input.value);
          input.value = '';
        }}>
          +
        </button>
      </div>
    );
};


const Todo = ({todo, remove}) => {
  // Each Todo
  return (<li 
    onClick={() => remove(todo.id)}>
    {"title: " + todo.title + " created by: " + todo.created_by}
    </li>);
}

const TodoList = ({todos, remove}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  });
  return (<ul>{todoNode}</ul>);
}

const Title = () => {
  return (
    <div>
       <div>
          <h1>to-do</h1>
       </div>
    </div>
  );
}

// Contaner Component
// Todo Id
window.id = 0;
class TodoApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }
    this.apiUrl = 'https://todo-plus-api.herokuapp.com/todos';
  }

  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({data: res.data});
      });
  }
  // Add todo handler
  addTodo(val){
    // Assemble data
    const todo = {title: val, created_by: "ryan"}
    //Update data
    axios.post(this.apiUrl, todo)
       .then((res) => {
          this.state.data.push(res.data);
          this.setState({data: this.state.data});
       });
    
  }

  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id){
        return todo;
      } 
    });
    // Update state with filter
    axios.delete(this.apiUrl+'/'+id)
      .then((res) => {
        this.setState({data: remainder});      
      })
    this.setState({data: remainder});
  }

  render(){
    // Render JSX
    return (
      <div>
        <Title />
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList 
          todos={this.state.data} 
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}


class ListsContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            todo: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3001/todos/1')
        .then(response => {
            this.setState({
                todo: response.data
            })
        })
        .catch(error => console.log(error));
    }
    render() {
        return (
            <div className="Lists-container">
            <h4>{this.state.todo.title}</h4>
            <h4>{this.state.todo.created_by}</h4>
            </div>
        )
    }
}


ReactDOM.render(<TodoApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
