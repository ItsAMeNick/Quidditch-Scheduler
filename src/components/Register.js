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
            first_name: "",
            last_name: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        console.log("Registering")
        firestore.collection("users").where("username","==",this.state.username).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
                if (data.length === 1) {
                    console.log("Username already exists")
                } else {
                    console.log("Username is avaliable")
                    let player = {
                        first_name: this.state.first_name,
                        last_name: this.state.last_name
                    }
                    firestore.collection("players").add(player)
                    .then(item => {
                        item.get().then(data => {
                            let user = {
                                username: this.state.username,
                                password: bcrypt.hashSync(this.state.password, 10),
                                player_id: data.id
                            }
                            firestore.collection("users").add(user);
                        });
                    });
                }
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
                hintText="Enter a Username"
                floatingLabelText="Username"
                onChange = {(event,newValue) => this.setState({username:newValue})}
            />
            <br/>
            <TextField
                type = "password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/>
            <RaisedButton label="Register" primary={true} style={style} onClick={this.handleSubmit}/>
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
