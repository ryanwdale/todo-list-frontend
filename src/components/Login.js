import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import TodoList from './TodoList';


class Login extends React.Component {
constructor(props){
  super(props);
  this.state={
    username:'',
    password:''
  }
 }

 handleClick(event){
    var apiBaseUrl = "http://localhost:3001";
    var self = this;
    var userData = {
        "email": this.state.username,
        "password": this.state.password
    }
    axios.post(apiBaseUrl+'/auth/login', userData)
    .then((response) => {
    console.log(response);
    if(response.data.auth_token){
        console.log("Login successfull");
        console.log(response.data.auth_token);
        var uploadScreen=[];
        uploadScreen.push(<TodoList/>);
        var token = response.data.auth_token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        self.props.appContext.setState({
            loginPage:[],
            uploadScreen: uploadScreen,
            auth_token: response.data.auth_token
        });
        var sessionData = {
          auth_token: token
        }
        localStorage.setItem('currentUser', sessionData);
    }
    else{
        console.log("invalid username or password");
        alert("invalid username or password");
    }
    })
    .catch(function (error) {
    console.log(error);
    });
}

render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;