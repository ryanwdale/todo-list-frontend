import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import Loginscreen from "./components/Loginscreen";
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loginPage: [],
      uploadScreen: [],
      auth_token: ''
    }
  }
  handleLogout = () => {
    sessionStorage.setItem('currentUser', null);
    var loginPage = [];
    loginPage.push(<Loginscreen parentContext={this}/>);
    this.setState({
      loginPage: loginPage,
      uploadScreen: []
    })
  }
  componentWillMount(){
    if(sessionStorage.getItem('currentUser') != null){
      console.log(sessionStorage.getItem('currentUser'));
      axios.defaults.headers.common['Authorization'] = 
      `Bearer ${sessionStorage.getItem('currentUser')}`;
      var uploadScreen = [];
      uploadScreen.push(<TodoList parentContext={this.handleLogout}/>);
      this.setState({
        uploadScreen: uploadScreen,
        loginPage: []
      })
    }

    else{
      var loginPage = [];
      loginPage.push(<Loginscreen parentContext={this}/>);
      this.setState({
        loginPage: loginPage,
        uploadScreen: []
      })
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          {this.state.loginPage}
          {this.state.uploadScreen}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;