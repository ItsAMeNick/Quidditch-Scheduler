import React, { Component } from 'react';
import { connect } from "react-redux";
import firestore from "../modules/firestore.js";

import Practices from "./Practices.js";

import { ThemeProvider } from '@material-ui/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import theme from "./theme.js";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
			first_name: "",
			last_name: "",
        };
    }

    componentDidMount(){
		console.log(this.props.player_id);
		firestore.collection("players").doc(this.props.player_id).get()
			.then(doc => {
				console.log(doc.data());
				this.setState(doc.data())
			});
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6">
							Welcome, {this.state.first_name}
						</Typography>
					</Toolbar>
				</AppBar>
				<Practices/>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
	player_id: state.player_id
});

const mapDispatchToProps = dispatch => ({
    updateAuth: () => dispatch({
        type: "authenticate",
        payload: null
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
