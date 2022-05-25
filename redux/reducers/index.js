/**
 * We purposely added 2 reducers for the example of combineReducers method.
 * There can be only 1 or even more than 2 reducers.
 * combineReducers defines the structure of the store object.
 */
import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { userReducer } from "./userReducer";
import fetchDataReducer from "./fetchDataReducer"
// import strategyReducer from "./strategyReducer"
// import wheelInstanceReducer from "./wheelInstanceReducer"
// import themeInstanceReducer from "./themeInstanceReducer"
// import groupAllocationReducer from "./groupAllocationReducer"
// import masterObjectAllocationReducer from "./masterObjectAllocationReducer"
// import groupChannelPrizeReducer from "./groupChannelPrizeReducer"
import masterDataReducer from "./masterDataReducer"

export const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    fetchData: fetchDataReducer,
    masterData: masterDataReducer
})
