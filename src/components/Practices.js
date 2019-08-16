import React, { Component } from 'react';
import { connect } from "react-redux";
import firestore from "../modules/firestore.js";

import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import theme from "./theme.js";

class Practices extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
			<div>
    		</div>
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
