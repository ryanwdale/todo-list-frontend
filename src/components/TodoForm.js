import React from 'react';
import shortid from 'shortid';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class TodoForm extends React.Component {
    state = {
        text: ""
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit({
            text: this.state.text,
            complete: false,
            id: ""
        });
        this.setState({
            text: ""
        });
    }
    render() {
        return (
        <div>
                <TextField
                    name="text"
                    value={this.state.text} 
                    onChange={this.handleChange}
                    placeholder="todo..."
                />
                <RaisedButton label="Add Todo" primary={true} style={style} onClick={this.handleSubmit}/>
        </div>    
        );
    }
}

const style = {
    margin: 15,
};