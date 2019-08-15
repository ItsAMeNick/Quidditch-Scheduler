import React, { Component } from 'react';
import { connect } from "react-redux";
import firestore from "../modules/firestore.js";
import bcrypt from "bcryptjs";

import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

var style = {
    margin: 15,
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        console.log("Validating")
        firestore.collection("users").where("username","==",this.state.username).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
                if (data.length === 1) {
                    console.log("Username found")
                    if (bcrypt.compareSync(this.state.password, data[0].password)) {
                        console.log("Good Password");
                        this.props.updateAuth();
                    } else {
                        console.log('Bad Password');
                    }
                } else {
                    console.log("Username not found")
                }
                this.props.updateAuth()
            });
    }

    render() {
        return (
            <ThemeProvider>
                <div>
                <AppBar position="static">
                    Login
                </AppBar>
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
                <Button label="Login" primary={true} style={style} onClick={this.handleSubmit}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
