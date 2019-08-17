import React, { Component } from 'react';
import { connect } from "react-redux";
import firestore from "../modules/firestore.js";

import Practices from "./Practice_Sidebar.js";
import View from "./Practice_View.js";

import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Admin from '@material-ui/icons/VerifiedUser';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';

import theme from "./theme.js";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,

			first_name: "",
			last_name: "",
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount(){
        window.addEventListener('resize', this.updateWindowDimensions);

        //Get the Player's Information
		firestore.collection("players").doc(this.props.player_id).get()
			.then(doc => {
				this.setState(doc.data());
			});

        firestore.collection("practices").get()
			.then(querySnapshot => {
				let data = querySnapshot.docs.map(doc => {return {...doc.data(), id: doc.id}});
				this.props.storePractices(data);
                this.props.setOpenPractice(data[0].id)
			});
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    setupPage() {
        let small_mode = this.state.width < 960;

        let practices = (
            <Grid item xs={small_mode ? 12 : 3} key="practices">
                <Practices/>
            </Grid>
        );

        let view = (
            <Grid item xs={small_mode ? 12 : 9} key="view">
                <View/>
            </Grid>
        );

        if (small_mode) {
            return [view, practices];
        } else {
            return [practices, view];
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
            <div>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h4">
							Welcome, {this.state.first_name}
						</Typography>
                        {this.props.admin_mode ? //location.reload();
                            <Admin style={{marginLeft: "auto"}}/>
                        : null}
                        <IconButton edge="end" onClick={() => this.props.logout()}style={{marginLeft: "auto"}}>
                            <LogoutIcon/>
                        </IconButton>
					</Toolbar>
				</AppBar>
            </div>
            <div>
            <Grid container>
                {this.setupPage()}
            </Grid>
            </div>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
    admin_mode: state.admin_mode,
	player_id: state.player_id
});

const mapDispatchToProps = dispatch => ({
    updateAuth: () => dispatch({
        type: "authenticate",
        payload: null
    }),
    logout: () => dispatch({
        type: "logout",
        payload: null
    }),
    storePractices: (practices) => dispatch({
        type: "update_practices",
        payload: practices
    }),
    setOpenPractice: (id) => dispatch({
        type: "set_open_practice",
        payload: id
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
