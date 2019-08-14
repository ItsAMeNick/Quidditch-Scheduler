import _ from "lodash";

const initialState = {
    authenticated: false
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
        return newState;
    }

    default:
        return state;
    }
};

export default sCubeReducer;
