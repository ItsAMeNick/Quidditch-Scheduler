import _ from "lodash";

const initialState = {
    authenticated: false,
	player_id: "",
	admin_mode: false,
    practices: null,
    open_practice: 0
};

const sCubeReducer = (state = initialState, action) => {
    switch (action.type) {
    case "dump_store": {
        console.log(state);
        return state;
    }

    case "authenticate": {
        let newState = _.cloneDeep(state);
        newState.authenticated = true;
		newState.player_id = action.payload;
        return newState;
    }

    case "logout": {
        let newState = _.cloneDeep(state);
        newState.authenticated = false;
		newState.player_id = "";
        return newState;
    }

	case "set_admin": {
        let newState = _.cloneDeep(state);
        newState.admin_mode = action.payload;
        return newState;
    }

    case "set_open_practice": {
        let newState = _.cloneDeep(state);
        newState.open_practice = action.payload;
        return newState;
    }

    case "update_practices": {
        let newState = _.cloneDeep(state);
        newState.practices = action.payload;
        return newState;
    }

    default:
        return state;
    }
};

export default sCubeReducer;
