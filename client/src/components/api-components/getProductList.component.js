import React, {useState} from 'react';
import { withTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import JsonViewer from '../jsonViewer/jsonViewer';
import axios from 'axios';

import classes from './common.module.scss';

const getProductList = async (appId, token, filter)=>{

    let res = await axios.post('/getProductList', {
        appid:appId,
        token:token,
        filter:filter
    })

    return res.data;
}

const GetProductList = ({t})=>{

    const currnet_id = useSelector(state=>state.appId.appId);
    const currnet_token = useSelector(state=>state.appId.token);
    const [filter, setFilter] = useState('');
    const [rawData, setRawData] = useState(null);

    return(
        <div className={classes.overlay}>
            <div>
            {t('desc', 'desc')}
            </div>
            <div style={{'white-space': 'pre-line'}}>
            {t('ProductList:desc-content', 'desc-content')}
            </div>
            <hr />
            <div>
            {t('example-input', 'example')}
            </div>
            <div style={{'white-space': 'pre-line'}}>
            {t('ProductList:example-content', 'example-content')}
            </div>
            <hr />
            <div>
                <div>
                    <label>{'filter:'}</label>
                    <input type='text' value={filter} onChange={
                        (e)=>setFilter(e.target.value)
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
                        getProductList(currnet_id, currnet_token, filter)
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
                <div>{t('DeviceStatus:title')}</div>
                <div>{t('DeviceStatus:0')}</div>
                <div>{t('DeviceStatus:1')}</div>
                <div>{t('DeviceStatus:A')}</div>
                <div>{t('DeviceStatus:offline')}</div>
                <div>{t('DeviceStatus:notUsing')}</div>
                <div>{t('DeviceStatus:detecting')}</div>
            </div>
            <hr />
            <div>
                <div>{t('ResponseCode:title')}</div>
                <div>{t('ResponseCode:200')}</div>
                <div>{t('ResponseCode:301')}</div>
                <div>{t('ResponseCode:302')}</div>
                <div>{t('ResponseCode:303')}</div>
                <div>{t('ResponseCode:401')}</div>
                <div>{t('ResponseCode:403')}</div>
            </div>
        </div>
    );
}

export default withTranslation(['common', 'ProductList',
 'DeviceStatus', 'ResponseCode'])(GetProductList);