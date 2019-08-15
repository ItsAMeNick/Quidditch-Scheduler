import React, { Component } from 'react';
import { connect } from "react-redux";
import firestore from "../modules/firestore.js";

import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import { sizing } from '@material-ui/system';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import theme from "./theme.js";

class Practices extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
		firestore.collection("practices").get()
			.then(querySnapshot => {
				console.log(querySnapshot)
				let data = querySnapshot.docs.map(doc => {return {...doc.data(), id: doc.id}});
				console.log(data);
				this.props.storePractices(data);
			});
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
			<Container>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6">
							Practices
						</Typography>
					</Toolbar>
				</AppBar>
				<List>
	                <ListItem>
	                  <ListItemAvatar>
	                    <Avatar>
	                      <FolderIcon />
	                    </Avatar>
	                  </ListItemAvatar>
	                  <ListItemText
	                    primary="Practice 8/16/2019"
	                    secondary="8:00-10:00 / Lower Renwyck Grass"
	                  />
	                  <ListItemSecondaryAction>
	                    <IconButton edge="end" aria-label="delete">
	                      <DeleteIcon />
	                    </IconButton>
	                  </ListItemSecondaryAction>
	                </ListItem>
	            </List>
			</Container>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
	storePractices: (practices) => dispatch({
        type: "update_practices",
        payload: practices
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Practices);
