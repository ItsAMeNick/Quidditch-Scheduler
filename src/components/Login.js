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
			showPassword: false,
            errorMessage: ""
        };
		this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        //When the enter key is pressed while on the login page
        //Process the login
        document.addEventListener('keyup', (k) => {
            if (k.keyCode === 13) {
                k.preventDefault();
                document.getElementById("login_button").click();
            }
        })
    }

	handleChange(event) {
		if (event.target.id === "username") {
			this.setState({username: event.target.value})
		} else if (event.target.id === "password") {
			this.setState({password: event.target.value})
		}
	}

    handleSubmit(event) {
        firestore.collection("users").where("username","==",this.state.username.toLowerCase()).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                if (data.length === 1) {
                    if (bcrypt.compareSync(this.state.password, data[0].password)) {
                        this.props.updateAuth(data[0].player_id);
						this.props.updateAdmin(data[0].admin);
                    } else {
                        this.setState({errorMessage: "Login Failed: Your username/password do not match."})
                    }
                } else {
                    this.setState({errorMessage: "Login Failed: Your username cannot be found."});
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
            <Grid
                container
                alignItems="center"
                justify="center"
            >
                <Grid item xs={12} sm={10} md={6}>
    				<TextField
    					id="username"
    					label="Username"
    					value={this.state.username}
    					onChange={this.handleChange}
    					margin="normal"
    					variant="outlined"
    					fullWidth
    				/>
                </Grid>
            </Grid>
            <Grid
                container
                alignItems="center"
                justify="center"
            >
                <Grid item xs={12} sm={10} md={6}>
    				<TextField
    					id="password"
    					variant="outlined"
    					type={this.state.showPassword ? 'text' : 'password'}
    					label="Password"
    					value={this.state.password}
    					onChange={this.handleChange}
    					fullWidth
    					margin="normal"
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
                </Grid>
            </Grid>
            <Grid
                container
                alignItems="center"
                justify="center"
            >
                <Grid item>
	                {this.state.errorMessage}
                </Grid>
			</Grid>
            <Grid
                container
                alignItems="center"
                justify="center"
            >
                <Grid item>
	                <Button id="login_button" variant="contained" size="large" color="primary" style={style} onClick={this.handleSubmit}>
						Login
					</Button>
                </Grid>
			</Grid>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    updateAuth: (id) => dispatch({
        type: "authenticate",
        payload: id
    }),
	updateAdmin: (admin) => dispatch({
        type: "set_admin",
        payload: admin
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
