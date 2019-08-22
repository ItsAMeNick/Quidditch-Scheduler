import React, { Component } from 'react';
import { connect } from "react-redux";
import firestore from "../modules/firestore.js";
import _ from "lodash";

import { ThemeProvider } from '@material-ui/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AddBox from '@material-ui/icons/AddBox';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import UpVote from '@material-ui/icons/ThumbUp';
import DownVote from '@material-ui/icons/ThumbDown';

import theme from "./theme.js";

class Practices extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    isAccepted(id) {
        for (let p in this.props.practices) {
            if (this.props.practices[p].id !== id) continue;
            if (!this.props.practices[p].accepted) continue;
            if (this.props.practices[p].accepted.includes(this.props.player_id)) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    isDenied(id) {
        for (let p in this.props.practices) {
            if (this.props.practices[p].id !== id) continue;
            if (!this.props.practices[p].denied) continue;
            if (this.props.practices[p].denied.includes(this.props.player_id)) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    acceptPractice(id) {
        if (!id) return null;
        if (this.isAccepted(id)) return null;
        firestore.collection("practices").doc(id).get().then(doc => {
            let newPractice = doc.data();
            newPractice.accepted.push(this.props.player_id);
            if (this.isDenied(id)) {
                newPractice.denied = _.remove(newPractice.denied, item => {
                    return item === id;
                });
            }
            firestore.collection("practices").doc(id).set(newPractice);

            let practices = _.cloneDeep(this.props.practices);
            for (let p in practices) {
                if (practices[p].id === id) {
                    practices[p] = newPractice;
                    practices[p].id = id;
                }
            }
            this.props.updatePractices(practices);
            this.forceUpdate();
        });
    }

    denyPractice(id) {
        if (this.isDenied(id)) return null;
        firestore.collection("practices").doc(id).get().then(doc => {
            let newPractice = doc.data();
            newPractice.denied.push(this.props.player_id);
            if (this.isAccepted(id)) {
                newPractice.accepted = _.remove(newPractice.accepted, item => {
                    return item === id;
                });
            }
            firestore.collection("practices").doc(id).set(newPractice);

            let practices = _.cloneDeep(this.props.practices);
            for (let p in practices) {
                if (practices[p].id === id) {
                    practices[p] = newPractice;
                    practices[p].id = id;
                }
            }
            this.props.updatePractices(practices);
            this.forceUpdate();
        });
    }

    loadPractices() {
        if (!this.props.practices) return null;
        let practices = this.props.practices;
        let upcomming_prac = practices.filter(item => {
            return !item.expired;
        })
        let past_prac = _.reverse(practices.filter(item => {
            return item.expired;
        }));

        let events = []

        for (let p in upcomming_prac) {
            events.push(this.genPracticeItem(upcomming_prac[p]));
        }
        events.push(<Divider key="divider"/>)
        for (let p in past_prac) {
            events.push(this.genPracticeItem(past_prac[p]));
        }

        return events;
    }

    genPracticeItem(item) {
        return(
            <ListItem button key={item.id} onClick={() => this.props.setOpenPractice(item.id)}>
                <ListItemAvatar>
                    <Avatar style={{width: "60px", height: "60px"}}>
                    <Typography variant="h5" style={{margin: "10px"}}>
                        {item.day[0]+"/"+item.day[1]}
                    </Typography>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary = {item.location}
                    secondary = {item.start[0]+":"+(item.start[1] < 10 ? "0"+item.start[1] : item.start[1])+(item.start[2] === item.end[2] ? "" : " ("+item.start[2]+")")+" - "+item.end[0]+":"+(item.end[1] < 10 ? "0"+item.end[1] : item.end[1])+" ("+item.end[2]+")"}
                    style = {{marginLeft: "20px"}}
                    />
                <ListItemSecondaryAction>
                    {!item.expired ? <React.Fragment>
                        <IconButton edge="end" style={{marginRight: "10px"}} color={this.isAccepted(item.id) ? "primary" : "default"} onClick={() => this.acceptPractice(item.id)}>
                            <UpVote/>
                        </IconButton>
                        <IconButton edge="end" style={{marginRight: "10px"}} color={this.isDenied(item.id) ? "primary" : "default"} onClick={() => this.denyPractice(item.id)}>
                            <DownVote/>
                        </IconButton>
                    </React.Fragment> : null }
                    {this.props.admin_mode ?
                        <IconButton edge="end" onClick={() => this.props.setOpenPractice("edit-"+item.id)}>
                            <EditIcon/>
                        </IconButton>
                    : null}
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    render() {
        return (
            <div>
            <ThemeProvider theme={theme}>
            <List>
                <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="h5" style={{margin: "10px"}}>
                    Practices
                    </Typography>
                    {this.props.admin_mode ?
                        <IconButton style={{marginLeft: "auto"}} onClick={() => this.props.addPractice()}>
                            <AddBox/>
                        </IconButton>
                    : <div/>}
                </Toolbar>
                </AppBar>
                <Divider/>
                {this.loadPractices()}
            </List>
            </ThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    admin_mode: state.admin_mode,
    practices: state.practices,
    player_id: state.player_id
});

const mapDispatchToProps = dispatch => ({
    updatePractices: (practices) => dispatch({
        type: "update_practices",
        payload: practices
    }),
    setOpenPractice: (id) => dispatch({
        type: "set_open_practice",
        payload: id
    }),
    addPractice: () => dispatch({
        type: "set_open_practice",
        payload: "add"
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Practices);
