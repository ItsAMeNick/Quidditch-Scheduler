import React, { Component } from 'react';
import { connect } from "react-redux";
import firestore from "../modules/firestore.js";
import _ from "lodash";

import { ThemeProvider } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import theme from "./theme.js";

const blank_practice = {
    location: "",
    day: [Number(getToday().split("-")[1]), Number(getToday().split("-")[2]), Number(getToday().split("-")[0])],
    start: [6,0,"PM"],
    end: [8,0,"PM"],
    accepted: [],
    denied: []
};

function getToday() {
    let today = new Date();
    return today.getFullYear()+"-"+(today.getMonth()+1 < 9 ? "0"+(today.getMonth()+1) : today.getMonth()+1)+"-"+today.getDate();
}

class Practices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            practice: blank_practice,
            id: ""
        };
        console.log(this.state)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.id === "day") {
            let date = event.target.value.split("-");
            this.setState({practice: {...this.state.practice,
                day: [Number(date[1]), Number(date[2]), Number(date[0])]
            }});
        } else if (event.target.id === "location") {
            this.setState({practice: {...this.state.practice, location: event.target.value}});
        } else if (event.target.id === "start_time") {
            let time = event.target.value.split(":");
            this.setState({practice: {...this.state.practice, start: [
                (time[0] <= 12 ? Number(time[0]) : Number(time[0])-12),
                Number(time[1]),
                (time[0] < 12 ? "AM" : "PM")
            ]}});
        } else if (event.target.id === "end_time") {
            let time = event.target.value.split(":");
            this.setState({practice: {...this.state.practice, end: [
                (time[0] <= 12 ? Number(time[0]) : Number(time[0])-12),
                Number(time[1]),
                (time[0] < 12 ? "AM" : "PM")
            ]}});
        }
    }

    handleSubmit() {
        firestore.collection("practices").add(this.state.practice)
        .then(item => {
            console.log(item.id);
            this.setState({id: item.id});
        }).then((item) => {
            let newPractices = _.cloneDeep(this.props.practices);
            let newPrac = _.cloneDeep(this.state.practice);
            newPrac.id = this.state.id;
            newPractices.push(newPrac);
            newPractices.sort((item1, item2) => {
                if (this.getPracticeMilli(item1.day, item1.start) > this.getPracticeMilli(item2.day, item2.start)) {
                    return 1;
                } else {
                    return -1;
                }
            });
            this.props.storePractices(newPractices);
            this.props.setOpenPractice(this.state.id);
        });
    }

    getPracticeMilli(day, start) {
        let date = day[0]+"/"+day[1]+"/"+day[2];
        let time = start[0]+":"+start[1]+" "+start[2];
        return Date.parse(date+" "+time);
    }

    indexFromId(id) {
        if (!this.props.practices) return -1;
        for (let p in this.props.practices) {
            if (this.props.practices[p].id === id) return p;
        }
        return -1;
    }

    getTitle() {
        if (this.props.open_practice === "add") {
            return this.state.practice.location;
        }

        if (!this.props.practices) return "...";
        if (!this.props.open_practice) return "...";
        if (!this.props.practices[this.indexFromId(this.props.open_practice)]) return "...";
        let prac = this.props.practices[this.indexFromId(this.props.open_practice)];
        return prac.location;
    }

    getSubHeader() {
        if (this.props.open_practice === "add") {
            let prac = this.state.practice;
            return prac.start[0]+":"+(prac.start[1] < 10 ? "0"+prac.start[1] : prac.start[1])
                    +(prac.start[2] === prac.end[2] ? "" : " ("+prac.start[2]+")")
                    +" - "+prac.end[0]+":"+(prac.end[1] < 10 ? "0"+prac.end[1] : prac.end[1])
                    +" ("+prac.end[2]+")";
        }

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
        if (this.props.open_practice === "add") {
            let prac = this.state.practice;
            return prac.day[0]+"/"+prac.day[1];
        }

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
                    title = {this.getTitle()}
                    subheader = {this.getSubHeader()}
                />
                {this.props.admin_mode && this.props.open_practice === "add" ?
                <div>
                    <Divider style={{margin: "10px"}}/>
                    <CardContent>
                        <TextField
                            id="location"
                            label="Location"
                            type="text"
                            variant="outlined"
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="day"
                            label="Day"
                            type="date"
                            format="MM/dd/yyyy"
                            defaultValue={getToday()}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 900, // 15 min
                            }}
                            variant="outlined"
                            style={{marginLeft:"10px"}}
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="start_time"
                            label="Start Time"
                            type="time"
                            defaultValue="18:00"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 900, // 15 min
                            }}
                            variant="outlined"
                            style={{marginLeft:"10px"}}
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="end_time"
                            label="End Time"
                            type="time"
                            defaultValue="20:00"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 900, // 15 min
                            }}
                            variant="outlined"
                            style={{marginLeft:"10px"}}
                            onChange={this.handleChange}
                        />
                        <Button variant="contained" size="large" color="primary" style={{marginLeft:"10px"}} onClick={this.handleSubmit}>
        					Add Practice
        				</Button>
                    </CardContent>
                </div> : null }
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
    }),
    setOpenPractice: (id) => dispatch({
        type: "set_open_practice",
        payload: id
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Practices);
