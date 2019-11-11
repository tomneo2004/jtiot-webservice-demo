import React, {useState} from 'react';
import { withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {requestToken} from '../../store/appid/appid.actions';
import JsonViewer from '../jsonViewer/jsonViewer';

import classes from './common.module.scss';

const RequestToken = ({t})=>{

    const id = useSelector(state=>state.appId.appId);
    const rawData = useSelector(state=>state.appId.rawData);
    const [appId, setAppId] = useState(id);
    const dispatch = useDispatch();
    

    return(
        <div className={classes.overlay}>
            <div>
            {t('desc', 'desc')}
            </div>
            <div>
            {t('RequestToken:desc-content', 'desc-content')}
            </div>
            <hr />
            <div>
            {t('example-input', 'example')}
            </div>
            <div>
            {t('RequestToken:example-content', 'example-content')}
            </div>
            <hr />
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
                rawData? <JsonViewer src={rawData} />:null
            }
        </div>
    );
}

export default withTranslation(['common', 'RequestToken'])(RequestToken);