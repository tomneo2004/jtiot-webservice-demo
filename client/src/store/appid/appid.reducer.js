import actionType from './appid.action.type';

const initState = {
    appId: '',
    token: '',
    errorCode: 0
}

const AppIdReducer = (state=initState, action)=>{

    switch(action.type){
        case actionType.REQUEST_TOKEN_SUCCESS:
            return {...state, 
                appId:action.payload.appid, 
                token:action.payload.token}
        default:
            return state;
    }
}

export default AppIdReducer;