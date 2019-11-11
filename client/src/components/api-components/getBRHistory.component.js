import React, {useState} from 'react';
import { withTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import JsonViewer from '../jsonViewer/jsonViewer';
import axios from 'axios';

import classes from './common.module.scss';

const getBRHistory = async (appId, token, deviceName, startTime, endTime)=>{

    let res = await axios.post('/getBRHistory', {
        appid:appId,
        token:token,
        devicename:deviceName,
        startTime:startTime,
        endTime:endTime
    })

    return res.data;
}

const GetBRHistory = ({t})=>{

    const currnet_id = useSelector(state=>state.appId.appId);
    const currnet_token = useSelector(state=>state.appId.token);
    const [deviceName, setDeviceName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [rawData, setRawData] = useState(null);

    return(
        <div className={classes.overlay}>
            <div>
            {t('desc', 'desc')}
            </div>
            <div style={{'white-space': 'pre-line'}}>
            {t('BRHistory:desc-content', 'desc-content')}
            </div>
            <hr />
            <div>
            {t('example-input', 'example')}
            </div>
            <div style={{'white-space': 'pre-line'}}>
            {t('BRHistory:example-content', 'example-content')}
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
                    <label>{'startTime:'}</label>
                    <input type='text' value={startTime} onChange={
                        (e)=>setStartTime(e.target.value)
                    } />
                </div>
                <div>
                    <label>{'endTime:'}</label>
                    <input type='text' value={endTime} onChange={
                        (e)=>setEndTime(e.target.value)
                    } />
                </div>
                <div>
                    <label>{'appId:'}</label>
                    <input type='text' value={currnet_id} readOnly />
                </div>
                <div>
                    <label>{'token:'}</label>
                    <input type='text' value={currnet_token} readOnly/>
                </div>
                <button onClick={
                    ()=>{
                        getBRHistory(currnet_id, currnet_token, deviceName, startTime, endTime)
                        .then((data)=>setRawData(data))
                        .catch((err)=>console.log(err))
                    }
                }>{t('submit', 'submit')}</button>
            </div>
            {
                rawData? <JsonViewer src={rawData} />:null
            }
        </div>
    );
}

export default withTranslation(['common', 'BRHistory'])(GetBRHistory);