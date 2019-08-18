import React, { Component } from 'react';
import { connect } from "react-redux";

import { ThemeProvider } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';

import theme from "./theme.js";

class Practices extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    indexFromId(id) {
        if (!this.props.practices) return 0;
        for (let p in this.props.practices) {
            if (this.props.practices[p].id === id) return p;
        }
        return 0;
    }

    getSubHeader() {
        if (!this.props.practices) return null;
        if (!this.props.open_practice) return null;
        if (!this.props.practices[this.indexFromId(this.props.open_practice)]) return null;
        let prac = this.props.practices[this.indexFromId(this.props.open_practice)];
        return prac.start[0]+":"+(prac.start[1] < 10 ? "0"+prac.start[1] : prac.start[1])
                +(prac.start[2] === prac.end[2] ? "" : " ("+prac.start[2]+")")
                +" - "+prac.end[0]+":"+(prac.end[1] < 10 ? "0"+prac.end[1] : prac.end[1])
                +" ("+prac.end[2]+")";
    }

    getAvatar() {
        if (!this.props.practices) return "...";
        if (!this.props.open_practice) return "...";
        if (!this.props.practices[this.indexFromId(this.props.open_practice)]) return "...";
        let prac = this.props.practices[this.indexFromId(this.props.open_practice)];
        return prac.day[0]+"/"+prac.day[1];
    }

    render() {
        return (
            <div>
            <ThemeProvider theme={theme}>
            <Card>
                <CardHeader
                    avatar={
                      <Avatar style={{width: "60px", height: "60px"}}>
                        <Typography variant="h5" style={{margin: "10px"}}>
                            {this.getAvatar()}
                        </Typography>
                      </Avatar>
                    }
                    action={ this.props.admin_mode ?
                      <IconButton aria-label="settings">
                        <EditIcon />
                      </IconButton> : null
                    }
                    title = {this.props.practices ? this.props.practices[this.indexFromId(this.props.open_practice)].location : "Loading..."}
                    subheader = {this.getSubHeader()}
                />
            </Card>
            </ThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    practices: state.practices,
    open_practice: state.open_practice,
    admin_mode: state.admin_mode,
	player_id: state.player_id
});

const mapDispatchToProps = dispatch => ({
	storePractices: (practices) => dispatch({
        type: "update_practices",
        payload: practices
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Practices);
