import React from 'react';
import TodoForm from "./TodoForm";
import Todo from './Todo';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import List from 'material-ui/List';


export default class TodoList extends React.Component {
    state = {
        todos: [],
        todosToShow: "all",
        toggleAllComplete: true
    };

    componentDidMount(){
        // Make HTTP reques with Axios
        // if(localStorage.getItem('currentUser') != null){
        //     console.log('logged in');
        //     var token = localStorage.getItem('currentUser').auth_token;
        //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // }
        axios.get('https://todo-plus-api.herokuapp.com/todos')
          .then((res) => {
            console.log(res.data);
            // Set state with result
            this.setState({todos: res.data});
        });
    }

    addTodo = (todo) => {
        //let newTodo = {text: todo.text, complete: todo.complete, created_by: "ryan"}
        //pass to api
        console.log(todo.id);
        let newTodo = {text: todo.text, id: todo.id, complete: false};
        axios.post('https://todo-plus-api.herokuapp.com/todos', todo)
       .then((res) => {
          console.log(res.data);
          this.setState(state => ({
            todos: [res.data, ...state.todos]
        }));
       });
    }

    toggleComplete = (id) => {
        this.setState(state => ({
            todos: this.state.todos.map(todo => {
                //supposed to update
                if (todo.id === id){
                    console.log(id);
                    axios.put('https://todo-plus-api.herokuapp.com/todos/' + id, {
                        ...todo,
                        complete: !todo.complete
                    });
                    return {
                        ...todo,
                        complete: !todo.complete
                    };
                }
                else {
                    return todo;
                }
            })
        }))
    }
    updateTodoToShow = (s) => {
        this.setState({
            todosToShow: s
        });
    }

    handleDeleteTodo = (id) => {
        axios.delete('https://todo-plus-api.herokuapp.com/todos/' + id);
        this.setState(state => ({
            todos: state.todos.filter(todo => todo.id !== id)
        }));
    }

    removeAllComplete = async () => {
        for(let i = 0; i < this.state.todos.length; i++){
            if(this.state.todos[i].complete){
                await axios.delete('https://todo-plus-api.herokuapp.com/todos/' + this.state.todos[i].id);
            }
        }
        this.setState(state => ({
            todos: this.state.todos.filter(todo => !todo.complete)
        }));
    }

    allCompleteToggle = () => {
        this.setState(state => ({
            todos: this.state.todos.map(todo => ({
                ...todo,
                complete: this.state.toggleAllComplete
            })),
            toggleAllComplete: !this.state.toggleAllComplete
        }));
    }

    render() {
        let todos = [];
        if(this.state.todosToShow === 'all'){
            todos = this.state.todos;
        }
        else if(this.state.todosToShow === 'active'){
            todos = this.state.todos.filter(todo => !todo.complete);
        }
        else if(this.state.todosToShow === 'complete'){
            todos = this.state.todos.filter(todo => todo.complete);
        }
        return (
        <div>
            <AppBar
             title="Todo List"
           />
            <TodoForm onSubmit={this.addTodo}/>
            {todos.map(todo => (
                <Todo key={todo.id} 
                toggleComplete={() => this.toggleComplete(todo.id)} 
                onDelete={() => this.handleDeleteTodo(todo.id)}
                todo={todo}/>
            ))}
            <List>
                todos left: {this.state.todos.filter(todo => !todo.complete).length}
            </List>
            <div>
                <RaisedButton label="all" primary={true} style={style} onClick={() => this.updateTodoToShow("all")}/>
                <RaisedButton label="active" primary={true} style={style} onClick={() => this.updateTodoToShow("active")}/>
                <RaisedButton label="complete" primary={true} style={style} onClick={() => this.updateTodoToShow("complete")}/>
            </div>
            {this.state.todos.some(todo => todo.complete) ? (<div>
                <RaisedButton label="remove all complete" primary={true} style={style} onClick={this.removeAllComplete}/>
            </div>) : null}
            <div>
                <RaisedButton label={`toggle all complete:  ${this.state.toggleAllComplete}`} primary={true} style={style} onClick={this.allCompleteToggle}/>
            </div>
        </div>    
        );
    }
}

const style = {
    margin: 15,
};