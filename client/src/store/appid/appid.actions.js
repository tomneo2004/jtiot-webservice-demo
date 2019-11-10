import actionType from './appid.action.type';
import axios from 'axios';

export const requestToken = (appid)=>{

    return async (dispatch)=>{
        dispatch({type:actionType.REQUEST_TOKEN});

        let res = await axios.post('/requestTokenMethod', {
            appid:appid
        });
        
        let rawData = res.data.data;
        let token = rawData.token;

        dispatch({type:actionType.REQUEST_TOKEN_SUCCESS, payload:{appid, token, rawData}});
    }
}