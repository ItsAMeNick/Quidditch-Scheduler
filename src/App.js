import React, { Component } from 'react';
import { connect } from "react-redux";

import Onboard from "./components/Onboard.js";
import HomePage from "./components/HomePage.js"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
            {this.props.authenticated ?
            <div>
                <HomePage/>
            </div> : <div>
                <Onboard/>
            </div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authenticated: state.authenticated
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
