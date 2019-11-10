import actionType from './appid.action.type';

const initState = {
    appId: '',
    token: '',
    rawData: null,
    errorCode: 0
}

const AppIdReducer = (state=initState, action)=>{

    switch(action.type){
        case actionType.REQUEST_TOKEN_SUCCESS:
            return {...state, 
                appId:action.payload.appid, 
                token:action.payload.token,
                rawData:action.payload.rawData
            }
        default:
            return state;
    }
}

export default AppIdReducer;