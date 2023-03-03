import { combineReducers} from "redux";
import { tvReducer } from "./tvTracker/reducer";

const rootReducer = combineReducers({
    tvReducer: tvReducer
})

export default rootReducer