import actionType from './appid.action.type';
import axios from 'axios';

export const requestToken = (appid)=>{

    return async (dispatch)=>{
        dispatch({type:actionType.REQUEST_TOKEN});
        try{

            let res = await axios.post('/requestTokenMethod', {
                appid:appid
            });
            
            let rawData = res.data;
            let token = rawData.data.Token;
    
            dispatch({type:actionType.REQUEST_TOKEN_SUCCESS, payload:{appid, token, rawData}});
        }
        catch(err){
            console.log(err);
        }
        
    }
}