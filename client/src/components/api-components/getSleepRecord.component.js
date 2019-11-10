import React, {useState} from 'react';
import { withTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import JsonViewer from '../jsonViewer/jsonViewer';
import axios from 'axios';

const getSleepRecord = async (appId, token, deviceName, startTime, endTime)=>{

    let res = await axios.post('/getSleepRecord', {
        appid:appId,
        token:token,
        devicename:deviceName,
        startTime:startTime,
        endTime:endTime
    })

    return res.data;
}

const GetSleepRecord = ({t})=>{

    const currnet_id = useSelector(state=>state.appId.appId);
    const currnet_token = useSelector(state=>state.appId.token);
    const [deviceName, setDeviceName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [appId, setAppId] = useState(currnet_id);
    const [token, setToken] = useState(currnet_token);
    const [rawData, setRawData] = useState(null);

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
                    <input type='text' value={appId} onChange={
                        (e)=>setAppId(e.target.value)
                    } />
                </div>
                <div>
                    <label>{'token:'}</label>
                    <input type='text' value={token} onChange={
                        (e)=>setToken(e.target.value)
                    }/>
                </div>
                <button onClick={
                    ()=>{
                        getSleepRecord(appId, token, deviceName, startTime, endTime)
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

export default withTranslation()(GetSleepRecord);