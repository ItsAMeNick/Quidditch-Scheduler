import _ from "lodash";

const initialState = {
    authenticated: true,
	player_id: "4CgIOnTgEbSm2AcvSnZq",
	admin_mode: false
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

	case "set_admin": {
        let newState = _.cloneDeep(state);
        newState.admin_mode = action.payload;
        return newState;
    }

    default:
        return state;
    }
};

export default sCubeReducer;
