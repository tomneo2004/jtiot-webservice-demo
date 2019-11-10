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
            <div>
            {t('example-input', 'example')}
            </div>
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
        </div>
    );
}

export default withTranslation()(GetProductList);