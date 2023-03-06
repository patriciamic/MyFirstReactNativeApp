import { combineReducers} from "redux";
import { tvDetailsReducer, tvReducer } from "./tvTracker/reducer";

const rootReducer = combineReducers({
    tvReducer: tvReducer,
    tvDetailsReducer: tvDetailsReducer
})

export default rootReducer