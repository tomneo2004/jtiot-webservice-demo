import React, {useState} from 'react';
import { withTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import JsonViewer from '../jsonViewer/jsonViewer';
import axios from 'axios';

import classes from './common.module.scss';

const verifyToken = async (appId, token)=>{

    let res = await axios.post('/verifyTokenMethod', {
        appid:appId,
        token:token
    })

    return res.data;
}

const VerifyToken = ({t})=>{

    const [appId, setAppId] = useState('');
    const [token, setToken] = useState('');
    const [rawData, setRawData] = useState(null);

    return(
        <div className={classes.overlay}>
            <div>
            {t('desc', 'desc')}
            </div>
            <div style={{'white-space': 'pre-line'}}>
            {t('VerifyToken:desc-content', 'desc-content')}
            </div>
            <hr />
            <div>
            {t('example-input', 'example')}
            </div>
            <div style={{'white-space': 'pre-line'}}>
            {t('VerifyToken:example-content', 'example-content')}
            </div>
            <hr />
            <div>
                <div>
                    <label>{'appId:'}</label>
                    <input type='text' defaultValue={appId} onChange={
                        (e)=>setAppId(e.target.value)
                    } />
                </div>
                <div>
                    <label>{'token:'}</label>
                    <input type='text' defaultValue={token} onChange={
                        (e)=>setToken(e.target.value)
                    }/>
                </div>
                <button onClick={
                    ()=>{
                        verifyToken(appId, token)
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
                <div>{t('VerifyTokenResponseCode:title')}</div>
                <div>{t('VerifyTokenResponseCode:501')}</div>
                <div>{t('VerifyTokenResponseCode:502')}</div>
                <div>{t('VerifyTokenResponseCode:503')}</div>
                <div>{t('VerifyTokenResponseCode:504')}</div>
            </div>
        </div>
    );
}

export default withTranslation(['common', 'VerifyToken',
'VerifyTokenResponseCode'])(VerifyToken);