import React from 'react';
import TodoForm from "./TodoForm";
import Todo from './Todo';
import axios from 'axios';

export default class TodoList extends React.Component {
    state = {
        todos: [],
        todosToShow: "all",
        toggleAllComplete: true
    };

    componentDidMount(){
        // Make HTTP reques with Axios
        axios.get('http://localhost:3001/todos')
          .then((res) => {
            // Set state with result
            this.setState({todos: res.data});
          });
    }

    addTodo = (todo) => {
        //pass to api
        this.setState(state => ({
            todos: [todo, ...state.todos]
        }));
    }

    toggleComplete = (id) => {
        this.setState(state => ({
            todos: this.state.todos.map(todo => {
                //supposed to update
                if (todo.id === id){
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
        this.setState(state => ({
            todos: state.todos.filter(todo => todo.id !== id)
        }));
    }

    removeAllComplete = () => {
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
            <TodoForm onSubmit={this.addTodo}/>
            {todos.map(todo => (
                <Todo key={todo.id} 
                toggleComplete={() => this.toggleComplete(todo.id)} 
                onDelete={() => this.handleDeleteTodo(todo.id)}
                todo={todo}/>
            ))}
            <div>
                todos left: {this.state.todos.filter(todo => !todo.complete).length}
            </div>
            <div>
                <button onClick={() => this.updateTodoToShow("all")}>all</button>
                <button onClick={() => this.updateTodoToShow("active")}>active</button>
                <button onClick={() => this.updateTodoToShow("complete")}>complete</button>
            </div>
            {this.state.todos.some(todo => todo.complete) ? (<div>
                <button onClick={this.removeAllComplete}>remove all complete</button>
            </div>) : null}
            <div>
                <button onClick={this.allCompleteToggle}>toggle all complete: {this.state.toggleAllComplete.toString()}</button>
            </div>
        </div>    
        );
    }
}