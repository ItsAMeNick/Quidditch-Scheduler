import React, { Component } from 'react';
import { connect } from "react-redux";
import firestore from "../modules/firestore.js";
import bcrypt from "bcryptjs";

import { ThemeProvider } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import theme from "./theme.js";
var style = {
    margin: 15,
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            first_name: "",
            last_name: "",
			chck_chaser: false,
			chck_beater: false,
			chck_keeper: false,
			chck_seeker: false,

            errorMessage: "",
        };
		this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	handleChange(event) {
		if (event.target.id === "username") {
			this.setState({username: event.target.value})
		} else if (event.target.id === "password") {
			this.setState({password: event.target.value})
		} else if (event.target.id === "email") {
			this.setState({email: event.target.value})
		}  else if (event.target.id === "first_name") {
			this.setState({first_name: event.target.value})
		}  else if (event.target.id === "last_name") {
			this.setState({last_name: event.target.value})
		}  else if (event.target.id === "chck_chaser") {
			this.setState({chck_chaser: event.target.checked})
		}  else if (event.target.id === "chck_beater") {
			this.setState({chck_beater: event.target.checked})
		}  else if (event.target.id === "chck_keeper") {
			this.setState({chck_keeper: event.target.checked})
		}  else if (event.target.id === "chck_seeker") {
			this.setState({chck_seeker: event.target.checked})
		}
	}

    handleSubmit(e) {
        //Validate form first
        if (!this.state.first_name) {
            this.setState({errorMessage: "Registration Error: Invalid first name."})
            return null;
        }
        if (!this.state.last_name) {
            this.setState({errorMessage: "Registration Error: Invalid last name."})
            return null;
        }
        if (!this.state.chck_chaser && !this.state.chck_beater && !this.state.chck_keeper && !this.state.chck_seeker) {
            this.setState({errorMessage: "Registration Error: Please select at least one position."})
            return null;
        }
        if (!this.state.email) {
            this.setState({errorMessage: "Registration Error: Invalid email."})
            return null;
        }
        if (!this.state.username) {
            this.setState({errorMessage: "Registration Error: Invalid username."})
            return null;
        }
        if (!this.state.password) {
            this.setState({errorMessage: "Registration Error: Invalid password."})
            return null;
        } else if (this.state.password.length < 5) {
            this.setState({errorMessage: "Registration Error: Password length must be at least 5 characters."})
            return null;
        }

        //Handle Database registration
        firestore.collection("users").where("username","==",this.state.username.toLowerCase()).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
                if (data.length >= 1) {
                    this.setState({errorMessage: "Registration Error: This username is unavailable."});
                } else {
                    let player = {
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
						positions: {
							chaser: this.state.chck_chaser,
							beater: this.state.chck_beater,
							keeper: this.state.chck_keeper,
							seeker: this.state.chck_seeker,
						},
						practices: null,
						comments: null
                    }
                    firestore.collection("players").add(player)
                    .then(item => {
                        item.get().then(data => {
                            let user = {
                                email: this.state.email,
                                username: this.state.username.toLowerCase(),
                                password: bcrypt.hashSync(this.state.password, 10),
                                player_id: data.id,
								admin: false
                            }
                            firestore.collection("users").add(user);
							this.props.updateAuth(data.id);
                        });
                    });
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
				id="first_name"
				label="First Name"
				value={this.state.first_name}
				onChange={this.handleChange}
				margin="normal"
				variant="outlined"
				fullWidth
			/>
			<TextField
				id="last_name"
				label="Last Name"
				value={this.state.last_name}
				onChange={this.handleChange}
				margin="normal"
				variant="outlined"
				fullWidth
			/>
            <Grid container>
            <Grid item>
    			<FormControlLabel
    				label="Chaser"
    				control={
    					<Checkbox
    						checked={this.state.chck_chaser}
    						onChange={this.handleChange}
    						color="primary"
    						id = "chck_chaser"
    					/>
    				}
    			/>
            </Grid>
            <Grid item>
    			<FormControlLabel
    				label="Beater"
    				control={
    					<Checkbox
    						checked={this.state.chck_beater}
    						onChange={this.handleChange}
    						color="primary"
    						id = "chck_beater"
    					/>
    				}
    			/>
                </Grid>
                <Grid item>
    			<FormControlLabel
    				label="Keeper"
    				control={
    					<Checkbox
    						checked={this.state.chck_keeper}
    						onChange={this.handleChange}
    						color="primary"
    						id = "chck_keeper"
    					/>
    				}
    			/>
                </Grid>
                <Grid item>
    			<FormControlLabel
    				label="Seeker"
    				control={
    					<Checkbox
    						checked={this.state.chck_seeker}
    						onChange={this.handleChange}
    						color="primary"
    						id = "chck_seeker"
    					/>
    				}
    			/>
                </Grid>
            </Grid>
            <TextField
				id="email"
				label="Email"
				value={this.state.email}
				onChange={this.handleChange}
				margin="normal"
				variant="outlined"
				fullWidth
			/>
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
				margin="normal"
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
			        {this.state.errorMessage}
			</Grid>
			<Grid
				container
				alignItems="center"
				justify="center"
			>
				<Button variant="contained" size="large" color="primary" style={style} onClick={this.handleSubmit}>
					Register
				</Button>
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
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
