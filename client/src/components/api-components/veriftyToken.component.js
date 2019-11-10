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
            <div>
            {t('example-input', 'example')}
            </div>
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
        </div>
    );
}

export default withTranslation()(VerifyToken);