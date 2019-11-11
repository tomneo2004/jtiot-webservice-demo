import React, {useState} from 'react';
import { withTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import JsonViewer from '../jsonViewer/jsonViewer';
import axios from 'axios';

import classes from './common.module.scss';

const getBreathArray = async (appId, token, deviceName)=>{

    let res = await axios.post('/getBreathArray', {
        appid:appId,
        token:token,
        devicename:deviceName
    })

    return res.data;
}

const GetBreathArray = ({t})=>{

    const currnet_id = useSelector(state=>state.appId.appId);
    const currnet_token = useSelector(state=>state.appId.token);
    const [deviceName, setDeviceName] = useState('');
    const [rawData, setRawData] = useState(null);

    return(
        <div className={classes.overlay}>
            <div>
            {t('desc', 'desc')}
            </div>
            <div style={{'white-space': 'pre-line'}}>
            {t('BreathArray:desc-content', 'desc-content')}
            </div>
            <hr />
            <div>
            {t('example-input', 'example')}
            </div>
            <div style={{'white-space': 'pre-line'}}>
            {t('BreathArray:example-content', 'example-content')}
            </div>
            <hr />
            <div>
                <div>
                    <label>{'devicename:'}</label>
                    <input type='text' value={deviceName} onChange={
                        (e)=>setDeviceName(e.target.value)
                    } />
                </div>
                <div>
                    <label>{'appId:'}</label>
                    <input type='text' value={currnet_id} readOnly />
                </div>
                <div>
                    <label>{'token:'}</label>
                    <input type='text' value={currnet_token} readOnly />
                </div>
                <button onClick={
                    ()=>{
                        getBreathArray(currnet_id, currnet_token, deviceName)
                        .then((data)=>setRawData(data))
                        .catch((err)=>console.log(err))
                    }
                }>{t('submit', 'submit')}</button>
            </div>
            {
                rawData? <JsonViewer src={rawData} />:null
            }
            <hr />
            <div>
                <div>{t('ResponseCode:title')}</div>
                <div>{t('ResponseCode:200')}</div>
                <div>{t('ResponseCode:301')}</div>
                <div>{t('ResponseCode:302')}</div>
                <div>{t('ResponseCode:303')}</div>
                <div>{t('ResponseCode:401')}</div>
            </div>
        </div>
    );
}

export default withTranslation(['common', 'BreathArray', 
'ResponseCode'])(GetBreathArray);