import {combineReducers} from 'redux';
import appidReducer from './appid/appid.reducer';

const rootReducer = combineReducers({
    appId: appidReducer
});

export default rootReducer;