import React, { Component } from 'react';
import { connect } from "react-redux";
import firestore from "../modules/firestore.js";
import bcrypt from "bcryptjs";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

var style = {
    margin: 15,
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            first_name: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        console.log("Validating")
        firestore.collection("users").where("username","==",this.state.username).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data); // array of cities objects
                if (data.length === 1) {
                    console.log("Username found")
                    //let hash = bcrypt.hashSync(this.state.password, 10);
                    if (bcrypt.compareSync(this.state.password, data[0].password)) {
                        console.log("Good Password");
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
        <MuiThemeProvider>
            <div>
            <AppBar title="Register"/>
            <TextField
                hintText="Enter your First Name"
                floatingLabelText="First Name"
                onChange = {(event,newValue) => this.setState({first_name:newValue})}
            />
            <br/>
            <TextField
                hintText="Enter your Last Name"
                floatingLabelText="Last Name"
                onChange = {(event,newValue) => this.setState({last_name:newValue})}
            />
            <br/>
            <TextField
                hintText="Enter your Email"
                type="email"
                floatingLabelText="Email"
                onChange = {(event,newValue) => this.setState({email:newValue})}
            />
            <br/>
            <TextField
                type = "password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/>
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            </div>
         </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
