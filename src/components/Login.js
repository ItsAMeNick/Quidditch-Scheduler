import React, { Component } from 'react';
import { connect } from "react-redux";
import firestore from "../modules/firestore.js";
import bcrypt from "bcryptjs";

import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import theme from "./theme.js";
var style = {
    margin: 15,
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
			showPassword: false
        };
		this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	handleChange(event) {
		if (event.target.id === "username") {
			this.setState({username: event.target.value})
		} else if (event.target.id === "password") {
			this.setState({password: event.target.value})
		}

	}

    handleSubmit(event) {
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
            });
    }

	handleClickShowPassword = () => {
		this.setState({showPassword: !this.state.showPassword})
	};

	handleMouseDownPassword = event => {
		event.preventDefault();
	};

    render() {
        return (
            <ThemeProvider theme={theme}>
				<TextField
					id="username"
					label="Username"
					value={this.state.username}
					onChange={this.handleChange}
					margin="normal"
					variant="outlined"
					fullWidth
				/>
				<TextField
					id="password"
					variant="outlined"
					type={this.state.showPassword ? 'text' : 'password'}
					label="Password"
					value={this.state.password}
					onChange={this.handleChange}
					fullWidth
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									edge="end"
									aria-label="toggle password visibility"
									onClick={this.handleClickShowPassword}
									onMouseDown={this.handleMouseDownPassword}
								>
									{!this.state.showPassword ? <VisibilityOff/> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Grid
					container
					alignItems="center"
					justify="center"
				>
	                <Button variant="contained" size="large" color="primary" style={style} onClick={this.handleSubmit}>
						Login
					</Button>
				</Grid>
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
