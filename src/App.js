import React, { Component } from 'react';
import { connect } from "react-redux";

import Login from "./components/Login.js";
import Register from "./components/Register.js";

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
            </div> : <div>
                <Login/>
                <Register/>
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
