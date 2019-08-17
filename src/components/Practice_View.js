import React, { Component } from 'react';
import { connect } from "react-redux";

import { ThemeProvider } from '@material-ui/styles';

import Card from '@material-ui/core/Card';

import theme from "./theme.js";

class Practices extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
            <ThemeProvider theme={theme}>
                <Card>
                    LMAO
                </Card>
            </ThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    practices: state.practices,
    id: state.open_practice
});

const mapDispatchToProps = dispatch => ({
	storePractices: (practices) => dispatch({
        type: "update_practices",
        payload: practices
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Practices);
