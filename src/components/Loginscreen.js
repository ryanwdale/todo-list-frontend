import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import Register from './Register';
class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      buttonLabel:'Register',
      isLogin:true
    }
  }
  componentWillMount(){
    var loginscreen=[];
    loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
    this.setState({
        loginscreen: loginscreen
    })
  }

  handleClick(event){
    // console.log("event",event);
    var loginmessage;
    if(this.state.isLogin){
      let loginscreen=[];
      loginscreen.push(<Register parentContext={this}/>);
      this.setState({
        loginscreen: loginscreen,
        buttonLabel: "Login",
        isLogin: false
      })
    }
    else{
      let loginscreen=[];
      loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
      this.setState({
        loginscreen:loginscreen,
        buttonLabel:"Register",
        isLogin:true
      })
    }
  }

  render() {
    return (
      <div className="loginscreen">
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
            <div>
               <RaisedButton label={this.state.buttonLabel} primary={true} style={style} 
               onClick={(event) => this.handleClick(event)}/>
           </div>
        </div>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Loginscreen;