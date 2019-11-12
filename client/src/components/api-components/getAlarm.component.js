import React, {useState} from 'react';
import { withTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import JsonViewer from '../jsonViewer/jsonViewer';
import axios from 'axios';

import classes from './common.module.scss';

const getAlarm = async (appId, token, deviceName, startTime, endTime)=>{

    let res = await axios.post('/getAlarm', {
        appid:appId,
        token:token,
        devicename:deviceName,
        startTime:startTime,
        endTime:endTime
    })

    return res.data;
}

const GetAlarm = ({t})=>{

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
            {t('AlarmList:desc-content', 'desc-content')}
            </div>
            <hr />
            <div>
            {t('example-input', 'example')}
            </div>
            <div style={{'white-space': 'pre-line'}}>
            {t('AlarmList:example-content', 'example-content')}
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
                        getAlarm(currnet_id, currnet_token, deviceName, startTime, endTime)
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
                <div>{t('AlarmType:title')}</div>
                <div>{t('AlarmType:200')}</div>
                <div>{t('AlarmType:201')}</div>
                <div>{t('AlarmType:202')}</div>
                <div>{t('AlarmType:203')}</div>
                <div>{t('AlarmType:204')}</div>
                <div>{t('AlarmType:205')}</div>
                <div>{t('AlarmType:206')}</div>
                <div>{t('AlarmType:207')}</div>
                <div>{t('AlarmType:209')}</div>
            </div>
            <hr />
            <div>
                <div>{t('ResponseCode:title')}</div>
                <div>{t('ResponseCode:200')}</div>
                <div>{t('ResponseCode:301')}</div>
                <div>{t('ResponseCode:302')}</div>
                <div>{t('ResponseCode:303')}</div>
                <div>{t('ResponseCode:401')}</div>
            </div>
            <hr />
            <div>
                <div>{t('common:DataReturn-desc')}</div>
                <div>{t('ResponseCode')}</div>
                <div>{t('RecordNum')}</div>
                <div>{t('Records')}</div>
                <div>{t('DeviceName')}</div>
                <div>{t('AlarmReturn:AlarmTime')}</div>
                <div>{t('Type')}</div>
                <div>{t('CreateTime')}</div>
            </div>
        </div>
    );
}

export default withTranslation(['common', 'AlarmList',
'AlarmType', 'ResponseCode', 'AlarmReturn'])(GetAlarm);