import React, { Component } from 'react';
import { connect } from "react-redux";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login.js';
import Register from './Register.js';

var style = {
    margin: 15,
};

class Onboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            loginscreen:[],
            loginmessage:'',
            buttonLabel:'Set-up a new account',
            isLogin:true
        };
        this.handleSwitch = this.handleSwitch.bind(this);
    }

    componentWillMount(){
        var loginscreen=[];
        loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
        var loginmessage = "Not registered yet, Register Now";
        this.setState({
            loginscreen:loginscreen,
            loginmessage:loginmessage
        });
    }

    handleSwitch() {
        // console.log("event",event);
        var loginmessage;
        if(this.state.isLogin){
            var loginscreen=[];
            loginscreen.push(<Register parentContext={this}/>);
            loginmessage = "Already registered.Go to Login";
            this.setState({
                loginscreen:loginscreen,
                loginmessage:loginmessage,
                buttonLabel:"Already have an account?",
                isLogin:false
            })
        }
        else{
            var loginscreen=[];
            loginscreen.push(<Login parentContext={this}/>);
            loginmessage = "Not Registered yet.Go to registration";
            this.setState({
                loginscreen:loginscreen,
                loginmessage:loginmessage,
                buttonLabel:"Set-up a new account",
                isLogin:true
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.loginscreen}
                <div>
                    {this.state.loginmessage}
                    <MuiThemeProvider>
                    <div>
                        <RaisedButton label={this.state.buttonLabel} primary={true} style={style} onClick={this.handleSwitch}/>
                    </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    updateAuth: () => dispatch({
        type: "authenticate",
        payload: null
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Onboard);
