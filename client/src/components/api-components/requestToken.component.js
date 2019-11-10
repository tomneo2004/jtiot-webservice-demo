import React, {useState} from 'react';
import { withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {requestToken} from '../../store/appid/appid.actions';

const RequestToken = ({t})=>{

    const id = useSelector(state=>state.appId.appId);
    const token = useSelector(state=>state.appId.token);
    const [appId, setAppId] = useState(id);
    const dispatch = useDispatch();
    

    return(
        <div>
            <div>
            {t('desc', 'desc')}
            </div>
            <div>
            {t('example-input', 'example')}
            </div>
            <div>
                <div>
                    <label>{'appId:'}</label>
                    <input type='text' value={appId} onChange={
                        (e)=>setAppId(e.target.value)
                    } />
                </div>
                <button onClick={
                    ()=>dispatch(requestToken(appId))
                }>{t('submit', 'submit')}</button>
            </div>
            {
                token?
                <div>
                    {`token: ${token}`}
                </div>
                :
                null
            }
        </div>
    );
}

export default withTranslation()(RequestToken);