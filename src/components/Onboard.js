import React, { Component } from 'react';
import { connect } from "react-redux";

import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Login from './Login.js';
import Register from './Register.js';

import theme from "./theme.js";
const style = {
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

    componentDidMount(){
        var loginscreen=[];
        loginscreen.push(<Login key="login"/>);
        var loginmessage = "Not registered yet, Register Now";
        this.setState({
            loginscreen:loginscreen,
            loginmessage:loginmessage
        });
    }

    handleSwitch() {
        // console.log("event",event);
        var loginmessage;
		var loginscreen=[];
        if(this.state.isLogin){
            loginscreen.push(<Register key="register"/>);
            loginmessage = "Already registered.Go to Login";
            this.setState({
                loginscreen:loginscreen,
                loginmessage:loginmessage,
                buttonLabel:"Already have an account?",
                isLogin:false
            })
        }
        else{
            loginscreen.push(<Login key="login"/>);
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
            <ThemeProvider theme={theme}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6">
							{this.state.isLogin ? "Login" : "Register"}
						</Typography>
					</Toolbar>
				</AppBar>
				<Grid container>
					<Grid item xs={true}></Grid>
					<Grid item xs={3}>
					{this.state.loginscreen}
					</Grid>
					<Grid item xs={true}></Grid>
				</Grid>
                <div>
                    {this.state.loginmessage}
                    <Button variant="contained" size="large" color="primary" style={style} onClick={this.handleSwitch}>
						{this.state.buttonLabel}
					</Button>
                </div>
            </ThemeProvider>
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
